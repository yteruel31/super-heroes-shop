import {ArgsType, Field} from "@nestjs/graphql";
import {MinLength} from "class-validator";
import {PaginationArgs} from "../../utils/pagination";

@ArgsType()
export class ComicsArg extends PaginationArgs {
    @Field({nullable: true})
    @MinLength(3)
    title?: string;
}
