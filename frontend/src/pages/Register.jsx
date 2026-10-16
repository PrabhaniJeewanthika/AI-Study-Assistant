import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4 selection:bg-zinc-200 selection:text-black">
      <div className="bg-white border border-zinc-200 p-8 rounded-lg w-full max-w-sm shadow-sm">
        {/* Brand Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-8 h-8 rounded bg-zinc-950 text-white font-mono font-bold text-xs flex items-center justify-center shadow-xs">
            AI
          </div>
        </div>

        <div className="text-center space-y-1 mb-6">
          <h1 className="text-lg font-semibold tracking-tight text-zinc-950">
            Create an Account
          </h1>
          <p className="text-xs text-zinc-500 font-mono">
            Register your workspace to begin
          </p>
        </div>

        <form className="space-y-4">
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-zinc-700 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                  <User size={15} />
                </div>
                <input
                  type="text"
                  placeholder="Alex Morgan"
                  className="w-full pl-9 pr-3 py-2 bg-white border border-zinc-300 rounded text-xs text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-zinc-950 font-mono transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-zinc-700 uppercase tracking-wider">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                  <Mail size={15} />
                </div>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2 bg-white border border-zinc-300 rounded text-xs text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-zinc-950 font-mono transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-zinc-700 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                  <Lock size={15} />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 bg-white border border-zinc-300 rounded text-xs text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-zinc-950 font-mono transition-colors"
                />
              </div>
            </div>
          </div>

          <Link
            to="/dashboard"
            className="w-full bg-zinc-950 hover:bg-zinc-800 text-white font-medium py-2 px-3 rounded text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-xs mt-2"
          >
            <span>Create Workspace</span>
            <ArrowRight size={13} />
          </Link>
        </form>

        <div className="mt-6 text-center text-xs text-zinc-500 font-mono border-t border-zinc-200 pt-4">
          Already registered?{' '}
          <Link to="/login" className="text-zinc-950 font-medium hover:underline transition-all">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
