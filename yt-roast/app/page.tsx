"use client";

import Link from "next/link";
import { Flame, Sparkles, Skull } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-red-500 selection:text-white">
      {/* Navbar */}
      <header className="border-b border-slate-800/60 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 font-black text-2xl tracking-tight bg-gradient-to-r from-red-500 via-orange-500 to-amber-400 bg-clip-text text-transparent">
          <Flame className="w-8 h-8 text-red-500 fill-red-500 animate-pulse" />
          <span>YT Roast</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs uppercase px-2 py-1 bg-red-500/10 border border-red-500/30 text-red-400 rounded-full font-bold">
            🔥 100% Savage AI
          </span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-6 py-20 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-amber-400 text-sm font-medium mb-8 shadow-inner">
          <Sparkles className="w-4 h-4 animate-spin" />
          <span>Prepare to question your life choices</span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-black tracking-tight mb-6 leading-tight">
          Get <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent underline decoration-red-500/50 decoration-wavy">Cooked</span> By Your YouTube History.
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed">
          Sign in with Google, let our savage AI analyze your watch history and playlists, and receive a brutal roast report complete with your official <strong className="text-amber-400">Brainrot Score</strong>.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button
            onClick={() => alert("Google Auth integration coming up next! Stay tuned.")}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 font-bold text-lg text-white bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 rounded-2xl shadow-xl shadow-red-600/20 hover:shadow-red-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Skull className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            <span>Sign in & Get Roasted</span>
          </button>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-24 w-full text-left">
          <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-4 font-bold text-lg">
              💀
            </div>
            <h3 className="font-bold text-lg mb-2 text-slate-200">Brutal Roasts</h3>
            <p className="text-slate-400 text-sm">
              No sugarcoating. We look at your 3 AM video essays and gaming binges and expose your soul.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-4 font-bold text-lg">
              📊
            </div>
            <h3 className="font-bold text-lg mb-2 text-slate-200">Brainrot Score</h3>
            <p className="text-slate-400 text-sm">
              A quantified percentage of how cooked your dopamine receptors actually are.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 font-bold text-lg">
              🚩
            </div>
            <h3 className="font-bold text-lg mb-2 text-slate-200">Red Flag Detector</h3>
            <p className="text-slate-400 text-sm">
              Spotting your weirdest subscription habits and guilty pleasure loops instantly.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-6 text-center text-xs text-slate-500">
        YT Roast — For entertainment and existential reflection only. Powered by AI.
      </footer>
    </div>
  );
}
