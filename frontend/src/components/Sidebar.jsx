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
    <div className="h-screen w-64 glass-card border-r border-gray-800 flex flex-col fixed left-0 top-0">
      <div className="p-6 flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-electric to-cyan-accent flex items-center justify-center">
          <span className="text-white font-bold text-xl">A</span>
        </div>
        <span className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-main-text to-secondary-text">
          StudyAI
        </span>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto mt-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-3 py-3 rounded-lg transition-all group ${
                isActive 
                  ? 'bg-primary/20 text-electric' 
                  : 'text-secondary-text hover:bg-secondary-bg hover:text-main-text'
              }`}
            >
              <Icon 
                size={20} 
                className={`mr-3 ${isActive ? 'text-electric' : 'text-secondary-text group-hover:text-main-text'} transition-colors`} 
              />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800 space-y-1">
        <Link to="/settings" className="flex items-center px-3 py-3 rounded-lg text-secondary-text hover:bg-secondary-bg hover:text-main-text transition-all group">
          <Settings size={20} className="mr-3 text-secondary-text group-hover:text-main-text transition-colors" />
          <span className="font-medium">Settings</span>
        </Link>
        <Link to="/login" className="flex items-center px-3 py-3 rounded-lg text-secondary-text hover:bg-red-900/20 hover:text-red-400 transition-all group">
          <LogOut size={20} className="mr-3 text-secondary-text group-hover:text-red-400 transition-colors" />
          <span className="font-medium">Log out</span>
        </Link>
      </div>
    </div>
  );
}
