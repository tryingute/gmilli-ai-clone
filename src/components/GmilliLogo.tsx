'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  advanceBotState,
  buildSignals,
  createInitialBotState,
  formatCurrency,
  formatPercent,
  makeSparklinePath,
} from '@/lib/trading-bot';

const strategyList = ['DigitAI', 'Unibot', 'TradeX', 'OptimaX', 'Accumulator Bot', 'Auto R5'];

function Sparkline({ values, color = '#38bdf8' }: { values: number[]; color?: string }) {
  const path = makeSparklinePath(values, 200, 70);

  return (
    <svg viewBox="0 0 200 70" className="h-20 w-full">
      <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function AnalyzerPage() {
  const [botState, setBotState] = useState(createInitialBotState());
  const [selectedStrategy, setSelectedStrategy] = useState(strategyList[0]);

  useEffect(() => {
    const tick = setInterval(() => {
      setBotState((prev) => advanceBotState(prev));
    }, 2600);

    return () => clearInterval(tick);
  }, []);

  const activeSignal =
    botState.signals.find((signal) => signal.strategy === selectedStrategy) ?? botState.signals[0];

  return (
    <div className="min-h-screen bg-[#020817] text-white">
      <nav className="border-b border-sky-500/20 bg-slate-900/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 font-black text-white">
              F
            </div>
            <div className="text-2xl font-black tracking-tight text-white">Fumjamx</div>
          </Link>

          <div className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-slate-300 hover:text-sky-300">Home</Link>
            <Link href="/login" className="rounded-xl bg-sky-600 px-3 py-2 text-white hover:bg-sky-500">Login</Link>
            <Link href="/signup" className="rounded-xl bg-emerald-600 px-3 py-2 text-white hover:bg-emerald-500">Sign Up</Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-blue-950/20">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-sky-300">Analyzer</div>
              <h1 className="mt-2 text-3xl font-black text-white">Fumjamx Deriv signal engine</h1>
            </div>
            <div className="rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-sm font-medium text-sky-200">
              Volatility index focus
            </div>
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <div className="text-sm text-slate-400">Balance</div>
            <div className="mt-2 text-2xl font-black text-white">{formatCurrency(botState.balance)}</div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <div className="text-sm text-slate-400">P&L</div>
            <div className="mt-2 text-2xl font-black text-emerald-400">{formatCurrency(botState.pnl)}</div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <div className="text-sm text-slate-400">Open positions</div>
            <div className="mt-2 text-2xl font-black text-sky-400">{botState.openPositions}</div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <div className="text-sm text-slate-400">Sentiment</div>
            <div className="mt-2 text-2xl font-black text-amber-400">{botState.sentiment}</div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  <h3 className="text-lg font-bold text-white">Deriv API connection</h3>
                </div>
                <div className="flex items-center gap-2 text-sm text-emerald-400">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  Connected
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-slate-300">API token</label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500"
                      placeholder="Enter your Deriv token"
                    />
                    <button className="rounded-xl bg-emerald-600 px-4 py-3 text-sm font-medium text-white hover:bg-emerald-500">
                      Get Token
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setBotState((prev) => ({ ...prev, signals: buildSignals(prev.snapshots) }))}
                  className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-500"
                >
                  Refresh Signals
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sky-400">📊</span>
                  <h3 className="text-lg font-bold text-white">Strategy set</h3>
                </div>
                <span className="rounded-full bg-orange-500/10 px-2.5 py-1 text-xs font-medium text-orange-300">Live</span>
              </div>

              <div className="space-y-3">
                {strategyList.map((strategy) => (
                  <button
                    key={strategy}
                    onClick={() => setSelectedStrategy(strategy)}
                    className={`flex w-full items-center justify-between rounded-2xl border p-3 text-left transition ${
                      selectedStrategy === strategy
                        ? 'border-sky-500 bg-sky-500/10'
                        : 'border-slate-800 bg-slate-950/70 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-white">{strategy}</div>
                      <div className="text-xs text-slate-400">
                        {strategy === 'DigitAI'
                          ? 'Even/Odd index read'
                          : strategy === 'Unibot'
                            ? 'Trend continuation bias'
                            : strategy === 'TradeX'
                              ? 'Index momentum read'
                              : strategy === 'OptimaX'
                                ? 'Volatility channel trade'
                                : strategy === 'Accumulator Bot'
                                  ? 'Volatility accumulation'
                                  : 'Touch/No Touch index play'}
                      </div>
                    </div>
                    <span className="text-lg text-sky-400">→</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold text-emerald-400">Signal generator</h3>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
                {activeSignal.bias}
              </span>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-slate-400">Strategy</div>
                    <div className="text-xl font-black text-white">{activeSignal.strategy}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-400">Confidence</div>
                    <div className="text-xl font-black text-emerald-400">{activeSignal.confidence}%</div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <div className="text-sm text-slate-400">Symbol</div>
                  <div className="mt-2 text-lg font-bold text-white">{activeSignal.symbol}</div>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <div className="text-sm text-slate-400">Entry</div>
                  <div className="mt-2 text-lg font-bold text-white">{activeSignal.entry.toFixed(4)}</div>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <div className="text-sm text-slate-400">Stop loss</div>
                  <div className="mt-2 text-lg font-bold text-red-400">{activeSignal.stopLoss.toFixed(4)}</div>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <div className="text-sm text-slate-400">Take profit</div>
                  <div className="mt-2 text-lg font-bold text-emerald-400">{activeSignal.takeProfit.toFixed(4)}</div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <div className="mb-2 text-sm text-slate-400">Rationale</div>
                <p className="text-slate-200">{activeSignal.rationale}</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <div className="mb-3 text-sm text-slate-400">Index pulse</div>
                <Sparkline
                  values={botState.snapshots[0]?.chart ?? [10, 12, 14, 13, 18, 20, 19, 25, 22, 28]}
                  color={botState.sentiment === 'Bullish' ? '#34d399' : botState.sentiment === 'Bearish' ? '#f87171' : '#fbbf24'}
                />
              </div>

              <div className="space-y-3">
                {botState.snapshots.map((snapshot) => (
                  <div key={snapshot.symbol} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 p-3">
                    <div>
                      <div className="font-medium text-white">{snapshot.symbol}</div>
                      <div className="text-xs text-slate-400">{snapshot.label}</div>
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
          </div>
        </div>
      </div>
    </div>
  );
}
