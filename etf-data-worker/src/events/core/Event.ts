import { Topic } from './Topics';

export interface Event<T extends Topic, D> {
    topic: T;
    data: D;
}
