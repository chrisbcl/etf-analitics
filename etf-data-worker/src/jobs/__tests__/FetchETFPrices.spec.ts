import { Topic } from '../../events/core/Topics';
import { ETFPrice } from '../../providers/ETFPriceProvider';
import { ETFPriceProviderMock } from '../../__mocks__/ETFPriceProviderMock';
import { EventBusMock } from '../../__mocks__/EventBusMock';
import { FetchETFPrices } from '../FetchETFPrices';

const mockPrices: ETFPrice[] = [
    {
        price: 10,
        symbol: 'AA'
    },
    {
        price: 20,
        symbol: 'BB'
    },
    {
        price: 30,
        symbol: 'CC'
    }
];

describe('FetchETFPrices', () => {
    describe('job execution', () => {
        it('fetches the etf prices and send an event for each price fetched', async () => {
            const fetchPricesJob = new FetchETFPrices(ETFPriceProviderMock(mockPrices), EventBusMock);

            await fetchPricesJob.execute();

            expect(EventBusMock.publish).toHaveBeenCalledTimes(3);
            expect(EventBusMock.publish.mock.calls).toContainEqual([
                Topic.ETFPriceFetched,
                { price: 10, symbol: 'AA' }
            ]);
            expect(EventBusMock.publish.mock.calls).toContainEqual([
                Topic.ETFPriceFetched,
                { price: 20, symbol: 'BB' }
            ]);
            expect(EventBusMock.publish.mock.calls).toContainEqual([
                Topic.ETFPriceFetched,
                { price: 30, symbol: 'CC' }
            ]);
        });
    });
});
