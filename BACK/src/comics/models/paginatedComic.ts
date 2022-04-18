import {ObjectType} from "@nestjs/graphql";
import {Paginated} from "../../utils/pagination";
import {Comic} from "./comic.model";

@ObjectType()
export class PaginatedComic extends Paginated(Comic) {
}

