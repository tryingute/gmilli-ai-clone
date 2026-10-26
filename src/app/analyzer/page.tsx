'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { advanceBotState, createInitialBotState, formatCurrency, formatPercent, makeSparklinePath } from '@/lib/trading-bot';

function Sparkline({ values, color = '#38bdf8' }: { values: number[]; color?: string }) {
  const path = makeSparklinePath(values, 160, 54);
  return (
    <svg viewBox="0 0 160 54" className="h-14 w-full">
      <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function DashboardPage() {
  const [botState, setBotState] = useState(createInitialBotState());

  useEffect(() => {
    const tick = setInterval(() => {
      setBotState((prev) => advanceBotState(prev));
    }, 2600);

    return () => clearInterval(tick);
  }, []);

  const topSignals = botState.signals.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#020817] text-white">
      <header className="border-b border-sky-500/20 bg-slate-900/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 font-black text-white">
              F
            </div>
            <div className="text-2xl font-black tracking-tight text-white">Fumjamx</div>
          </div>

          <nav className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-slate-300 hover:text-sky-300">Home</Link>
            <button className="rounded-xl bg-slate-800 px-3 py-2 text-slate-200 hover:bg-slate-700">Profile</button>
            <button className="rounded-xl bg-red-600 px-3 py-2 text-white hover:bg-red-500">Logout</button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-blue-950/20">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-sky-300">Dashboard</div>
              <h1 className="mt-2 text-3xl font-black text-white">Volatility index overview</h1>
            </div>
            <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400">
              {botState.sentiment} market
            </div>
          </div>
        </div>

        <div className="mb-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <div className="text-sm text-slate-400">Total balance</div>
            <div className="mt-2 text-3xl font-black text-white">{formatCurrency(botState.balance)}</div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <div className="text-sm text-slate-400">Today's P&L</div>
            <div className="mt-2 text-3xl font-black text-emerald-400">{formatCurrency(botState.pnl)}</div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <div className="text-sm text-slate-400">Open positions</div>
            <div className="mt-2 text-3xl font-black text-sky-400">{botState.openPositions}</div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Deriv index market view</h2>
              <span className="rounded-full border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs text-slate-300">Live</span>
            </div>

            <div className="space-y-4">
              {botState.snapshots.map((snapshot) => (
                <div key={snapshot.symbol} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-bold text-white">{snapshot.symbol}</div>
                      <div className="text-xs text-slate-400">{snapshot.label}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-white">{snapshot.price.toFixed(4)}</div>
                      <div className={`text-xs ${snapshot.changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {formatPercent(snapshot.changePercent)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <Sparkline values={snapshot.chart} color={snapshot.changePercent >= 0 ? '#34d399' : '#f87171'} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">AI signals</h2>
              <div className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                Active
              </div>
            </div>

            <div className="space-y-4">
              {topSignals.map((signal) => (
                <div key={signal.id} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-semibold text-white">{signal.strategy}</span>
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
