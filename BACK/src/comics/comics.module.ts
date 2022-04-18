import {Module} from "@nestjs/common";
import {CharactersModule} from "../characters/characters.module";
import {MarvelModule} from "../marvel/marvel.module";
import {PrismaModule} from "../prisma/prisma.module";
import {SeriesModule} from "../series/series.module";
import {ComicsResolver} from "./comics.resolver";
import {ComicsService} from "./comics.service";

@Module({
    providers: [ComicsService, ComicsResolver],
    imports: [PrismaModule, MarvelModule, SeriesModule, CharactersModule]
})
export class ComicsModule {
}
