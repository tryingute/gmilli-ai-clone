'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { advanceBotState, createInitialBotState, formatCurrency, formatPercent } from '@/lib/trading-bot';

export default function DashboardPage() {
  const [botState, setBotState] = useState(createInitialBotState());

  useEffect(() => {
    const tick = setInterval(() => {
      setBotState((prev) => advanceBotState(prev));
    }, 2500);

    return () => clearInterval(tick);
  }, []);

  const topSignals = botState.signals.slice(0, 3);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.10),_transparent_35%),linear-gradient(135deg,#020817,#0f172a_50%,#111827)] text-white">
      <header className="border-b border-sky-500/20 bg-slate-900/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-2xl font-bold text-sky-400">Gmilli AI Dashboard</div>
          <nav className="flex items-center gap-4">
            <button className="rounded-lg px-4 py-2 text-slate-300 hover:text-sky-300">Profile</button>
            <button className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-500">Logout</button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8 rounded-2xl border border-sky-500/20 bg-slate-900/70 p-6 shadow-glow">
          <h1 className="text-3xl font-bold text-white">Welcome to Your Dashboard</h1>
          <p className="mt-2 text-slate-300">Monitor your trading performance and manage your AI-powered strategies.</p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-sky-500/20 bg-slate-900/70 p-4">
            <h3 className="text-sm text-slate-400">Total Balance</h3>
            <p className="mt-2 text-3xl font-bold text-white">{formatCurrency(botState.balance)}</p>
          </div>
          <div className="rounded-xl border border-sky-500/20 bg-slate-900/70 p-4">
            <h3 className="text-sm text-slate-400">Today's P&L</h3>
            <p className="mt-2 text-3xl font-bold text-emerald-400">{formatCurrency(botState.pnl)}</p>
          </div>
          <div className="rounded-xl border border-sky-500/20 bg-slate-900/70 p-4">
            <h3 className="text-sm text-slate-400">Open Positions</h3>
            <p className="mt-2 text-3xl font-bold text-sky-400">{botState.openPositions}</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-2xl border border-sky-500/20 bg-slate-900/70">
            <div className="border-b border-sky-500/20 px-6 py-4">
              <div className="text-xl font-semibold text-white">Market Overview</div>
            </div>

            <div className="space-y-4 p-6">
              {botState.snapshots.map((snapshot) => (
                <div key={snapshot.symbol} className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/60 p-4">
                  <div>
                    <div className="font-medium text-white">{snapshot.symbol}</div>
                    <div className="text-xs text-slate-400">{snapshot.volume}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-white">{snapshot.price.toFixed(4)}</div>
                    <div className={`text-xs ${snapshot.changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {formatPercent(snapshot.changePercent)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-sky-500/20 bg-slate-900/70 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">AI Signals</h2>
              <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-xs text-emerald-200">{botState.sentiment}</span>
            </div>

            <div className="space-y-4">
              {topSignals.map((signal) => (
                <div key={signal.id} className="rounded-xl border border-slate-700 bg-slate-800/70 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="font-medium text-white">{signal.strategy}</div>
                    <span className="text-xs text-emerald-400">{signal.confidence}%</span>
                  </div>
                  <div className="text-sm text-slate-300">{signal.bias} · {signal.symbol}</div>
                  <div className="mt-2 text-xs text-slate-400">{signal.rationale}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sky-400 hover:text-sky-300">← Back to Home</Link>
        </div>
      </main>
    </div>
  );
}
