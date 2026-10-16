import { Flame, Brain, Clock, Target, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { name: 'Study Streak', value: '12 Days', change: '+2 vs last week', icon: Flame },
  { name: 'Flashcards Mastered', value: '342', change: '89% retention', icon: Brain },
  { name: 'Study Hours', value: '45.5h', change: 'This month', icon: Clock },
  { name: 'Goal Completion', value: '85%', change: 'Target: 90%', icon: Target },
];

const activities = [
  { title: 'Completed Biology Quiz (Mitosis & Meiosis)', time: '2 hours ago', score: '92%' },
  { title: 'Mastered 20 Physics Kinematics Flashcards', time: 'Yesterday', score: '100%' },
  { title: 'Indexed new Calculus notes (Chain Rule)', time: '2 days ago', score: null },
  { title: 'AI Tutor session: Big-O algorithm analysis', time: '3 days ago', score: 'Complete' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-zinc-200 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-semibold tracking-tight text-zinc-950">
              System Overview
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-mono uppercase bg-zinc-100 text-zinc-600 border border-zinc-200 rounded">
              Synced
            </span>
          </div>
          <p className="text-xs text-zinc-600 mt-1 font-mono">
            Real-time telemetry on study metrics, active recall sessions, and AI assistance.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link
            to="/dashboard/chat"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-950 text-white hover:bg-zinc-800 text-xs font-medium rounded-md transition-colors shadow-xs"
          >
            <Sparkles size={13} />
            <span>Launch AI Tutor</span>
          </Link>
        </div>
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white border border-zinc-200 rounded-lg p-4 shadow-2xs hover:border-zinc-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-600">
                  {stat.name}
                </span>
                <div className="w-7 h-7 rounded bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-700">
                  <Icon size={14} />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-mono font-bold tracking-tight text-zinc-950">
                  {stat.value}
                </div>
                <div className="text-[11px] text-zinc-600 font-mono mt-1">
                  {stat.change}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Activity + AI Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Activity Log */}
        <div className="bg-white border border-zinc-200 rounded-lg p-5 shadow-2xs lg:col-span-2">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-200 mb-4">
            <div>
              <h2 className="text-sm font-semibold text-zinc-950 tracking-tight">
                Activity Stream
              </h2>
              <p className="text-[11px] text-zinc-600 font-mono">
                Latest study events and quiz logs
              </p>
            </div>
            <Link
              to="/dashboard/analytics"
              className="text-xs text-zinc-600 hover:text-zinc-950 flex items-center font-mono transition-colors"
            >
              Logs <ArrowRight size={12} className="ml-1" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-md bg-zinc-50 border border-zinc-200/80 hover:border-zinc-300 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-400"></div>
                  <div>
                    <p className="text-xs font-medium text-zinc-900">
                      {activity.title}
                    </p>
                    <p className="text-[11px] font-mono text-zinc-600">
                      {activity.time}
                    </p>
                  </div>
                </div>
                {activity.score && (
                  <span className="px-2 py-0.5 bg-zinc-100 border border-zinc-200 text-zinc-700 rounded text-[11px] font-mono">
                    {activity.score}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations Panel */}
        <div className="bg-white border border-zinc-200 rounded-lg p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 mb-4">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-600 flex items-center">
                <Sparkles size={12} className="mr-1.5 text-zinc-700" />
                Adaptive Recommendation
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
            <h3 className="text-sm font-semibold text-zinc-950 mb-2">
              Focus: Cell Structure & Mitosis
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed font-normal">
              Based on your quiz results, your retention on Prophase and Metaphase is at 74%. Dedicate a 20-minute active recall session before your upcoming test.
            </p>
          </div>

          <div className="pt-6 border-t border-zinc-200 mt-6">
            <Link
              to="/dashboard/chat"
              className="w-full py-2 px-3 bg-zinc-950 hover:bg-zinc-800 text-white rounded-md text-xs font-medium transition-colors flex items-center justify-center space-x-1.5 shadow-xs"
            >
              <span>Start Review Session</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
