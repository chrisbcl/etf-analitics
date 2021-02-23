import axios from 'axios';

export interface FMPETFSymbolsResponse {
    symbol: string;
    name: string;
    currency: string;
    stockExchange: string;
}

export interface FMPETFPriceResponse {
    symbol: string;
    name: string;
    price: number;
    changesPercentage: number;
    change: number;
    dayLow: number;
    dayHigh: number;
    yearHigh: number;
    yearLow: number;
    marketCap: number | null;
    priceAvg50: number;
    priceAvg200: number;
    volume: number;
    avgVolume: number;
    exchange:
        | 'ETF'
        | 'MUTUAL_FUND'
        | 'COMMODITY'
        | 'INDEX'
        | 'CRYPTO'
        | 'FOREX'
        | 'TSX'
        | 'AMEX'
        | 'NASDAQ'
        | 'NYSE'
        | 'EURONEXT';
    open: number;
    previousClose: number;
    eps: number | null;
    pe: number | null;
    earningsAnnouncement: number | null;
    sharesOutstanding: number | null;
    timestamp: number;
}

export default axios.create({
    baseURL: 'https://financialmodelingprep.com/api/v3',
    params: {
        apikey: process.env.FMP_API_KEY
    }
});
