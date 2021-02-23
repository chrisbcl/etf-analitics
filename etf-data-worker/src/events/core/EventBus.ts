import { Event } from './Event';
import { Topic } from './Topics';

export interface EventBus {
    publish<T extends Event<Topic, T['data']>>(topic: T['topic'], data: T['data']): Promise<void>;
    subscribe<T extends Event<Topic, T['data']>>(
        topic: T['topic'],
        queueGroupName: string,
        callback: (data: T['data']) => Promise<void>,
        optionsConfig?: any
    ): Promise<void>;
}
