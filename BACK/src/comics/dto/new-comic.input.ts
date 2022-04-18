import {InputType, Field} from "@nestjs/graphql";
import {AvailabilityStatus} from "../models/AvailabilityStatus";

@InputType()
export class NewComicInput {
    @Field()
    price: number;

    @Field(type => AvailabilityStatus)
    availabilityStatus: AvailabilityStatus;

    @Field()
    idMarvelApi: number;
}
