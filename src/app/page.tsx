import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
            Control Dashboard
          </h1>
          <p className="text-slate-400 text-xl">
            Your personal command center for projects & interfaces
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Robot Control Card */}
          <Link href="/robot">
            <div className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 shadow-xl hover:border-emerald-500 hover:shadow-emerald-500/20 transition-all duration-300 cursor-pointer hover:scale-105">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                🤖
              </div>
              <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                Robot Control
              </h2>
              <p className="text-slate-400 text-sm">
                Control your robot with keyboard or interface
              </p>
            </div>
          </Link>

          {/* Camera Feeds Card - Placeholder */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 shadow-xl opacity-60">
            <div className="text-5xl mb-4">
              📹
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Camera Feeds
            </h2>
            <p className="text-slate-400 text-sm">
              Coming soon
            </p>
          </div>

          {/* System Monitor Card - Placeholder */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 shadow-xl opacity-60">
            <div className="text-5xl mb-4">
              📊
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              System Monitor
            </h2>
            <p className="text-slate-400 text-sm">
              Coming soon
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-slate-500 text-sm">
            Dashboard v1.0 • Private Interface
          </p>
        </div>
      </div>
    </div>
  );
}