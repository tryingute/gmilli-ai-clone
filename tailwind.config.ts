module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#020817',
        panel: '#0f172a',
        accent: '#38bdf8',
        success: '#22c55e',
        warning: '#f59e0b',
        danger: '#ef4444',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(56,189,248,0.2), 0 20px 50px rgba(14,165,233,0.15)',
      },
    },
  },
  plugins: [],
};
