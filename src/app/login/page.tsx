'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_38%)]" />

      <nav className="relative z-10 border-b border-sky-500/20 bg-slate-900/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500 text-lg font-bold text-white">
              D
            </div>
            <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-xl font-bold text-transparent">
              Deriv Index Trader
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-300 transition hover:text-sky-300">Home</Link>
            <Link href="/login">
              <button className="rounded-lg bg-sky-600 px-4 py-2 font-medium text-white transition hover:bg-sky-500">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white transition hover:bg-emerald-500">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col px-6 pb-20 pt-16">
        <section className="mb-16 text-center">
          <div className="mx-auto mb-6 inline-flex items-center rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sm text-sky-200">
            Deriv volatility indices only
          </div>
          <h1 className="mx-auto max-w-4xl text-5xl font-black tracking-tight text-white md:text-6xl">
            Deriv Index Trading Bot
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            Monitor R_10, R_25, R_50, R_75, and R_100 with live signal generation, market timing, and automated index-focused analysis.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/analyzer">
              <button className="rounded-xl bg-sky-600 px-8 py-3 text-lg font-semibold text-white transition hover:scale-[1.02] hover:bg-sky-500">
                Open Analyzer
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="rounded-xl border border-slate-600 bg-slate-800 px-8 py-3 text-lg font-semibold text-white transition hover:border-slate-500 hover:bg-slate-700">
                View Dashboard
              </button>
            </Link>
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: '📊',
              title: 'Index-Only Focus',
              text: 'All monitoring, analysis, and signal generation are tuned to Deriv volatility indices.',
            },
            {
              icon: '📈',
              title: 'Market Tracking',
              text: 'Track price shifts, volatility changes, and trade bias for each Deriv index in real time.',
            },
            {
              icon: '⚡',
              title: 'Signal Automation',
              text: 'Generate BUY, SELL, and HOLD ideas using a fast strategy engine built for index trading.',
            },
          ].map((feature) => (
            <div key={feature.title} className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6 shadow-glow">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10 text-2xl">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">{feature.title}</h3>
              <p className="text-slate-300">{feature.text}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
