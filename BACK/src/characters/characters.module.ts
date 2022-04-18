import {Module} from "@nestjs/common";
import {MarvelModule} from "../marvel/marvel.module";
import {PrismaModule} from "../prisma/prisma.module";
import {CharactersService} from "./characters.service";

@Module({
    providers: [CharactersService],
    imports: [PrismaModule, MarvelModule],
    exports: [CharactersService]
})
export class CharactersModule {
}
