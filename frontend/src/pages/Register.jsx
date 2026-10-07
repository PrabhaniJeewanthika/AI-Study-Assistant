import { User, Mail, Lock, UserPlus, ArrowRight } from 'lucide-react';

export default function Register() {
  return (
    <div className="min-h-screen bg-main-bg flex items-center justify-center p-4">
      <div className="glass-card p-8 rounded-2xl w-full max-w-md glow-effect relative overflow-hidden">
        {/* Background gradient decorative element */}
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary via-electric to-cyan-accent"></div>
        
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-electric to-cyan-accent">
            Create Account
          </h1>
          <p className="text-secondary-text text-sm">
            Join us to supercharge your study sessions with AI.
          </p>
        </div>

        <form className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary-text">
                <User size={18} />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-3 bg-secondary-bg/50 border border-gray-700 rounded-lg focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-colors text-main-text placeholder-secondary-text"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary-text">
                <Mail size={18} />
              </div>
              <input
                type="email"
                placeholder="Email address"
                className="w-full pl-10 pr-4 py-3 bg-secondary-bg/50 border border-gray-700 rounded-lg focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-colors text-main-text placeholder-secondary-text"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary-text">
                <Lock size={18} />
              </div>
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 bg-secondary-bg/50 border border-gray-700 rounded-lg focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-colors text-main-text placeholder-secondary-text"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary-text">
                <Lock size={18} />
              </div>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full pl-10 pr-4 py-3 bg-secondary-bg/50 border border-gray-700 rounded-lg focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-colors text-main-text placeholder-secondary-text"
              />
            </div>
          </div>

          <button
            type="button"
            className="w-full bg-linear-to-r from-primary to-electric hover:from-electric hover:to-cyan-accent text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <UserPlus size={18} />
            <span>Sign Up</span>
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-secondary-text">
          Already have an account?{' '}
          <a href="#" className="text-electric hover:text-cyan-accent transition-colors inline-flex items-center group">
            Log in
            <ArrowRight size={14} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}
