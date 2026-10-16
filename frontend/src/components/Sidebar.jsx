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
    <aside className="h-screen w-64 bg-white border-r border-zinc-200 flex flex-col fixed left-0 top-0 select-none shadow-xs">
      {/* Brand Header */}
      <div className="p-5 border-b border-zinc-200/80 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center space-x-2.5 group">
          <div className="w-7 h-7 rounded bg-zinc-950 flex items-center justify-center text-white font-mono font-bold text-xs tracking-tight shadow-xs">
            AI
          </div>
          <span className="text-sm font-semibold tracking-tight text-zinc-950 group-hover:text-zinc-700 transition-colors">
            StudyAI
          </span>
        </Link>
        <span className="text-[10px] font-mono px-1.5 py-0.5 bg-zinc-100 text-zinc-600 border border-zinc-200 rounded">
          PRO
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-mono uppercase tracking-wider text-zinc-600">
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
                  ? 'bg-zinc-100 text-zinc-950 border border-zinc-200/80 font-semibold' 
                  : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950'
              }`}
            >
              <Icon 
                size={16} 
                className={`mr-2.5 ${isActive ? 'text-zinc-950' : 'text-zinc-600'}`} 
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom User / Settings Section */}
      <div className="p-3 border-t border-zinc-200 space-y-0.5">
        <Link 
          to="/settings" 
          className="flex items-center px-3 py-2 rounded-md text-xs font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950 transition-colors"
        >
          <Settings size={16} className="mr-2.5 text-zinc-600" />
          <span>Settings</span>
        </Link>
        <Link 
          to="/login" 
          className="flex items-center px-3 py-2 rounded-md text-xs font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950 transition-colors"
        >
          <LogOut size={16} className="mr-2.5 text-zinc-600" />
          <span>Log out</span>
        </Link>
      </div>
    </aside>
  );
}
