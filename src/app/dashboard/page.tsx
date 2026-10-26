'use client';

import Link from 'next/link';
import { makeSparklinePath } from '@/lib/trading-bot';

const marketCards = [
  { symbol: 'R_10', label: 'Volatility 10', price: '2456.78', change: '+0.42%', tone: 'text-emerald-400' },
  { symbol: 'R_25', label: 'Volatility 25', price: '3789.45', change: '+1.12%', tone: 'text-emerald-400' },
  { symbol: 'R_50', label: 'Volatility 50', price: '4567.89', change: '-0.15%', tone: 'text-red-400' },
];

const stats = [
  { label: 'Win Rate', value: '71%', tone: 'text-emerald-400' },
  { label: 'Open Positions', value: '5', tone: 'text-sky-400' },
  { label: 'Avg. Signal', value: '88%', tone: 'text-violet-400' },
];

export default function HomePage() {
  const sparkline = makeSparklinePath([32, 28, 42, 36, 58, 53, 70, 74, 68, 81], 160, 56);

  return (
    <div className="min-h-screen bg-[#020817] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_35%)]" />

      <nav className="relative z-10 border-b border-sky-500/20 bg-slate-900/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 font-black text-white">
              F
            </div>
            <div>
              <div className="text-xl font-black tracking-tight text-white">Fumjamx</div>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-300 transition hover:text-sky-300">Home</Link>
            <Link href="/dashboard" className="text-slate-300 transition hover:text-sky-300">Dashboard</Link>
            <Link href="/login">
              <button className="rounded-xl bg-sky-600 px-4 py-2 font-medium text-white transition hover:bg-sky-500">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="rounded-xl bg-emerald-600 px-4 py-2 font-medium text-white transition hover:bg-emerald-500">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-16">
        <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex items-center rounded-full border border-sky-500/20 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-200">
              Deriv volatility indices only
            </div>

            <h1 className="max-w-2xl text-5xl font-black tracking-tight text-white md:text-6xl">
              Premium <span className="text-sky-400">Deriv</span> signal engine.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Fumjamx gives you a premium dashboard for monitoring R_10, R_25, R_50, R_75, and R_100 with live-style signal generation, volatility tracking, and high-confidence trade ideas.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/analyzer">
                <button className="rounded-xl bg-sky-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-sky-900/40 transition hover:bg-sky-500">
                  Open Analyzer
                </button>
              </Link>
              <Link href="/dashboard">
                <button className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 text-base font-semibold text-white transition hover:border-slate-500 hover:bg-slate-800">
                  View Dashboard
                </button>
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-3">
                  <div className="text-sm text-slate-400">{stat.label}</div>
                  <div className={`mt-1 text-2xl font-bold ${stat.tone}`}>{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-2xl shadow-blue-950/30 backdrop-blur-xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-400">Market Pulse</div>
                <div className="mt-1 text-2xl font-bold text-white">R_50</div>
              </div>
              <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-sm font-medium text-emerald-400">
                +1.12%
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
              <svg viewBox="0 0 160 56" className="h-16 w-full">
                <path d={sparkline} fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>

            <div className="mt-5 space-y-3">
              {marketCards.map((card) => (
                <div key={card.symbol} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 p-3">
                  <div>
                    <div className="font-semibold text-white">{card.symbol}</div>
                    <div className="text-xs text-slate-400">{card.label}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-white">{card.price}</div>
                    <div className={`text-xs ${card.tone}`}>{card.change}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
