'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'markets' | 'analytics'>('portfolio');

  const stats = [
    { label: 'Total Balance', value: '$12,547.82', tone: 'text-white' },
    { label: 'Today\'s P&L', value: '+$247.15', tone: 'text-emerald-400' },
    { label: 'Open Positions', value: '5', tone: 'text-sky-400' },
  ];

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

        <div className="overflow-hidden rounded-2xl border border-sky-500/20 bg-slate-900/70">
          <div className="flex border-b border-sky-500/20">
            {[
              ['portfolio', 'Portfolio'],
              ['markets', 'Markets'],
              ['analytics', 'Analytics'],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as 'portfolio' | 'markets' | 'analytics')}
                className={`px-6 py-3 font-medium transition ${
                  activeTab === key
                    ? 'border-b-2 border-sky-400 text-sky-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'portfolio' && (
              <div>
                <h2 className="mb-4 text-xl font-semibold text-white">Portfolio Overview</h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {stats.map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-sky-500/20 bg-slate-800/70 p-4">
                      <h3 className="mb-2 text-sm text-slate-400">{stat.label}</h3>
                      <p className={`text-2xl font-bold ${stat.tone}`}>{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'markets' && (
              <div>
                <h2 className="mb-4 text-xl font-semibold text-white">Market Data</h2>
                <div className="space-y-4">
                  {[
                    ['EUR/USD', '1.0845 ↗', 'text-emerald-400'],
                    ['GBP/USD', '1.2734 ↘', 'text-red-400'],
                    ['USD/JPY', '149.82 ↗', 'text-emerald-400'],
                  ].map(([pair, value, tone]) => (
                    <div key={pair} className="flex items-center justify-between rounded-lg border border-sky-500/20 bg-slate-800/70 p-4">
                      <span className="font-medium text-white">{pair}</span>
                      <span className={`font-mono ${tone}`}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <h2 className="mb-4 text-xl font-semibold text-white">AI Analytics</h2>
                <div className="space-y-4">
                  <div className="rounded-lg border-l-4 border-emerald-500 bg-emerald-500/10 p-4">
                    <div className="font-semibold text-emerald-400">BUY Signal</div>
                    <div className="text-sm text-emerald-200">EUR/USD - Strong upward trend detected.</div>
                  </div>
                  <div className="rounded-lg border-l-4 border-red-500 bg-red-500/10 p-4">
                    <div className="font-semibold text-red-400">SELL Signal</div>
                    <div className="text-sm text-red-200">GBP/USD - Resistance level reached.</div>
                  </div>
                  <div className="rounded-lg border-l-4 border-yellow-500 bg-yellow-500/10 p-4">
                    <div className="font-semibold text-yellow-400">HOLD Signal</div>
                    <div className="text-sm text-yellow-200">USD/JPY - Consolidation pattern.</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sky-400 hover:text-sky-300">← Back to Home</Link>
        </div>
      </main>
    </div>
  );
}
