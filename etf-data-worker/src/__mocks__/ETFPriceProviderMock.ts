import { ETFPrice } from '../providers/ETFPriceProvider';

export const ETFPriceProviderMock = (prices: ETFPrice[]) => ({
    getAllPrices: jest.fn().mockImplementation(() => prices),
    getPrice: jest.fn()
});
