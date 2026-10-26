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
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  direction: 'up' | 'down' | 'flat';
  referencePrice: number;
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

const marketSeeds: Array<{ symbol: string; price: number; volume: string }> = [
  { symbol: 'EUR/USD', price: 1.0845, volume: '1.2M' },
  { symbol: 'GBP/USD', price: 1.2734, volume: '981K' },
  { symbol: 'USD/JPY', price: 149.82, volume: '860K' },
  { symbol: 'XAU/USD', price: 2364.2, volume: '540K' },
  { symbol: 'BTC/USD', price: 64215.2, volume: '2.1M' },
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

function createSnapshot(symbol: string, price: number, volume: string): MarketSnapshot {
  const direction = Math.random() > 0.5 ? 'up' : 'down';
  const change = Number((Math.random() * 0.08 - 0.04).toFixed(4));
  const changePercent = Number((Math.random() * 2.5 - 1.25).toFixed(2));

  return {
    symbol,
    price: Number(price.toFixed(4)),
    change,
    changePercent,
    volume,
    direction,
    referencePrice: price,
  };
}

export function createInitialBotState(): BotState {
  const snapshots = marketSeeds.map((entry) => createSnapshot(entry.symbol, entry.price, entry.volume));
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
    const trendBias = snapshot.changePercent >= 0 ? 'BUY' : snapshot.changePercent <= -0.5 ? 'SELL' : 'HOLD';
    const confidence = Math.max(60, Math.min(96, Math.round(68 + Math.abs(snapshot.changePercent) * 12 + index * 3)));
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
          ? `${snapshot.symbol} is trending higher with momentum and favorable risk/reward.`
          : trendBias === 'SELL'
            ? `${snapshot.symbol} shows downside pressure and resistance rejection.`
            : `${snapshot.symbol} is range-bound; wait for stronger confirmation.`,
      timestamp: new Date().toISOString(),
    };
  });
}

export function advanceBotState(prev: BotState): BotState {
  const snapshots = prev.snapshots.map((snapshot) => {
    const volatility = (Math.random() - 0.5) * 0.015;
    const nextPrice = Math.max(0.5, snapshot.price * (1 + volatility));
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
    };
  });

  const performance = snapshots.reduce((sum, snapshot) => sum + snapshot.changePercent, 0);
  const sentiment: BotState['sentiment'] = performance > 0.8 ? 'Bullish' : performance < -0.8 ? 'Bearish' : 'Neutral';
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
