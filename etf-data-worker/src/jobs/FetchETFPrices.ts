import { Job } from './core/Job';
import { EventBus } from '../events/core/EventBus';
import { Topic } from '../events/core/Topics';
import { ETFPriceFetchedEvent } from '../events/ETFPriceFetchedEvent';
import { ETFPriceProvider } from '../providers/ETFPriceProvider';

export class FetchETFPrices implements Job {
    constructor(private priceProvider: ETFPriceProvider, private eventBus: EventBus) {}

    async execute() {
        // get etf prices
        const prices = await this.priceProvider.getAllPrices();

        // send events (symbol + price)
        prices.forEach(({ symbol, price }) =>
            this.eventBus.publish<ETFPriceFetchedEvent>(Topic.ETFPriceFetched, { symbol, price })
        );
    }
}
