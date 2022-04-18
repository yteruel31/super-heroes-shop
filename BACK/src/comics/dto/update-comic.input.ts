import {InputType, Field} from "@nestjs/graphql";
import {AvailabilityStatus} from "../models/AvailabilityStatus";

@InputType()
export class UpdateComicInput {
    @Field()
    id: number;

    @Field({nullable: true})
    price: number;

    @Field(type => AvailabilityStatus, {nullable: true})
    availabilityStatus: AvailabilityStatus;
}
