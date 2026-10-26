'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { advanceBotState, buildSignals, createInitialBotState, formatCurrency, formatPercent } from '@/lib/trading-bot';

const strategyList = ['DigitAI', 'Unibot', 'TradeX', 'OptimaX', 'Accumulator Bot', 'Auto R5'];

export default function AnalyzerPage() {
  const [botState, setBotState] = useState(createInitialBotState());
  const [selectedStrategy, setSelectedStrategy] = useState(strategyList[0]);

  useEffect(() => {
    const tick = setInterval(() => {
      setBotState((prev) => advanceBotState(prev));
    }, 2500);

    return () => clearInterval(tick);
  }, []);

  const activeSignal =
    botState.signals.find((signal) => signal.strategy === selectedStrategy) ?? botState.signals[0];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.14),_transparent_32%),linear-gradient(135deg,#020817,#111827_50%,#0f172a)] text-white">
      <nav className="border-b border-sky-500/20 bg-slate-900/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500 font-bold text-white">D</div>
            <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-xl font-bold text-transparent">
              Deriv Index Trader
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-300 hover:text-sky-300">Home</Link>
            <Link href="/login">
              <button className="rounded-lg bg-sky-600 px-4 py-2 font-medium text-white hover:bg-sky-500">Login</button>
            </Link>
            <Link href="/signup">
              <button className="rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-500">Sign Up</button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-slate-700 to-slate-600 p-6">
          <h1 className="text-3xl font-bold text-white">Deriv Index Analyzer</h1>
          <p className="mt-2 text-sky-100">Volatility index signals tuned only for R_10, R_25, R_50, R_75 and R_100.</p>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-xl border border-sky-500/20 bg-slate-900/70 p-4">
            <div className="text-sm text-slate-400">Balance</div>
            <div className="mt-2 text-2xl font-bold text-white">{formatCurrency(botState.balance)}</div>
          </div>
          <div className="rounded-xl border border-sky-500/20 bg-slate-900/70 p-4">
            <div className="text-sm text-slate-400">P&L</div>
            <div className="mt-2 text-2xl font-bold text-emerald-400">{formatCurrency(botState.pnl)}</div>
          </div>
          <div className="rounded-xl border border-sky-500/20 bg-slate-900/70 p-4">
            <div className="text-sm text-slate-400">Open Positions</div>
            <div className="mt-2 text-2xl font-bold text-sky-400">{botState.openPositions}</div>
          </div>
          <div className="rounded-xl border border-sky-500/20 bg-slate-900/70 p-4">
            <div className="text-sm text-slate-400">Sentiment</div>
            <div className="mt-2 text-2xl font-bold text-amber-400">{botState.sentiment}</div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  <h3 className="text-lg font-semibold text-white">Deriv API Connection</h3>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-sm text-emerald-400">Connected</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-slate-300">API Token</label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      className="flex-1 rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-400"
                      placeholder="Enter your Deriv API token"
                    />
                    <button className="rounded-lg bg-emerald-600 px-4 py-3 text-sm font-medium text-white hover:bg-emerald-500">
                      Get Token
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setBotState((prev) => ({ ...prev, signals: buildSignals(prev.snapshots) }))}
                  className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-500"
                >
                  Refresh Signals
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sky-400">📊</span>
                  <h3 className="text-lg font-semibold text-white">Strategy Set</h3>
                </div>
                <span className="rounded-full bg-orange-500/20 px-2 py-1 text-xs text-orange-200">Live</span>
              </div>

              <div className="space-y-3">
                {strategyList.map((strategy) => (
                  <button
                    key={strategy}
                    onClick={() => setSelectedStrategy(strategy)}
                    className={`flex w-full items-center justify-between rounded-lg border p-3 text-left transition ${
                      selectedStrategy === strategy
                        ? 'border-sky-500 bg-sky-500/10'
                        : 'border-slate-700 bg-slate-800/80 hover:border-slate-500'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-medium text-white">{strategy}</div>
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

          <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-emerald-400">Signal Generator</h3>
              <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-xs text-emerald-200">
                {activeSignal.bias}
              </span>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-slate-400">Strategy</div>
                    <div className="text-xl font-bold text-white">{activeSignal.strategy}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-400">Confidence</div>
                    <div className="text-xl font-bold text-emerald-400">{activeSignal.confidence}%</div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl bg-slate-800/70 p-4">
                  <div className="text-sm text-slate-400">Symbol</div>
                  <div className="mt-2 text-lg font-bold text-white">{activeSignal.symbol}</div>
                </div>
                <div className="rounded-xl bg-slate-800/70 p-4">
                  <div className="text-sm text-slate-400">Entry</div>
                  <div className="mt-2 text-lg font-bold text-white">{activeSignal.entry.toFixed(4)}</div>
                </div>
                <div className="rounded-xl bg-slate-800/70 p-4">
                  <div className="text-sm text-slate-400">Stop Loss</div>
                  <div className="mt-2 text-lg font-bold text-red-400">{activeSignal.stopLoss.toFixed(4)}</div>
                </div>
                <div className="rounded-xl bg-slate-800/70 p-4">
                  <div className="text-sm text-slate-400">Take Profit</div>
                  <div className="mt-2 text-lg font-bold text-emerald-400">{activeSignal.takeProfit.toFixed(4)}</div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-800/70 p-4">
                <div className="mb-2 text-sm text-slate-400">Signal rationale</div>
                <p className="text-slate-200">{activeSignal.rationale}</p>
              </div>

              <div className="space-y-3">
                {botState.snapshots.map((snapshot) => (
                  <div key={snapshot.symbol} className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/60 p-3">
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
