"use client";

import { useState } from "react";
import { Skull, LogOut, User as UserIcon, AlertTriangle, RefreshCw, Flame, Sparkles } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [roastData, setRoastData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const generateRoast = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const ytRes = await fetch("/api/youtube");
      const ytData = await ytRes.json();

      if (!ytRes.ok) {
        throw new Error(ytData.error || "Failed to load watch history.");
      }

      const roastRes = await fetch("/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscriptions: ytData.subscriptions,
          likedVideos: ytData.likedVideos,
        }),
      });

      const roastJson = await roastRes.json();
      if (!roastRes.ok) {
        throw new Error(roastJson.error || "Failed to generate roast.");
      }

      setRoastData(roastJson);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-red-500 selection:text-white overflow-x-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-red-600/15 blur-[140px] pointer-events-none rounded-full" />

      {/* Navbar */}
      <header className="relative z-10 border-b border-white/10 px-6 py-5 flex items-center justify-between max-w-7xl mx-auto w-full backdrop-blur-md">
        <div className="flex items-center gap-3 font-black text-2xl tracking-tight bg-gradient-to-r from-red-500 via-orange-500 to-amber-400 bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer">
          <Flame className="w-8 h-8 text-red-500 fill-red-500 animate-pulse" />
          <span>YT Roast</span>
        </div>
        <div>
          {session ? (
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md shadow-lg">
              {session.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="w-7 h-7 rounded-full border border-red-500/50 object-cover"
                />
              ) : (
                <UserIcon className="w-5 h-5 text-slate-400" />
              )}
              <span className="text-xs font-semibold text-slate-200 hidden sm:inline">
                {session.user?.name}
              </span>
              <button
                onClick={() => signOut()}
                className="text-xs bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 px-3 py-1 rounded-full transition-all flex items-center gap-1.5 ml-2 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="text-xs uppercase px-5 py-2.5 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold rounded-full transition-all shadow-lg shadow-red-600/30 hover:scale-105 active:scale-95 cursor-pointer"
            >
              Sign In
            </button>
          )}
        </div>
      </header>

      {/* Hero Section / Roast Output */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center flex flex-col items-center w-full">
        {!roastData ? (
          <>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider mb-8 animate-bounce">
              <Sparkles className="w-4 h-4" />
              <span>Warning: ego damage imminent</span>
            </div>

            <h1 className="text-6xl sm:text-8xl font-black tracking-tight mb-8 leading-[1.05] text-white">
              Get <span className="bg-gradient-to-r from-red-500 via-orange-500 to-amber-400 bg-clip-text text-transparent underline decoration-red-500/50 decoration-wavy">cooked</span> by your YouTube history.
            </h1>

            <p className="text-lg sm:text-2xl text-slate-400 max-w-3xl mb-16 leading-relaxed font-normal">
              Connect your account, let our AI dig through your 3 AM binges and guilty pleasures, and receive a brutal roast report.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
              {session ? (
                <div className="flex flex-col items-center gap-4 w-full">
                  <div className="p-8 bg-slate-900/80 border border-white/10 rounded-3xl w-full max-w-lg text-center backdrop-blur-xl shadow-2xl shadow-red-600/10">
                    <p className="text-sm text-slate-300 mb-6 font-medium">
                      Ready to expose <span className="text-amber-400 font-bold">{session.user?.email}</span>?
                    </p>
                    <button
                      onClick={generateRoast}
                      disabled={loading}
                      className="group relative inline-flex items-center justify-center gap-3 px-8 py-5 font-extrabold text-lg text-white bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 rounded-2xl shadow-xl shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all w-full cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <RefreshCw className="w-6 h-6 animate-spin" />
                          <span>Searching your soul...</span>
                        </>
                      ) : (
                        <>
                          <Skull className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                          <span>Roast My YouTube History</span>
                        </>
                      )}
                    </button>
                    {errorMsg && (
                      <p className="mt-4 text-xs text-red-400 border border-red-500/40 p-3 bg-red-950/40 rounded-xl">
                        {errorMsg}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => signIn("google")}
                  className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 font-black text-xl text-white bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 rounded-2xl shadow-2xl shadow-red-600/40 hover:shadow-red-600/60 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Skull className="w-7 h-7 group-hover:rotate-12 transition-transform" />
                  <span>Sign In with Google & Get Roasted</span>
                </button>
              )}
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-32 w-full text-left">
              <div className="bg-slate-900/40 border border-white/10 p-8 rounded-3xl backdrop-blur-md hover:border-red-500/40 transition-all hover:translate-y-[-4px]">
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-6 text-2xl font-bold shadow-inner">
                  💀
                </div>
                <h3 className="font-bold text-xl mb-3 text-white">Brutal Roasts</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  No sugarcoating. We expose your weirdest media habits with zero mercy.
                </p>
              </div>

              <div className="bg-slate-900/40 border border-white/10 p-8 rounded-3xl backdrop-blur-md hover:border-orange-500/40 transition-all hover:translate-y-[-4px]">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-6 text-2xl font-bold shadow-inner">
                  📊
                </div>
                <h3 className="font-bold text-xl mb-3 text-white">Brainrot Score</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  A quantified percentage measuring how cooked your dopamine receptors are.
                </p>
              </div>

              <div className="bg-slate-900/40 border border-white/10 p-8 rounded-3xl backdrop-blur-md hover:border-amber-500/40 transition-all hover:translate-y-[-4px]">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 text-2xl font-bold shadow-inner">
                  🚩
                </div>
                <h3 className="font-bold text-xl mb-3 text-white">Red Flags</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Instant identification of questionable subscription loops and late-night binges.
                </p>
              </div>
            </div>
          </>
        ) : (
          /* Roast Result Card */
          <div className="w-full max-w-3xl bg-slate-950/90 border border-white/10 p-10 text-left rounded-3xl backdrop-blur-2xl shadow-2xl shadow-red-600/10 my-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-8">
              <span className="text-xs uppercase bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-1.5 rounded-full font-bold tracking-wider">
                Official Roast Verdict
              </span>
              <button
                onClick={() => setRoastData(null)}
                className="text-xs font-semibold text-slate-300 hover:text-white border border-white/10 hover:border-white/30 px-4 py-2 rounded-xl bg-white/5 transition-all cursor-pointer"
              >
                 Roast Someone Else
              </button>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 bg-slate-900/60 p-6 rounded-2xl border border-white/5">
              <div>
                <h2 className="text-xs uppercase text-slate-400 tracking-wider mb-2 font-bold">Diagnosis</h2>
                <h3 className="text-3xl font-black text-white">
                  {roastData.roastTitle}
                </h3>
              </div>
              <div className="text-right bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/40 p-5 rounded-2xl min-w-[140px] shadow-xl">
                <div className="text-[11px] font-bold text-red-300 uppercase tracking-wider">Brainrot Score</div>
                <div className="text-4xl font-black text-red-400">{roastData.brainrotScore}%</div>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-xs uppercase text-slate-400 mb-3 font-bold tracking-wider">The Roast</h4>
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed bg-slate-900/40 p-6 rounded-2xl border border-white/5 font-sans">
                {roastData.primaryRoast}
              </p>
            </div>

            <div className="mb-8">
              <h4 className="text-xs uppercase text-red-400 mb-3 font-bold tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Detected Red Flags ({roastData.redFlags?.length || 0})
              </h4>
              <ul className="space-y-3">
                {(roastData.redFlags || []).map((flag: string, idx: number) => (
                  <li key={idx} className="text-sm text-slate-300 bg-red-950/20 border border-red-500/20 p-4 rounded-xl flex items-start gap-3">
                    <span className="text-red-400 font-bold mt-0.5">🚩</span>
                    <span className="font-medium">{flag}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-r from-red-950/30 to-amber-950/30 border border-amber-500/20 p-6 rounded-2xl">
              <h4 className="text-xs uppercase text-amber-400 mb-2 font-bold tracking-wider">Prescription</h4>
              <p className="text-sm text-slate-200 font-medium leading-relaxed">
                {roastData.prescription}
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8 text-center text-xs text-slate-500 bg-slate-900/30 backdrop-blur-md">
        YT Roast — For entertainment and existential reflection only.
      </footer>
    </div>
  );
}
