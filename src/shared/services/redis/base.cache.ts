import { createClient } from 'redis';
import Logger from 'bunyan';
import { config } from '@root/config';

export type RedisClient = ReturnType<typeof createClient>;

export abstract class BaseCache {
  client: RedisClient;
  log: Logger;

  constructor(casheName: string) {
    this.client = createClient({ url: config.REDIS_HOST });
    this.log = config.createLogger(casheName);
    this.casheError();
  }

  private casheError(): void {
    this.client.on('error', (error: unknown) => {
      this.log.error(error);
    });
  }
}
