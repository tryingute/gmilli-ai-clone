'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert('Please enter both email and password.');
      return;
    }

    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-white">
      <nav className="mx-auto mb-8 max-w-5xl rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-sky-400">
            Deriv Index Trader
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-300 hover:text-sky-300">Home</Link>
            <Link href="/signup" className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-500">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-md rounded-2xl border border-slate-700 bg-slate-900/80 p-8 shadow-glow">
        <h1 className="mb-6 text-center text-3xl font-bold text-sky-400">🚀 Login</h1>

        <div className="mb-6 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-300">
          <div className="mb-1 font-semibold">✅ Deriv Index Access Ready</div>
          <div>Access the index monitor and strategy dashboard.</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-400 focus:border-sky-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-400 focus:border-sky-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="w-full rounded-lg bg-sky-600 px-4 py-3 font-semibold text-white transition hover:bg-sky-500">
            🚀 Login
          </button>
        </form>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Link href="/analyzer" className="rounded-lg bg-violet-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-violet-500">
            📊 Analyzer
          </Link>
          <Link href="/signup" className="rounded-lg bg-emerald-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-emerald-500">
            📝 Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
