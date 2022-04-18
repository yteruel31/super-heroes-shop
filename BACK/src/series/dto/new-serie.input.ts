import {InputType, Field} from "@nestjs/graphql";

@InputType()
export class NewSerieInput {
    @Field()
    idMarvelApi: number;
}
