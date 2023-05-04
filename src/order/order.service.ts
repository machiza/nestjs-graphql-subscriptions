import { Inject, Injectable } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { PubSub, PubSubEngine } from 'graphql-subscriptions';

@Injectable()
export class OrderService {
  constructor(@Inject('PUB_SUB') private readonly pubSub: PubSubEngine) {}

  private orders: Order[] = [
    { id: '1', status: 'CREATED', total: 10 },
    { id: '2', status: 'PAID', total: 20 },
    { id: '3', status: 'DELIVERED', total: 30 },
  ];

  getOrders(): Order[] {
    return this.orders;
  }

  updateOrder(id: string, status: string): Order {
    const order = this.orders.find((o) => o.id === id);
    if (!order) {
      throw new Error(`Order with id ${id} not found`);
    }
    order.status = status;

    this.pubSub.publish('orderUpdated', { orderUpdated: order });

    return order;
  }
}
