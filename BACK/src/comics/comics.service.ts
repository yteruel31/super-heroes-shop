import {Injectable} from "@nestjs/common";
import {CharactersService} from "../characters/characters.service";
import {MarvelService} from "../marvel/marvel.service";
import {PrismaService} from "../prisma/prisma.service";
import {SeriesService} from "../series/series.service";
import {getResourceId} from "../utils";
import {NewComicInput} from "./dto/new-comic.input";

@Injectable()
export class ComicsService {
    constructor(
        private prismaService: PrismaService,
        private marvelService: MarvelService,
        private seriesService: SeriesService,
        private charactersService: CharactersService) {
    }

    async find(id: number) {
        const data = await this.prismaService.comic.findUnique({
            where: {
                id
            }
        });
        const comic = await this.marvelService.findComic(data.idMarvelApi);
        return {
            ...comic,
            ...data,
        }
    }

    async create(data: NewComicInput) {
        const comic = await this.marvelService.findComic(data.idMarvelApi);
        const serie = await this.seriesService.create({idMarvelApi: getResourceId(comic.series.resourceURI, "series")});
        const characters = await this.charactersService.createManyByComic(comic.id);
        const fileUrl = await this.marvelService.getFile(comic.thumbnail.path);

        return this.prismaService.comic.create({
            data: {
                title: comic.title,
                idMarvelApi: comic.id,
                thumbnail: fileUrl,
                price: data.price,
                availabilityStatus: data.availabilityStatus,
                serie: {
                    connect: {
                        id: serie.id
                    }
                },
                characters: {
                    connect: characters.map(c => ({
                        id: c.id,
                    }))
                }
            }
        })
    }
}
