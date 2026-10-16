import { useState, useRef, useEffect } from 'react';
import {
  Bot,
  User,
  Copy,
  Check,
  RotateCcw,
  Plus,
  Terminal,
  Bookmark,
  Clock,
  Hash,
  CornerDownLeft,
} from 'lucide-react';

let idCounter = 0;
const generateId = (prefix = 'id') => {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
};

const getTimestamp = () => {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const SUBJECTS = [
  { id: 'all', name: 'General / All' },
  { id: 'physics', name: 'Physics' },
  { id: 'biology', name: 'Biology' },
  { id: 'calculus', name: 'Calculus' },
  { id: 'cs', name: 'Computer Science' },
  { id: 'chemistry', name: 'Chemistry' },
];

const TUTOR_MODES = [
  { id: 'socratic', name: 'Socratic', desc: 'Explains concepts intuitively with analogies' },
  { id: 'exam', name: 'Exam Prep', desc: 'Highlights high-yield questions and distinctions' },
  { id: 'concise', name: 'Reference', desc: 'Fast formula cheatsheets and bullet points' },
];

const PROMPT_SUGGESTIONS = [
  {
    subject: 'physics',
    label: 'newton-laws',
    prompt: 'Can you explain Newton’s 3 Laws of Motion with real-world sports analogies?',
  },
  {
    subject: 'biology',
    label: 'mitosis-vs-meiosis',
    prompt: 'What are the key differences between Mitosis and Meiosis, and how do I remember them for exams?',
  },
  {
    subject: 'calculus',
    label: 'chain-rule-intuition',
    prompt: 'Help me understand the intuition behind the Chain Rule in derivatives with a step-by-step example.',
  },
  {
    subject: 'cs',
    label: 'big-o-analysis',
    prompt: 'Explain Time Complexity and Big-O notation simply with common data structure examples.',
  },
];

const INITIAL_SESSIONS = [
  { id: 's1', title: 'Cell Cycle & Mitosis Review', subject: 'biology', date: 'Today, 10:15 AM' },
  { id: 's2', title: 'Calculus: Integration by Parts', subject: 'calculus', date: 'Yesterday' },
  { id: 's3', title: 'Kinematics & Projectile Motion', subject: 'physics', date: '2 days ago' },
];

function FormattedMessage({ text, isAi }) {
  if (!isAi) {
    return <p className="text-xs leading-relaxed text-white font-normal">{text}</p>;
  }

  const blocks = text.split('\n\n');

  return (
    <div className="space-y-3">
      {blocks.map((block, idx) => {
        // Table detection
        if (block.includes('|') && block.split('\n').some((l) => l.trim().startsWith('|') && l.trim().endsWith('|'))) {
          const lines = block
            .trim()
            .split('\n')
            .filter((line) => line.trim().startsWith('|') && !line.includes(':---') && !line.includes('---'));
          if (lines.length > 0) {
            const headerCells = lines[0].split('|').map((c) => c.trim()).filter(Boolean);
            const rowLines = lines.slice(1);
            return (
              <div key={idx} className="overflow-x-auto my-3 rounded border border-zinc-200 bg-white shadow-2xs">
                <table className="w-full text-xs text-left">
                  <thead className="bg-zinc-100 text-zinc-800 font-mono font-medium border-b border-zinc-200">
                    <tr>
                      {headerCells.map((h, hIdx) => (
                        <th key={hIdx} className="px-3 py-2 text-[11px] uppercase tracking-wider">
                          {h.replace(/\*\*/g, '')}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 font-mono text-[11px]">
                    {rowLines.map((row, rIdx) => {
                      const cells = row.split('|').map((c) => c.trim()).filter(Boolean);
                      return (
                        <tr key={rIdx} className="hover:bg-zinc-50 transition-colors">
                          {cells.map((cell, cIdx) => (
                            <td key={cIdx} className="px-3 py-2 text-zinc-700">
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: cell
                                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-zinc-950 font-semibold">$1</strong>')
                                    .replace(/\$\$(.*?)\$\$/g, '<code class="text-zinc-900 bg-zinc-100 px-1 py-0.5 rounded border border-zinc-200">$1</code>'),
                                }}
                              />
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          }
        }

        // Formula block $$ ... $$
        if (block.trim().startsWith('$$') && block.trim().endsWith('$$')) {
          const formula = block.trim().replace(/^\$\$|\$\$$/g, '').replace(/\\mathbf\{([^}]+)\}/g, '$1');
          return (
            <div key={idx} className="my-2 p-2.5 rounded bg-zinc-100 border border-zinc-200 text-center font-mono text-zinc-950 text-xs font-semibold">
              {formula}
            </div>
          );
        }

        // Header ###
        if (block.startsWith('### ')) {
          return (
            <h4 key={idx} className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-950 pt-1">
              {block.replace('### ', '')}
            </h4>
          );
        }

        // Blockquote >
        if (block.startsWith('> ')) {
          return (
            <blockquote
              key={idx}
              className="pl-3 border-l-2 border-zinc-400 text-zinc-600 my-2 text-xs font-mono bg-zinc-50/60 py-1"
            >
              {block.replace('> ', '').replace(/^"|"$/g, '')}
            </blockquote>
          );
        }

        // Regular paragraph with bold & inline code support
        return (
          <p
            key={idx}
            className="text-xs text-zinc-800 leading-relaxed font-normal"
            dangerouslySetInnerHTML={{
              __html: block
                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-zinc-950 font-semibold">$1</strong>')
                .replace(/`([^`]+)`/g, '<code class="bg-zinc-100 text-zinc-900 px-1 py-0.5 rounded text-[11px] font-mono border border-zinc-200">$1</code>')
                .replace(/\$\$(.*?)\$\$/g, '<code class="text-zinc-900 bg-zinc-100 px-1 py-0.5 rounded font-mono text-[11px] border border-zinc-200">$1</code>')
                .replace(/\$([^$]+)\$/g, '<code class="text-zinc-900 bg-zinc-100 px-1 py-0.5 rounded font-mono text-[11px] border border-zinc-200">$1</code>')
                .replace(/\n/g, '<br />'),
            }}
          />
        );
      })}
    </div>
  );
}

const generateAiReply = (userQuery, selectedSubject, mode) => {
  const query = userQuery.toLowerCase();

  if (query.includes('newton') || query.includes('motion')) {
    return {
      text: `### Newton's Three Laws of Motion\n\n1. **First Law (Inertia):**\n> An object remains at rest, or in uniform straight-line motion, unless acted upon by a net external force.\nExample: A hockey puck sliding on frictionless ice.\n\n2. **Second Law (F = ma):**\n$$\\mathbf{F = ma}$$\nForce equals mass times acceleration. The force required scales linearly with mass and acceleration.\n\n3. **Third Law (Action & Reaction):**\n> For every action, there is an equal and opposite reaction.\nForces always occur in matched interaction pairs.`,
      keyPoints: [
        'First Law: Resistance to change in state (Inertia)',
        'Second Law: Quantitative relation (F = m × a)',
        'Third Law: Equal magnitude, opposite direction pairs',
      ],
      followUps: [
        'Quiz me on Newton’s 2nd Law with numerical problems',
        'How does friction alter the First Law in practice?',
        'Provide the vector notation for the Second Law',
      ],
    };
  }

  if (query.includes('mitosis') || query.includes('meiosis') || query.includes('cell')) {
    return {
      text: `### Mitosis vs Meiosis Comparison\n\nMemory shortcut: **PMAT** (Prophase, Metaphase, Anaphase, Telophase).\n\n| Attribute | Mitosis | Meiosis |\n| :--- | :--- | :--- |\n| **Function** | Somatic growth & repair | Gamete generation |\n| **Divisions** | 1 cycle | 2 sequential cycles |\n| **Daughter Cells** | 2 diploid (2n) identical | 4 haploid (n) diverse |\n| **Recombination** | Absent | Prophase I Crossing Over |`,
      keyPoints: [
        'Mitosis: Produces 2 genetically identical diploid cells',
        'Meiosis: Produces 4 genetically variable haploid gametes',
        'Crossing over occurs exclusively during Prophase I',
      ],
      followUps: [
        'Detail the stages of Metaphase vs Anaphase',
        'Why does nondisjunction occur during Meiosis?',
        'Generate flashcards for cellular division',
      ],
    };
  }

  if (query.includes('chain rule') || query.includes('derivative') || query.includes('calculus')) {
    return {
      text: `### Calculus: The Chain Rule\n\n$$\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)$$\n\n**Algorithm:**\n1. Identify composite inner function $u = g(x)$ and outer function $f(u)$.\n2. Differentiate the outer function with respect to $u$.\n3. Multiply by the derivative of $u$ with respect to $x$.\n\n**Worked Example:** Differentiate $y = (3x^2 + 5)^4$\n- Outer derivative: $4(3x^2 + 5)^3$\n- Inner derivative: $6x$\n- Combined result: $\\mathbf{24x(3x^2 + 5)^3}$`,
      keyPoints: [
        'Differentiate outside first, preserving the inner function',
        'Multiply by the derivative of the inner function',
        'Applies iteratively to multi-level composite functions',
      ],
      followUps: [
        'Demonstrate Chain Rule on trigonometric functions',
        'How does the Chain Rule relate to implicit differentiation?',
        'Give me a timed calculus drill',
      ],
    };
  }

  if (query.includes('big-o') || query.includes('complexity') || query.includes('algorithm')) {
    return {
      text: `### Algorithmic Complexity: Big-O Reference\n\n| Order | Name | Example Operation |\n| :--- | :--- | :--- |\n| **O(1)** | Constant | Array index lookup arr[i] |\n| **O(log n)** | Logarithmic | Binary search in sorted array |\n| **O(n)** | Linear | Linear traversal / scan |\n| **O(n log n)** | Linearithmic | Merge sort, Heap sort |\n| **O(n^2)** | Quadratic | Nested loop / Bubble sort |`,
      keyPoints: [
        'Measures asymptotic worst-case scaling rate',
        'Ignore scalar constants: O(3n + 5) -> O(n)',
        'Dominant terms dictate runtime as n -> infinity',
      ],
      followUps: [
        'Why is Merge Sort O(n log n) in worst case?',
        'Contrast Space Complexity vs Time Complexity',
        'Analyze the Big-O of Quick Sort partition',
      ],
    };
  }

  return {
    text: `### Context Analysis: ${selectedSubject === 'all' ? 'General Topic' : selectedSubject.toUpperCase()}\n\nMode: **${mode.toUpperCase()}**\n\n1. **Core Abstraction:** Isolate the fundamental invariant or definition governing the query.\n2. **Decomposition:** Break the problem down into verifiable steps or formal components.\n3. **Validation:** Check boundary constraints, edge conditions, and formula dimensions.\n\nWould you like a diagnostic practice problem or a concise reference breakdown?`,
    keyPoints: [
      'Deconstruct questions into atomic definitions',
      'Verify boundary and dimensionality constraints',
      'Rely on active problem solving over passive review',
    ],
    followUps: [
      'Generate a 3-question evaluation quiz',
      'Format this into a formula cheatsheet',
      'Show a step-by-step worked example',
    ],
  };
};

export default function AiTutor() {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedMode, setSelectedMode] = useState('socratic');
  const [sessions, setSessions] = useState(INITIAL_SESSIONS);
  const [activeSessionId, setActiveSessionId] = useState('s1');
  const [copiedId, setCopiedId] = useState(null);
  const [savedCardId, setSavedCardId] = useState(null);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'ai',
      timestamp: '10:15 AM',
      text: "System initialized. I am your AI Study Assistant.\n\nSelect a subject focus or ask a question regarding concepts, practice problems, or syllabus topics.",
      keyPoints: [
        'Deconstruct complex STEM concepts step-by-step',
        'Verify formulas and practice diagnostic problems',
        'Export key insights directly into flashcards',
      ],
    },
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveFlashcard = (id) => {
    setSavedCardId(id);
    setTimeout(() => setSavedCardId(null), 2500);
  };

  const handleSend = (textToSend) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    const userMsg = {
      id: generateId('u'),
      sender: 'user',
      timestamp: getTimestamp(),
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAiReply(query, selectedSubject, selectedMode);
      const aiMsg = {
        id: generateId('ai'),
        sender: 'ai',
        timestamp: getTimestamp(),
        text: response.text,
        keyPoints: response.keyPoints,
        followUps: response.followUps,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startNewSession = () => {
    const newId = generateId('s');
    const newSession = {
      id: newId,
      title: 'New Session',
      subject: selectedSubject,
      date: 'Just now',
    };
    setSessions([newSession, ...sessions]);
    setActiveSessionId(newId);
    setMessages([
      {
        id: generateId('m-init'),
        sender: 'ai',
        timestamp: getTimestamp(),
        text: `Fresh session opened for **${
          selectedSubject === 'all' ? 'General' : selectedSubject.toUpperCase()
        }**. Ready for input.`,
      },
    ]);
  };

  const clearCurrentChat = () => {
    setMessages([
      {
        id: generateId('m-reset'),
        sender: 'ai',
        timestamp: getTimestamp(),
        text: 'Session history cleared. Enter a new query below.',
      },
    ]);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col space-y-4 max-w-7xl mx-auto">
      {/* Top Header / Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-lg bg-white border border-zinc-200 shadow-2xs">
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 rounded bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 font-mono text-xs shadow-2xs">
            <Terminal size={14} />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-sm font-semibold tracking-tight text-zinc-950">AI Tutor Engine</h1>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-700 border border-zinc-200">
                v2.4
              </span>
            </div>
            <p className="text-[11px] text-zinc-600 font-mono">
              Adaptive reasoning, mathematical derivation, and spaced recall
            </p>
          </div>
        </div>

        {/* Mode & Action Controls */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Segmented Mode Selector */}
          <div className="flex bg-zinc-100 p-0.5 rounded border border-zinc-200 text-xs font-mono">
            {TUTOR_MODES.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                className={`px-2.5 py-1 rounded transition-colors text-[11px] ${
                  selectedMode === mode.id
                    ? 'bg-white text-zinc-950 font-medium border border-zinc-200 shadow-2xs'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
                title={mode.desc}
              >
                {mode.name}
              </button>
            ))}
          </div>

          <button
            onClick={startNewSession}
            id="new-chat-btn"
            className="flex items-center space-x-1 px-2.5 py-1 bg-zinc-950 hover:bg-zinc-800 text-white rounded text-xs font-medium transition-colors shadow-xs"
          >
            <Plus size={13} />
            <span>New Session</span>
          </button>

          <button
            onClick={clearCurrentChat}
            id="clear-chat-btn"
            className="p-1.5 text-zinc-500 hover:text-zinc-950 rounded hover:bg-zinc-100 border border-transparent hover:border-zinc-200 transition-colors"
            title="Clear history"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Main Grid: Left Panel + Center Chat Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4 min-h-0">
        {/* Left Column: Subject Focus & History */}
        <div className="hidden lg:flex lg:col-span-1 bg-white p-3.5 rounded-lg flex-col border border-zinc-200 shadow-2xs space-y-4 overflow-hidden">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-600 mb-2">
              Subject Scope
            </div>
            <div className="space-y-1">
              {SUBJECTS.map((sub) => {
                const isSelected = selectedSubject === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubject(sub.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-xs font-mono transition-colors ${
                      isSelected
                        ? 'bg-zinc-100 text-zinc-950 border border-zinc-200 font-semibold'
                        : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950'
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      <Hash size={12} className={isSelected ? 'text-zinc-950' : 'text-zinc-400'} />
                      <span>{sub.name}</span>
                    </span>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-zinc-950"></span>}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex-1 flex flex-col min-h-0 pt-3 border-t border-zinc-200">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-600 mb-2 flex items-center">
              <Clock size={11} className="mr-1.5" />
              Session History
            </div>
            <div className="flex-1 overflow-y-auto space-y-1 pr-1 font-mono">
              {sessions.map((sess) => {
                const isActive = activeSessionId === sess.id;
                return (
                  <div
                    key={sess.id}
                    onClick={() => setActiveSessionId(sess.id)}
                    className={`p-2 rounded cursor-pointer text-left transition-colors text-xs ${
                      isActive
                        ? 'bg-zinc-100 border border-zinc-200 text-zinc-950 font-medium'
                        : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950'
                    }`}
                  >
                    <p className="truncate text-xs font-medium text-zinc-900">{sess.title}</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5 flex items-center justify-between">
                      <span className="capitalize">{sess.subject}</span>
                      <span>{sess.date}</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-2.5 rounded bg-zinc-50 border border-zinc-200 text-xs font-mono">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
              Active Mode
            </div>
            <p className="text-[11px] text-zinc-700">
              {TUTOR_MODES.find((m) => m.id === selectedMode)?.desc}
            </p>
          </div>
        </div>

        {/* Center/Right: Chat Stream & Prompt Bar */}
        <div className="lg:col-span-3 bg-white rounded-lg flex flex-col border border-zinc-200 shadow-2xs overflow-hidden relative">
          {/* Quick Prompts Bar */}
          <div className="px-3.5 py-2 bg-zinc-50/70 border-b border-zinc-200 flex items-center gap-2 overflow-x-auto">
            <span className="text-[10px] font-mono uppercase text-zinc-500 shrink-0">
              Snippets:
            </span>
            {PROMPT_SUGGESTIONS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(item.prompt)}
                className="shrink-0 text-[11px] font-mono px-2 py-0.5 rounded bg-white hover:bg-zinc-100 text-zinc-700 hover:text-zinc-950 border border-zinc-200 transition-colors shadow-2xs"
              >
                ${item.label}
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 lg:p-6 overflow-y-auto space-y-5 bg-zinc-50/30">
            {messages.map((msg) => {
              const isAi = msg.sender === 'ai';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start space-x-3 ${isAi ? 'justify-start' : 'justify-end'}`}
                >
                  {isAi && (
                    <div className="w-6 h-6 rounded bg-zinc-100 border border-zinc-300 flex items-center justify-center shrink-0 mt-0.5 text-zinc-800 shadow-2xs">
                      <Bot size={13} />
                    </div>
                  )}

                  <div className={`max-w-[85%] lg:max-w-[78%] space-y-1.5 ${isAi ? '' : 'items-end'}`}>
                    <div className="flex items-center space-x-2 px-0.5 text-[11px] font-mono text-zinc-500">
                      <span className="text-zinc-800 font-semibold">{isAi ? 'Tutor' : 'You'}</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div
                      className={`p-3.5 rounded-lg transition-colors ${
                        isAi
                          ? 'bg-white border border-zinc-200 text-zinc-900 shadow-2xs'
                          : 'bg-zinc-950 text-white border border-zinc-950 shadow-xs'
                      }`}
                    >
                      <FormattedMessage text={msg.text} isAi={isAi} />

                      {/* AI Key Points */}
                      {msg.keyPoints && msg.keyPoints.length > 0 && (
                        <div className="mt-3.5 p-2.5 rounded bg-zinc-50 border border-zinc-200 space-y-1">
                          <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-800 font-semibold">
                            Key Invariants:
                          </p>
                          <ul className="text-xs text-zinc-700 space-y-0.5 pl-4 list-disc marker:text-zinc-400">
                            {msg.keyPoints.map((point, ptIdx) => (
                              <li key={ptIdx}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* AI Message Action Bar */}
                    {isAi && (
                      <div className="flex items-center space-x-2 pt-0.5 px-0.5 text-[11px] font-mono text-zinc-500">
                        <button
                          onClick={() => handleCopy(msg.text, msg.id)}
                          className="flex items-center space-x-1 px-1.5 py-0.5 rounded hover:bg-zinc-100 hover:text-zinc-950 transition-colors"
                          title="Copy text"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check size={11} className="text-emerald-600" />
                              <span className="text-emerald-600 font-medium">copied</span>
                            </>
                          ) : (
                            <>
                              <Copy size={11} />
                              <span>copy</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleSaveFlashcard(msg.id)}
                          className="flex items-center space-x-1 px-1.5 py-0.5 rounded hover:bg-zinc-100 hover:text-zinc-950 transition-colors"
                          title="Save as study card"
                        >
                          {savedCardId === msg.id ? (
                            <>
                              <Check size={11} className="text-emerald-600" />
                              <span className="text-emerald-600 font-medium">saved</span>
                            </>
                          ) : (
                            <>
                              <Bookmark size={11} />
                              <span>save-card</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {/* Follow-up shortcut pills */}
                    {msg.followUps && (
                      <div className="pt-1.5 flex flex-wrap gap-1.5">
                        {msg.followUps.map((fu, fIdx) => (
                          <button
                            key={fIdx}
                            onClick={() => handleSend(fu)}
                            className="text-[11px] font-mono px-2 py-0.5 rounded bg-white hover:bg-zinc-100 text-zinc-700 hover:text-zinc-950 border border-zinc-200 transition-colors shadow-2xs"
                          >
                            → {fu}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {!isAi && (
                    <div className="w-6 h-6 rounded bg-zinc-950 border border-zinc-900 flex items-center justify-center shrink-0 mt-0.5 text-white shadow-2xs">
                      <User size={13} />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded bg-zinc-100 border border-zinc-300 flex items-center justify-center shrink-0 text-zinc-800 shadow-2xs">
                  <Bot size={13} />
                </div>
                <div className="p-2.5 rounded bg-white border border-zinc-200 flex items-center space-x-2 text-[11px] font-mono text-zinc-600 shadow-2xs">
                  <span>Generating response...</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-pulse"></div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Chat Input Form */}
          <div className="p-3 bg-zinc-50/70 border-t border-zinc-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-end gap-2"
            >
              <div className="flex-1 bg-white border border-zinc-300 focus-within:border-zinc-900 rounded-md transition-colors shadow-2xs">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Ask a question or enter a topic in [${selectedSubject}]...`}
                  rows={2}
                  id="chat-input"
                  className="w-full px-3 py-2 bg-transparent text-zinc-950 placeholder-zinc-400 text-xs focus:outline-none resize-none font-mono"
                />
                <div className="flex items-center justify-between px-3 pb-1.5 text-[10px] font-mono text-zinc-500">
                  <span>
                    Scope: <strong className="text-zinc-900 capitalize">{selectedSubject}</strong> ({selectedMode})
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="dev-kbd">Shift + Enter</span>
                    <span>new line</span>
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                id="send-message-btn"
                className={`p-2.5 rounded-md flex items-center justify-center transition-colors shadow-xs ${
                  inputMessage.trim() && !isTyping
                    ? 'bg-zinc-950 hover:bg-zinc-800 text-white'
                    : 'bg-zinc-200 text-zinc-400 cursor-not-allowed border border-zinc-200'
                }`}
              >
                <CornerDownLeft size={15} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
