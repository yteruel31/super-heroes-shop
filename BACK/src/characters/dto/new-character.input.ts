import {InputType, Field} from "@nestjs/graphql";

@InputType()
export class NewCharacterInput {
    @Field()
    idMarvelApi: number;
}
