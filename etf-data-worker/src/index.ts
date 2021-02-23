import 'reflect-metadata';
import 'dotenv/config';
import { CronJob } from 'cron';
import { NATSEventBus } from './events/core/implementations/NATSEventBus';
import { FetchETFPrices } from './jobs/FetchETFPrices';
import { FMPETFPriceProvider } from './providers/implementations/FMPETFPriceProvider';
import natsConfig from './config/nats';

const DAILY_AT_20 = '0 20 * * *';

const checkEnvironmentVariables = () => {
    if (!process.env.FMP_API_KEY) {
        throw new Error('FMP_API_KEY must be defined');
    }
    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error('NATS_CLUSTER_ID must be defined');
    }
    if (!process.env.NATS_CLIENT_ID) {
        throw new Error('NATS_CLIENT_ID must be defined');
    }
    if (!process.env.NATS_URL) {
        throw new Error('NATS_URL must be defined');
    }
};

const main = async () => {
    checkEnvironmentVariables();

    const priceProvider = new FMPETFPriceProvider();
    const eventBus = new NATSEventBus(natsConfig);

    try {
        await eventBus.connect();

        const fetchPricesJob = new FetchETFPrices(priceProvider, eventBus);
        const job = new CronJob(DAILY_AT_20, () => fetchPricesJob.execute());

        job.start();
    } catch (err) {
        console.error(err);
    }
};

main();
