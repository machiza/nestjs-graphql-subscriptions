import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';

@Resolver()
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query(() => [Order])
  orders(): Order[] {
    return this.orderService.getOrders();
  }

  @Mutation(() => Order)
  updateOrder(@Args('id') id: string, @Args('status') status: string): Order {
    const order = this.orderService.updateOrder(id, status);
    return order;
  }
}
