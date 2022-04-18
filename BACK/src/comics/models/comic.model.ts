import {ObjectType, Field, ID} from "@nestjs/graphql";
import {AvailabilityStatus} from "./AvailabilityStatus";

@ObjectType({description: "Comics"})
export class Comic {
    @Field(() => ID)
    id: number;

    @Field()
    title: string;

    @Field()
    description: string;

    @Field()
    pageCount: number;

    @Field()
    thumbnail: string;

    @Field()
    price: number;

    @Field({nullable: true})
    rating?: number;

    @Field(type => AvailabilityStatus)
    availabilityStatus: AvailabilityStatus;
}
