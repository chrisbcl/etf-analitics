import fmpApi, { FMPETFPriceResponse } from '../../apis/financialmodelingprep';
import { ETFPrice, ETFPriceProvider } from '../ETFPriceProvider';

export class FMPETFPriceProvider implements ETFPriceProvider {
    async getAllPrices(): Promise<ETFPrice[]> {
        const { data } = await fmpApi.get<FMPETFPriceResponse[]>('/quotes/etf');

        return data.map(({ symbol, price }) => ({ symbol, price }));
    }

    async getPrice(symbol: string): Promise<ETFPrice | null> {
        const { data } = await fmpApi.get<FMPETFPriceResponse[]>(`/quotes/${symbol}`);

        if (!data.length) {
            return null;
        }

        return { symbol, price: data[0].price };
    }
}
