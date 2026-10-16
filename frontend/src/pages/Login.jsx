import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Login() {
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
            Sign in to StudyAI
          </h1>
          <p className="text-xs text-zinc-400 font-mono">
            Enter your credentials to continue
          </p>
        </div>

        <form className="space-y-4">
          <div className="space-y-3">
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
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                  Password
                </label>
                <a href="#" className="text-[11px] font-mono text-zinc-400 hover:text-white transition-colors">
                  Forgot?
                </a>
              </div>
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

          <div className="flex items-center text-xs">
            <label className="flex items-center space-x-2 cursor-pointer text-zinc-400 hover:text-zinc-200 transition-colors">
              <input
                type="checkbox"
                className="rounded border-zinc-800 bg-zinc-900 text-white focus:ring-0"
              />
              <span className="text-[11px] font-mono">Remember this device</span>
            </label>
          </div>

          <Link
            to="/dashboard"
            className="w-full bg-white hover:bg-zinc-200 text-black font-medium py-2 px-3 rounded text-xs flex items-center justify-center space-x-1.5 transition-colors"
          >
            <span>Continue</span>
            <ArrowRight size={13} />
          </Link>
        </form>

        <div className="mt-6 text-center text-xs text-zinc-400 font-mono border-t border-zinc-800/80 pt-4">
          No account yet?{' '}
          <Link to="/register" className="text-white hover:underline transition-all">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}
