import {Injectable} from "@nestjs/common";
import {MarvelService} from "../marvel/marvel.service";
import {PrismaService} from "../prisma/prisma.service";
import {NewSerieInput} from "./dto/new-serie.input";

@Injectable()
export class SeriesService {
    constructor(
        private prismaService: PrismaService,
        private marvelService: MarvelService
    ) {
    }

    async create(data: NewSerieInput) {
        const serie = await this.marvelService.findSerie(data.idMarvelApi);

        return this.prismaService.serie.create({
            data: {
                idMarvelApi: serie.id,
                title: serie.title
            }
        })
    }
}
