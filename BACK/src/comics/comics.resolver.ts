import {Resolver, Args, Mutation, Query} from "@nestjs/graphql";
import {ComicsService} from "./comics.service";
import {ComicsArg} from "./dto/comics.arg";
import {NewComicInput} from "./dto/new-comic.input";
import {PaginatedComic} from "./models/paginatedComic";
import {Comic} from "./models/comic.model";

@Resolver(of => Comic)
export class ComicsResolver {
    constructor(private comicsService: ComicsService) {
    }

    @Query(returns => Comic)
    async comic(@Args('id') id: number) {
        return this.comicsService.find(id);
    }

    @Query(returns => PaginatedComic)
    async comics(@Args() args: ComicsArg) {
        return this.comicsService.findAll(args);
    }

    @Mutation(returns => Comic)
    async addComic(@Args("newComicData") newComicData: NewComicInput) {
        return this.comicsService.create(newComicData);
    }
}
