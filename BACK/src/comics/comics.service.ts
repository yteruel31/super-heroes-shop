import {Injectable} from "@nestjs/common";
import {CharactersService} from "../characters/characters.service";
import {MarvelService} from "../marvel/marvel.service";
import {PrismaService} from "../prisma/prisma.service";
import {SeriesService} from "../series/series.service";
import {getResourceId} from "../utils";
import {ComicsArg} from "./dto/comics.arg";
import {NewComicInput} from "./dto/new-comic.input";
import {UpdateComicInput} from "./dto/update-comic.input";

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

    async findAll(args: ComicsArg) {
        console.log(args);
        const where = {
            title: {
                contains: args.title
            }
        };

        const comics = args.offset > 0
            ? await this.prismaService.comic.findMany({
                skip: 1,
                cursor: {
                    id: args.offset
                },
                take: args.limit,
                where
            })
            : await this.prismaService.comic.findMany({
                take: args.limit,
                where
            });

        const total = await this.prismaService.comic.count({
            where,
        });

        return {
            edges: comics.map(c => ({
                node: c,
                cursor: c.id
            })),
            nodes: comics,
            totalCount: total,
            hasNextPage: +(total / args.limit).toFixed() > 0,
        };
    }

    async update(data: UpdateComicInput) {
        return this.prismaService.comic.update({
            data: {
                ...data
            },
            where: {
                id: data.id
            }
        })
    }

    async create(data: NewComicInput) {
        const comic = await this.marvelService.findComic(data.idMarvelApi);
        const serie = await this.seriesService.create({idMarvelApi: getResourceId(comic.series.resourceURI, "series")});
        const characters = await this.charactersService.createManyByComic(comic.id);
        const thumbnail = await this.marvelService.getFile(comic.thumbnail.path);

        return this.prismaService.comic.create({
            data: {
                title: comic.title,
                idMarvelApi: comic.id,
                thumbnail,
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
