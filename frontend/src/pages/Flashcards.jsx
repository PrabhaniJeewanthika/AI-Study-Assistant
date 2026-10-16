import { useState, useEffect, useCallback } from 'react';
import {
  RotateCw,
  Plus,
  ArrowRight,
  Layers,
  Sparkles,
  Eye,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
  Brain,
  Clock,
} from 'lucide-react';

const INITIAL_DECKS = [
  {
    id: 'deck-1',
    title: 'Cell Cycle & Mitosis',
    subject: 'Biology',
    totalCards: 14,
    dueCards: 4,
    masteredPercentage: 78,
  },
  {
    id: 'deck-2',
    title: 'Newtonian Mechanics',
    subject: 'Physics',
    totalCards: 18,
    dueCards: 3,
    masteredPercentage: 88,
  },
  {
    id: 'deck-3',
    title: 'Derivatives & Chain Rule',
    subject: 'Calculus',
    totalCards: 12,
    dueCards: 5,
    masteredPercentage: 65,
  },
  {
    id: 'deck-4',
    title: 'Big-O & Algorithmic Complexity',
    subject: 'Computer Science',
    totalCards: 16,
    dueCards: 2,
    masteredPercentage: 92,
  },
];

const INITIAL_CARDS = [
  {
    id: 'c1',
    deckId: 'deck-1',
    deckName: 'Cell Cycle & Mitosis',
    subject: 'Biology',
    question: 'What are the four primary stages of Mitosis in sequential order?',
    hint: 'Use the golden acronym: PMAT',
    answer: 'Prophase, Metaphase, Anaphase, Telophase (PMAT).',
    detail: 'Prophase: chromosomes condense. Metaphase: chromosomes align at equatorial plate. Anaphase: sister chromatids separate. Telophase: nuclear envelopes reform.',
    level: 'Review due',
  },
  {
    id: 'c2',
    deckId: 'deck-1',
    deckName: 'Cell Cycle & Mitosis',
    subject: 'Biology',
    question: 'What is the key genetic difference between daughter cells of Mitosis vs Meiosis?',
    hint: 'Compare diploid vs haploid and variation',
    answer: 'Mitosis yields 2 genetically identical diploid (2n) cells. Meiosis yields 4 genetically diverse haploid (n) gametes.',
    detail: 'Genetic variation in Meiosis is caused by Crossing Over in Prophase I and Independent Assortment in Metaphase I.',
    level: 'Learning',
  },
  {
    id: 'c3',
    deckId: 'deck-2',
    deckName: 'Newtonian Mechanics',
    subject: 'Physics',
    question: 'State Newton’s Second Law of Motion in mathematical and verbal form.',
    hint: 'Relationship between net force, mass, and acceleration',
    answer: 'F = m · a (Force = Mass × Acceleration)',
    detail: 'The acceleration of an object as produced by a net force is directly proportional to the magnitude of the net force, in the same direction, and inversely proportional to the mass.',
    level: 'Review due',
  },
  {
    id: 'c4',
    deckId: 'deck-2',
    deckName: 'Newtonian Mechanics',
    subject: 'Physics',
    question: 'Why do Newton’s 3rd Law action-reaction pairs never cancel each other out?',
    hint: 'Think about which objects the forces act upon',
    answer: 'Because the action and reaction forces act on two completely different objects.',
    detail: 'Cancellation requires net forces acting on the same system. In Newton’s 3rd law: Force of A on B = - Force of B on A.',
    level: 'Mastered',
  },
  {
    id: 'c5',
    deckId: 'deck-3',
    deckName: 'Derivatives & Chain Rule',
    subject: 'Calculus',
    question: 'What is the formula and intuition for the Chain Rule in differential calculus?',
    hint: 'Derivative of a composite function f(g(x))',
    answer: 'd/dx [f(g(x))] = f\'(g(x)) · g\'(x)',
    detail: 'Differentiate the outer function with respect to the inner function, then multiply by the derivative of the inner function.',
    level: 'Review due',
  },
  {
    id: 'c6',
    deckId: 'deck-4',
    deckName: 'Big-O & Algorithmic Complexity',
    subject: 'Computer Science',
    question: 'What is the average and worst-case time complexity of Merge Sort, and why?',
    hint: 'Divide and conquer recursion tree',
    answer: 'O(n log n) in all cases (best, average, and worst).',
    detail: 'The array is divided into halves log(n) times, and merging all sub-arrays at each tree level requires linear O(n) work.',
    level: 'Mastered',
  },
];

export default function Flashcards() {
  const [decks, setDecks] = useState(INITIAL_DECKS);
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [selectedDeckId, setSelectedDeckId] = useState('all');
  const [activeTab, setActiveTab] = useState('study'); // 'study' | 'library'

  // Study session state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);

  // New card modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCardDeck, setNewCardDeck] = useState(INITIAL_DECKS[0].id);
  const [newCardQuestion, setNewCardQuestion] = useState('');
  const [newCardAnswer, setNewCardAnswer] = useState('');
  const [newCardHint, setNewCardHint] = useState('');

  // Filtered study cards
  const filteredCards = selectedDeckId === 'all'
    ? cards
    : cards.filter((c) => c.deckId === selectedDeckId);

  const currentCard = filteredCards[currentIndex];

  const handleNextCard = useCallback(() => {
    setIsFlipped(false);
    setShowHint(false);
    setReviewedCount((prev) => prev + 1);

    if (currentIndex + 1 < filteredCards.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setSessionCompleted(true);
    }
  }, [currentIndex, filteredCards.length]);

  const handlePrevCard = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setShowHint(false);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleRestartSession = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowHint(false);
    setSessionCompleted(false);
    setReviewedCount(0);
  };

  // Keyboard shortcut listener for space (flip) and 1,2,3,4 (rating)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if typing in modal or textarea
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        return;
      }

      if (activeTab === 'study' && !sessionCompleted && currentCard) {
        if (e.code === 'Space') {
          e.preventDefault();
          handleFlip();
        } else if (isFlipped) {
          if (['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Numpad1', 'Numpad2', 'Numpad3', 'Numpad4'].includes(e.code)) {
            e.preventDefault();
            handleNextCard();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, sessionCompleted, currentCard, isFlipped, handleNextCard]);

  const handleCreateCard = (e) => {
    e.preventDefault();
    if (!newCardQuestion.trim() || !newCardAnswer.trim()) return;

    const targetDeck = decks.find((d) => d.id === newCardDeck);
    const newCard = {
      id: `c-${Date.now()}`,
      deckId: newCardDeck,
      deckName: targetDeck ? targetDeck.title : 'General',
      subject: targetDeck ? targetDeck.subject : 'General',
      question: newCardQuestion.trim(),
      answer: newCardAnswer.trim(),
      hint: newCardHint.trim(),
      detail: 'Custom card added by developer.',
      level: 'Learning',
    };

    setCards([newCard, ...cards]);
    setDecks((prev) =>
      prev.map((d) =>
        d.id === newCardDeck
          ? { ...d, totalCards: d.totalCards + 1, dueCards: d.dueCards + 1 }
          : d
      )
    );

    setNewCardQuestion('');
    setNewCardAnswer('');
    setNewCardHint('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto select-none">
      {/* Top Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-zinc-800 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-semibold tracking-tight text-white">
              Flashcards & Spaced Recall
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-mono uppercase bg-zinc-900 text-zinc-400 border border-zinc-800 rounded">
              SM-2 Active
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            Optimized active recall intervals, algorithmically scheduled review decks.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {/* View Tab Toggle */}
          <div className="flex bg-zinc-900 p-0.5 rounded border border-zinc-800 text-xs font-mono">
            <button
              onClick={() => setActiveTab('study')}
              className={`px-3 py-1.5 rounded transition-colors text-[11px] ${
                activeTab === 'study'
                  ? 'bg-zinc-800 text-white font-medium border border-zinc-700 shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Review Session
            </button>
            <button
              onClick={() => setActiveTab('library')}
              className={`px-3 py-1.5 rounded transition-colors text-[11px] ${
                activeTab === 'library'
                  ? 'bg-zinc-800 text-white font-medium border border-zinc-700 shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Deck Library ({decks.length})
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white text-black hover:bg-zinc-200 text-xs font-medium rounded-md transition-colors"
          >
            <Plus size={13} />
            <span>New Card</span>
          </button>
        </div>
      </header>

      {/* Metric Telemetry Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3.5">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[11px] font-mono uppercase">Due Today</span>
            <Clock size={13} />
          </div>
          <div className="text-2xl font-mono font-bold text-white mt-1.5">
            {filteredCards.length}
          </div>
          <p className="text-[10px] font-mono text-zinc-500 mt-0.5">Cards pending review</p>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3.5">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[11px] font-mono uppercase">Mastered</span>
            <Brain size={13} />
          </div>
          <div className="text-2xl font-mono font-bold text-white mt-1.5">
            342
          </div>
          <p className="text-[10px] font-mono text-zinc-500 mt-0.5">Interval &gt; 21 days</p>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3.5">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[11px] font-mono uppercase">Decks</span>
            <Layers size={13} />
          </div>
          <div className="text-2xl font-mono font-bold text-white mt-1.5">
            {decks.length}
          </div>
          <p className="text-[10px] font-mono text-zinc-500 mt-0.5">Active curriculum</p>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3.5">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[11px] font-mono uppercase">Retention</span>
            <Sparkles size={13} />
          </div>
          <div className="text-2xl font-mono font-bold text-white mt-1.5">
            94.2%
          </div>
          <p className="text-[10px] font-mono text-zinc-500 mt-0.5">Historical recall rate</p>
        </div>
      </div>

      {/* TAB 1: STUDY SESSION MODE */}
      {activeTab === 'study' && (
        <div className="space-y-4">
          {/* Deck Selector Filter Bar */}
          <div className="flex items-center justify-between p-3 bg-zinc-950 border border-zinc-800 rounded-lg">
            <div className="flex items-center space-x-2 overflow-x-auto text-xs font-mono">
              <span className="text-zinc-500 text-[11px] uppercase mr-1">Scope:</span>
              <button
                onClick={() => {
                  setSelectedDeckId('all');
                  handleRestartSession();
                }}
                className={`px-2.5 py-1 rounded transition-colors ${
                  selectedDeckId === 'all'
                    ? 'bg-zinc-800 text-white border border-zinc-700'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                All Decks ({cards.length})
              </button>
              {decks.map((deck) => (
                <button
                  key={deck.id}
                  onClick={() => {
                    setSelectedDeckId(deck.id);
                    handleRestartSession();
                  }}
                  className={`px-2.5 py-1 rounded transition-colors shrink-0 ${
                    selectedDeckId === deck.id
                      ? 'bg-zinc-800 text-white border border-zinc-700'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {deck.title}
                </button>
              ))}
            </div>

            <div className="hidden sm:flex items-center space-x-2 text-[11px] font-mono text-zinc-500">
              <span>Flip: <kbd className="dev-kbd">Space</kbd></span>
              <span>Rate: <kbd className="dev-kbd">1-4</kbd></span>
            </div>
          </div>

          {/* Session Progress Header */}
          {!sessionCompleted && currentCard && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <div className="flex items-center space-x-2">
                  <span className="text-white font-medium">Card {currentIndex + 1} of {filteredCards.length}</span>
                  <span>•</span>
                  <span className="text-zinc-500">Deck: {currentCard.deckName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrevCard}
                    disabled={currentIndex === 0}
                    className="p-1 rounded hover:bg-zinc-900 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={handleNextCard}
                    className="p-1 rounded hover:bg-zinc-900 transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
              <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / filteredCards.length) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* 3D Interactive Card Flip Container */}
          {!sessionCompleted && currentCard ? (
            <div className="perspective-1000 max-w-2xl mx-auto py-2">
              <div
                onClick={handleFlip}
                className={`relative w-full min-h-[360px] transform-style-3d transition-transform duration-500 cursor-pointer ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* CARD FRONT */}
                <div className="absolute inset-0 backface-hidden bg-zinc-950 border border-zinc-800 rounded-xl p-8 flex flex-col justify-between hover:border-zinc-700 transition-colors shadow-2xl">
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 mb-6">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                          {currentCard.subject}
                        </span>
                        <span className="text-[11px] font-mono text-zinc-500">
                          {currentCard.deckName}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-zinc-500">
                        FRONT
                      </span>
                    </div>

                    <div className="py-4">
                      <p className="text-lg sm:text-xl font-medium text-white leading-relaxed">
                        {currentCard.question}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-zinc-800/80">
                    {/* Hint Drawer */}
                    {currentCard.hint && (
                      <div>
                        {showHint ? (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="p-2.5 rounded bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 flex items-start space-x-2"
                          >
                            <Eye size={13} className="shrink-0 mt-0.5 text-zinc-400" />
                            <span>Hint: {currentCard.hint}</span>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowHint(true);
                            }}
                            className="text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors flex items-center space-x-1"
                          >
                            <span>💡 View Hint</span>
                          </button>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
                      <span>Click card or press <kbd className="dev-kbd">Space</kbd> to reveal</span>
                      <RotateCw size={13} />
                    </div>
                  </div>
                </div>

                {/* CARD BACK */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-zinc-950 border border-zinc-700 rounded-xl p-8 flex flex-col justify-between shadow-2xl">
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 mb-6">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                          {currentCard.subject}
                        </span>
                        <span className="text-[11px] font-mono text-emerald-400">
                          ANSWER
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-zinc-500">
                        BACK
                      </span>
                    </div>

                    <div className="space-y-4 py-2">
                      <div className="p-4 rounded bg-zinc-900 border border-zinc-800 font-mono text-sm sm:text-base text-white font-medium leading-relaxed">
                        {currentCard.answer}
                      </div>

                      {currentCard.detail && (
                        <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                          {currentCard.detail}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-800/80 text-[11px] font-mono text-zinc-500 flex items-center justify-between">
                    <span>Rate recall below to schedule next interval</span>
                    <RotateCw size={13} />
                  </div>
                </div>
              </div>

              {/* Spaced Repetition Rating Action Bar (Appears when flipped) */}
              <div className="mt-4 max-w-2xl mx-auto">
                {isFlipped ? (
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      onClick={handleNextCard}
                      className="p-3 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 rounded-lg text-left transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-medium text-zinc-300 group-hover:text-white">
                          Again
                        </span>
                        <kbd className="dev-kbd">1</kbd>
                      </div>
                      <p className="text-[10px] font-mono text-zinc-500 mt-1">&lt; 1 min</p>
                    </button>

                    <button
                      onClick={handleNextCard}
                      className="p-3 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 rounded-lg text-left transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-medium text-zinc-300 group-hover:text-white">
                          Hard
                        </span>
                        <kbd className="dev-kbd">2</kbd>
                      </div>
                      <p className="text-[10px] font-mono text-zinc-500 mt-1">12 hours</p>
                    </button>

                    <button
                      onClick={handleNextCard}
                      className="p-3 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 rounded-lg text-left transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-medium text-zinc-300 group-hover:text-white">
                          Good
                        </span>
                        <kbd className="dev-kbd">3</kbd>
                      </div>
                      <p className="text-[10px] font-mono text-zinc-500 mt-1">1 day</p>
                    </button>

                    <button
                      onClick={handleNextCard}
                      className="p-3 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 rounded-lg text-left transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-medium text-white">
                          Easy
                        </span>
                        <kbd className="dev-kbd">4</kbd>
                      </div>
                      <p className="text-[10px] font-mono text-zinc-400 mt-1">4 days</p>
                    </button>
                  </div>
                ) : (
                  <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg text-center text-xs font-mono text-zinc-500">
                    Click the card or press <kbd className="dev-kbd">Space</kbd> to inspect the answer and trigger SM-2 rating
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Session Completed Summary State */
            <div className="max-w-md mx-auto my-8 p-8 bg-zinc-950 border border-zinc-800 rounded-xl text-center space-y-4">
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center mx-auto text-white">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white tracking-tight">
                  Session Completed
                </h3>
                <p className="text-xs text-zinc-400 font-mono mt-1">
                  You reviewed {reviewedCount} cards in this scope. Next scheduled interval updated in SM-2 engine.
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-center space-x-2">
                <button
                  onClick={handleRestartSession}
                  className="px-4 py-2 bg-white hover:bg-zinc-200 text-black rounded text-xs font-medium transition-colors"
                >
                  Review Again
                </button>
                <button
                  onClick={() => setActiveTab('library')}
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded text-xs font-mono transition-colors border border-zinc-800"
                >
                  View Decks
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: DECK LIBRARY MODE */}
      {activeTab === 'library' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {decks.map((deck) => {
              const deckCards = cards.filter((c) => c.deckId === deck.id);
              return (
                <div
                  key={deck.id}
                  className="p-5 bg-zinc-950 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                        {deck.subject}
                      </span>
                      <span className="text-xs font-mono text-zinc-500">
                        {deck.dueCards} cards due
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-white tracking-tight mt-3">
                      {deck.title}
                    </h3>
                    <p className="text-xs font-mono text-zinc-400 mt-1">
                      {deckCards.length} cards total • {deck.masteredPercentage}% retention rate
                    </p>

                    {/* Progress Bar */}
                    <div className="mt-4 space-y-1">
                      <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                        <span>Mastery</span>
                        <span>{deck.masteredPercentage}%</span>
                      </div>
                      <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white"
                          style={{ width: `${deck.masteredPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setSelectedDeckId(deck.id);
                        setActiveTab('study');
                        handleRestartSession();
                      }}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white hover:bg-zinc-200 text-black rounded text-xs font-medium transition-colors"
                    >
                      <span>Study Deck</span>
                      <ArrowRight size={12} />
                    </button>

                    <button
                      onClick={() => {
                        setNewCardDeck(deck.id);
                        setIsModalOpen(true);
                      }}
                      className="text-xs font-mono text-zinc-400 hover:text-white transition-colors"
                    >
                      + Add Card
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CREATE CARD MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-tight">Create Flashcard</h3>
                <p className="text-xs font-mono text-zinc-500">Add a custom concept prompt and answer</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateCard} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                  Select Target Deck
                </label>
                <select
                  value={newCardDeck}
                  onChange={(e) => setNewCardDeck(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded text-xs text-white focus:outline-none focus:border-zinc-500 font-mono"
                >
                  {decks.map((deck) => (
                    <option key={deck.id} value={deck.id}>
                      {deck.title} ({deck.subject})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                  Front Prompt / Question
                </label>
                <textarea
                  rows={2}
                  required
                  value={newCardQuestion}
                  onChange={(e) => setNewCardQuestion(e.target.value)}
                  placeholder="e.g. What is the time complexity of Quick Sort partition?"
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 font-mono resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                  Back Answer
                </label>
                <textarea
                  rows={3}
                  required
                  value={newCardAnswer}
                  onChange={(e) => setNewCardAnswer(e.target.value)}
                  placeholder="e.g. O(n) linear scan comparing elements with the pivot."
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 font-mono resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                  Optional Hint
                </label>
                <input
                  type="text"
                  value={newCardHint}
                  onChange={(e) => setNewCardHint(e.target.value)}
                  placeholder="e.g. Two-pointer partition algorithm"
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 font-mono"
                />
              </div>

              <div className="pt-3 border-t border-zinc-800 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 rounded text-xs font-mono text-zinc-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded text-xs font-medium bg-white hover:bg-zinc-200 text-black transition-colors"
                >
                  Add Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
