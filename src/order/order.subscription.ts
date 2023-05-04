import { Args, Resolver, Subscription } from '@nestjs/graphql';
import { Order } from './entities/order.entity';
import { OrderService } from './order.service';
import { Inject } from '@nestjs/common';
import { PubSubEngine } from 'graphql-subscriptions';

@Resolver(() => Order)
export class OrderSubscription {
  constructor(
    private readonly orderService: OrderService,
    @Inject('PUB_SUB') private readonly pubSub: PubSubEngine,
  ) {}

  @Subscription(() => Order, {})
  orderUpdated(): AsyncIterator<Order> {
    return this.pubSub.asyncIterator('orderUpdated');
  }
}
