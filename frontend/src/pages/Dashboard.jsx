import { Flame, Brain, Clock, Target, ChevronRight } from 'lucide-react';

const stats = [
  { name: 'Study Streak', value: '12 Days', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { name: 'Flashcards Mastered', value: '342', icon: Brain, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { name: 'Study Hours', value: '45.5h', icon: Clock, color: 'text-electric', bg: 'bg-electric/10' },
  { name: 'Goal Progress', value: '85%', icon: Target, color: 'text-green-500', bg: 'bg-green-500/10' },
];

const activities = [
  { title: 'Completed Biology Quiz', time: '2 hours ago', score: '92%' },
  { title: 'Mastered 20 Physics Flashcards', time: 'Yesterday' },
  { title: 'Uploaded new Calculus notes', time: '2 days ago' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-main-text to-secondary-text">
          Dashboard Overview
        </h1>
        <p className="text-secondary-text mt-2">
          Welcome back! Here's a summary of your study progress.
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="glass-card p-6 rounded-2xl glow-effect hover:-translate-y-1 transition-transform">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary-text text-sm font-medium">{stat.name}</p>
                  <p className="text-3xl font-bold mt-2 text-main-text">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-full ${stat.bg} flex items-center justify-center`}>
                  <Icon className={stat.color} size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="glass-card p-6 rounded-2xl lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-main-text">Recent Activity</h2>
            <button className="text-electric hover:text-cyan-accent text-sm flex items-center transition-colors">
              View All <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-secondary-bg/50 border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 rounded-full bg-electric"></div>
                  <div>
                    <p className="text-main-text font-medium">{activity.title}</p>
                    <p className="text-sm text-secondary-text">{activity.time}</p>
                  </div>
                </div>
                {activity.score && (
                  <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-sm font-medium">
                    {activity.score}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations Placeholder */}
        <div className="glass-card p-6 rounded-2xl border border-electric/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-electric/10 rounded-full blur-3xl"></div>
          <h2 className="text-xl font-bold text-main-text mb-4">AI Tutor Says...</h2>
          <p className="text-secondary-text leading-relaxed">
            "You're doing great with Physics! However, your Biology test is coming up in 3 days. I recommend dedicating 1 hour to reviewing the cell structure flashcards today."
          </p>
          <button className="mt-6 w-full py-2 bg-electric/10 hover:bg-electric/20 text-electric rounded-lg font-medium transition-colors border border-electric/20">
            Start Suggested Review
          </button>
        </div>
      </div>
    </div>
  );
}
