'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-white">
      <nav className="mx-auto mb-8 max-w-5xl rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-sky-400">
            Fumjamx
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-300 hover:text-sky-300">Home</Link>
            <Link href="/login" className="rounded-lg bg-sky-600 px-4 py-2 text-white hover:bg-sky-500">
              Login
            </Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-md rounded-2xl border border-slate-700 bg-slate-900/80 p-8 shadow-glow">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-sky-400">🚀 Create Account</h1>
          <p className="mt-2 text-sm text-slate-400">Access the Fumjamx index trading dashboard and strategy engine.</p>
        </div>

        <div className="mb-6 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-300">
          <div className="mb-1 font-semibold">📊 Index Trading Workspace</div>
          <div>Open signal generation and index monitoring for your selected Deriv instruments.</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-400 focus:border-sky-500"
              placeholder="Enter your email address"
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
              placeholder="Create a password"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-400 focus:border-sky-500"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button type="submit" className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-500">
            📧 Create Account
          </button>
        </form>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Link href="/analyzer" className="rounded-lg bg-violet-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-violet-500">
            📊 Analyzer
          </Link>
          <Link href="/login" className="rounded-lg bg-sky-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-sky-500">
            🔐 Login
          </Link>
        </div>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link href="/login" className="text-sky-400 hover:text-sky-300">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
