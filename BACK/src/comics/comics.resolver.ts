import {Resolver, Args, Mutation, Query} from "@nestjs/graphql";
import {ComicsService} from "./comics.service";
import {ComicsArg} from "./dto/comics.arg";
import {NewComicInput} from "./dto/new-comic.input";
import {UpdateComicInput} from "./dto/update-comic.input";
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

    @Mutation(returns => Comic)
    async updateComic(@Args("updateComicData") updateComicData: UpdateComicInput) {
        return this.comicsService.update(updateComicData);
    }

    @Mutation(returns => Comic)
    async deleteComic(@Args('id') id: number) {
        return this.comicsService.delete(id);
    }
}
