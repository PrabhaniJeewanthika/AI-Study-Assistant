import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  MessageSquare, 
  HelpCircle, 
  Layers, 
  Calendar, 
  BarChart2, 
  Settings,
  LogOut
} from 'lucide-react';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Subjects', href: '/dashboard/subjects', icon: BookOpen },
  { name: 'Study Materials', href: '/dashboard/materials', icon: FileText },
  { name: 'AI Tutor', href: '/dashboard/chat', icon: MessageSquare },
  { name: 'Quizzes', href: '/dashboard/quizzes', icon: HelpCircle },
  { name: 'Flashcards', href: '/dashboard/flashcards', icon: Layers },
  { name: 'Planner', href: '/dashboard/planner', icon: Calendar },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart2 },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="h-screen w-64 bg-black border-r border-zinc-800 flex flex-col fixed left-0 top-0 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-zinc-800/80 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center space-x-2.5 group">
          <div className="w-7 h-7 rounded bg-white flex items-center justify-center text-black font-mono font-bold text-xs tracking-tight">
            AI
          </div>
          <span className="text-sm font-semibold tracking-tight text-white group-hover:text-zinc-200 transition-colors">
            StudyAI
          </span>
        </Link>
        <span className="text-[10px] font-mono px-1.5 py-0.5 bg-zinc-900 text-zinc-400 border border-zinc-800 rounded">
          PRO
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-mono uppercase tracking-wider text-zinc-400">
          Workspace
        </div>
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                isActive 
                  ? 'bg-zinc-900 text-white border border-zinc-800' 
                  : 'text-zinc-400 hover:bg-zinc-950 hover:text-zinc-200'
              }`}
            >
              <Icon 
                size={16} 
                className={`mr-2.5 ${isActive ? 'text-white' : 'text-zinc-400'}`} 
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom User / Settings Section */}
      <div className="p-3 border-t border-zinc-800 space-y-0.5">
        <Link 
          to="/settings" 
          className="flex items-center px-3 py-2 rounded-md text-xs font-medium text-zinc-400 hover:bg-zinc-950 hover:text-zinc-200 transition-colors"
        >
          <Settings size={16} className="mr-2.5 text-zinc-400" />
          <span>Settings</span>
        </Link>
        <Link 
          to="/login" 
          className="flex items-center px-3 py-2 rounded-md text-xs font-medium text-zinc-400 hover:bg-zinc-950 hover:text-zinc-200 transition-colors"
        >
          <LogOut size={16} className="mr-2.5 text-zinc-400" />
          <span>Log out</span>
        </Link>
      </div>
    </aside>
  );
}
