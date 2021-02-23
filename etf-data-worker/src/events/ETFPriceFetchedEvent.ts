import { Event } from './core/Event';
import { Topic } from './core/Topics';

export interface ETFPriceFetchedPayload {
    symbol: string;
    price: number;
}

export type ETFPriceFetchedEvent = Event<Topic.ETFPriceFetched, ETFPriceFetchedPayload>;
