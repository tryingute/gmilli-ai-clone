export type SignalBias = 'BUY' | 'SELL' | 'HOLD';

export type StrategyKey =
  | 'DigitAI'
  | 'Unibot'
  | 'TradeX'
  | 'OptimaX'
  | 'Accumulator Bot'
  | 'Auto R5';

export interface MarketSnapshot {
  symbol: string;
  label: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  direction: 'up' | 'down' | 'flat';
  referencePrice: number;
  chart: number[];
}

export interface BotSignal {
  id: string;
  strategy: StrategyKey;
  symbol: string;
  bias: SignalBias;
  confidence: number;
  entry: number;
  stopLoss: number;
  takeProfit: number;
  rationale: string;
  timestamp: string;
}

export interface BotState {
  balance: number;
  pnl: number;
  openPositions: number;
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
  snapshots: MarketSnapshot[];
  signals: BotSignal[];
  lastUpdated: string;
}

const derivIndexSeeds: Array<{ symbol: string; label: string; price: number; volume: string; drift: number }> = [
  { symbol: 'R_10', label: 'Volatility 10 Index', price: 2456.78, volume: '1.2M', drift: 0.6 },
  { symbol: 'R_25', label: 'Volatility 25 Index', price: 3789.45, volume: '890K', drift: 1.1 },
  { symbol: 'R_50', label: 'Volatility 50 Index', price: 4567.89, volume: '1.5M', drift: 0.3 },
  { symbol: 'R_75', label: 'Volatility 75 Index', price: 6234.56, volume: '756K', drift: -0.7 },
  { symbol: 'R_100', label: 'Volatility 100 Index', price: 7421.32, volume: '930K', drift: 0.9 },
];

const strategyNames: StrategyKey[] = [
  'DigitAI',
  'Unibot',
  'TradeX',
  'OptimaX',
  'Accumulator Bot',
  'Auto R5',
];

function toPercent(value: number) {
  return Number(value.toFixed(2));
}

function buildChart(base: number, drift: number, volatility = 8): number[] {
  const values: number[] = [];
  for (let i = 0; i < 18; i += 1) {
    const wave = Math.sin((i + drift) / 2.1) * volatility;
    const noise = ((i % 3) - 1) * 2.2;
    const next = base + wave + noise;
    values.push(Number(next.toFixed(2)));
  }
  return values;
}

function createSnapshot(
  symbol: string,
  label: string,
  price: number,
  volume: string,
  drift: number,
): MarketSnapshot {
  const chart = buildChart(price, drift, 14);
  const last = chart[chart.length - 1];
  const change = Number((last - price).toFixed(4));
  const changePercent = Number(((change / price) * 100).toFixed(2));
  const direction = change > 0.0005 ? 'up' : change < -0.0005 ? 'down' : 'flat';

  return {
    symbol,
    label,
    price: Number(price.toFixed(4)),
    change,
    changePercent,
    volume,
    direction,
    referencePrice: price,
    chart,
  };
}

export function createInitialBotState(): BotState {
  const snapshots = derivIndexSeeds.map((entry) =>
    createSnapshot(entry.symbol, entry.label, entry.price, entry.volume, entry.drift),
  );

  return {
    balance: 12547.82,
    pnl: 247.15,
    openPositions: 5,
    sentiment: 'Bullish',
    snapshots,
    lastUpdated: new Date().toISOString(),
    signals: buildSignals(snapshots),
  };
}

export function buildSignals(snapshots: MarketSnapshot[]): BotSignal[] {
  return snapshots.map((snapshot, index) => {
    const strategy = strategyNames[index % strategyNames.length];
    const trendBias =
      snapshot.changePercent >= 0.4 ? 'BUY' : snapshot.changePercent <= -0.6 ? 'SELL' : 'HOLD';
    const confidence = Math.max(
      60,
      Math.min(96, Math.round(68 + Math.abs(snapshot.changePercent) * 12 + index * 3)),
    );
    const entry = snapshot.price;
    const stopLoss = Number((entry * (1 - (trendBias === 'BUY' ? 0.015 : 0.022))).toFixed(4));
    const takeProfit = Number((entry * (1 + (trendBias === 'BUY' ? 0.03 : 0.018))).toFixed(4));

    return {
      id: `${snapshot.symbol}-${strategy}-${Date.now()}`,
      strategy,
      symbol: snapshot.symbol,
      bias: trendBias,
      confidence,
      entry,
      stopLoss,
      takeProfit,
      rationale:
        trendBias === 'BUY'
          ? `${snapshot.label} is holding momentum and aligning with favorable volatility expansion.`
          : trendBias === 'SELL'
            ? `${snapshot.label} shows bearish pressure and a likely rejection near resistance.`
            : `${snapshot.label} is consolidating. Wait for stronger confirmation before entering.`,
      timestamp: new Date().toISOString(),
    };
  });
}

export function advanceBotState(prev: BotState): BotState {
  const snapshots = prev.snapshots.map((snapshot) => {
    const volatility = (Math.random() - 0.5) * 0.015;
    const nextPrice = Math.max(50, snapshot.price * (1 + volatility));
    const nextChart = [...snapshot.chart.slice(1), Number(nextPrice.toFixed(2))];
    const change = Number((nextPrice - snapshot.referencePrice).toFixed(4));
    const changePercent = Number((100 * (change / snapshot.referencePrice)).toFixed(2));
    const direction = change > 0.0005 ? 'up' : change < -0.0005 ? 'down' : 'flat';

    return {
      ...snapshot,
      price: Number(nextPrice.toFixed(4)),
      change,
      changePercent,
      direction,
      volume: snapshot.volume,
      chart: nextChart,
    };
  });

  const performance = snapshots.reduce((sum, snapshot) => sum + snapshot.changePercent, 0);
  const sentiment: BotState['sentiment'] =
    performance > 0.8 ? 'Bullish' : performance < -0.8 ? 'Bearish' : 'Neutral';

  const nextBalance = Number((prev.balance + performance * 75).toFixed(2));
  const nextPnl = Number((prev.pnl + performance * 12).toFixed(2));

  return {
    ...prev,
    balance: nextBalance,
    pnl: nextPnl,
    openPositions: Math.max(2, Math.min(8, prev.openPositions + (Math.random() > 0.5 ? 1 : -1))),
    sentiment,
    snapshots,
    lastUpdated: new Date().toISOString(),
    signals: buildSignals(snapshots),
  };
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercent(value: number) {
  return `${value > 0 ? '+' : ''}${toPercent(value)}%`;
}

export function makeSparklinePath(values: number[], width = 120, height = 50) {
  if (!values.length) return '';
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - min) / range) * (height - 4) - 2;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');
}
