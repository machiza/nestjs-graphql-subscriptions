import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Order {
  @Field(() => ID)
  id: string;

  @Field()
  status: string;

  @Field()
  total: number;
}
