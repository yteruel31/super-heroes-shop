import {Injectable} from "@nestjs/common";
import {MarvelService} from "../marvel/marvel.service";
import {PrismaService} from "../prisma/prisma.service";
import {NewCharacterInput} from "./dto/new-character.input";

@Injectable()
export class CharactersService {
    constructor(
        private prismaService: PrismaService,
        private marvelService: MarvelService
    ) {
    }

    async create(data: NewCharacterInput) {
        const character = await this.marvelService.findCharacter(data.idMarvelApi);

        return this.prismaService.character.create({
            data: {
                idMarvelApi: character.id,
                name: character.name
            }
        })
    }

    async createManyByComic(idComic: number) {
        const characters = await this.marvelService.findComicCharacters(idComic);

        await this.prismaService.character.createMany({
            data: characters.map(c => ({
                name: c.name,
                idMarvelApi: c.id
            })),
            skipDuplicates: true
        })

        return this.prismaService.character.findMany({
            where: {
                OR: characters.map(c => ({
                    idMarvelApi: c.id
                })),
            }
        })
    }
}
