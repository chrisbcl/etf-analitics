import { NATSConfig } from '../events/core/implementations/NATSEventBus';

export default {
    clusterId: process.env.NATS_CLUSTER_ID,
    clientId: process.env.NATS_CLIENT_ID,
    url: process.env.NATS_URL
} as NATSConfig;
