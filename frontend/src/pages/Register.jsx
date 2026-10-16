import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 selection:bg-zinc-800 selection:text-white">
      <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-lg w-full max-w-sm">
        {/* Brand Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-8 h-8 rounded bg-white text-black font-mono font-bold text-xs flex items-center justify-center">
            AI
          </div>
        </div>

        <div className="text-center space-y-1 mb-6">
          <h1 className="text-lg font-semibold tracking-tight text-white">
            Create an Account
          </h1>
          <p className="text-xs text-zinc-400 font-mono">
            Register your workspace to begin
          </p>
        </div>

        <form className="space-y-4">
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                  <User size={15} />
                </div>
                <input
                  type="text"
                  placeholder="Alex Morgan"
                  className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 font-mono transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                  <Mail size={15} />
                </div>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 font-mono transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                  <Lock size={15} />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 font-mono transition-colors"
                />
              </div>
            </div>
          </div>

          <Link
            to="/dashboard"
            className="w-full bg-white hover:bg-zinc-200 text-black font-medium py-2 px-3 rounded text-xs flex items-center justify-center space-x-1.5 transition-colors mt-2"
          >
            <span>Create Workspace</span>
            <ArrowRight size={13} />
          </Link>
        </form>

        <div className="mt-6 text-center text-xs text-zinc-400 font-mono border-t border-zinc-800/80 pt-4">
          Already registered?{' '}
          <Link to="/login" className="text-white hover:underline transition-all">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
