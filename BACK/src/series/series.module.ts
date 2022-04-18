import {Module} from "@nestjs/common";
import {MarvelModule} from "../marvel/marvel.module";
import {PrismaModule} from "../prisma/prisma.module";
import {SeriesService} from "./series.service";

@Module({
    providers: [SeriesService],
    imports: [PrismaModule, MarvelModule],
    exports: [SeriesService]
})
export class SeriesModule {
}
