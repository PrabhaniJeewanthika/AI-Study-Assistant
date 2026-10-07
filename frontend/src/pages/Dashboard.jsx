export default function Dashboard() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-main-text to-secondary-text">
          Dashboard Overview
        </h1>
        <p className="text-secondary-text mt-2">
          Welcome back! Here's a summary of your study progress.
        </p>
      </header>

      <div className="glass-card p-8 rounded-2xl flex items-center justify-center min-h-75 border-dashed border-2 border-gray-700">
        <p className="text-secondary-text text-lg">
          Dashboard stats will appear here (Next feature).
        </p>
      </div>
    </div>
  );
}
