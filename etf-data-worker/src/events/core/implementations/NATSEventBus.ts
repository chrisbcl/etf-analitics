import { Event } from '../Event';
import { EventBus } from '../EventBus';
import { Topic } from '../Topics';
import nats, { Message, Stan } from 'node-nats-streaming';

export interface NATSConfig {
    clusterId: string;
    clientId: string;
    url: string;
}

export class NATSEventBus implements EventBus {
    private _client: Stan | null;
    protected ackWait: number;

    constructor(private natsConfig: NATSConfig) {
        this._client = null;
        this.ackWait = 5 * 1000;
    }

    connect() {
        this._client = nats.connect(this.natsConfig.clusterId, this.natsConfig.clientId, { url: this.natsConfig.url });

        return new Promise<void>((resolve, reject) => {
            this.client.on('connect', () => {
                console.log('Connected to NATS Server!');
                resolve();
            });

            this.client.on('error', (error) => {
                reject(error);
            });
        });
    }

    get client() {
        if (!this._client) {
            throw new Error('Cannot access NATS client before connecting');
        }

        return this._client;
    }

    defaultOptions(queueGroupName: string) {
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDurableName(queueGroupName);
    }

    async subscribe<T extends Event<Topic, T['data']>>(
        topic: T['topic'],
        queueGroupName: string,
        callback: (data: T['data']) => Promise<void>,
        optionsConfig: nats.SubscriptionOptions = this.defaultOptions(queueGroupName)
    ): Promise<void> {
        const subscription = this.client.subscribe(topic, queueGroupName, optionsConfig);

        subscription.on('message', async (msg: Message) => {
            console.log(`Message received #${msg.getSequence()} / ${topic} / ${queueGroupName}`);

            const parsedData = this.parseMessage<T>(msg);
            await callback(parsedData);
            this.client.subscriptionOptions().manualAcks && msg.ack();
        });
    }

    publish<T extends Event<Topic, T['data']>>(topic: T['topic'], data: T['data']): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.client.publish(topic, JSON.stringify(data), (error) => {
                if (error) {
                    reject(error);
                    return;
                }
                console.log(`Event published to ${topic}`);
                resolve();
            });
        });
    }

    private parseMessage<T extends Event<Topic, T['data']>>(msg: Message): T['data'] {
        const data = msg.getData();
        return typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString('utf8'));
    }
}
