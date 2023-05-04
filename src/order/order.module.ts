import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { OrderSubscription } from './order.subscription';
import { PubSub } from 'graphql-subscriptions';

@Module({
  providers: [
    OrderService,
    OrderResolver,
    OrderSubscription,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
})
export class OrderModule {}
