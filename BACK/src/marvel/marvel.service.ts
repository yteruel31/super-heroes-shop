import {Injectable} from "@nestjs/common";
import {uuid} from "@supabase/supabase-js/dist/main/lib/helpers";
import axios, {AxiosInstance} from "axios";
import {Md5} from "ts-md5";
import {SupabaseService} from "../supabase/supabase.service";
import {CharacterDto} from "./dto/character.dto";
import {ComicDto} from "./dto/comic.dto";
import {RootResponseDto} from "./dto/rootResponse.dto";
import {SerieDto} from "./dto/serie.dto";

@Injectable()
export class MarvelService {
    private client: AxiosInstance;
    private readonly hash: string;

    constructor(private supabaseService: SupabaseService) {
        this.hash = Md5.hashStr(`1${process.env.MARVEL_API_PRIVATE_KEY}${process.env.MARVEL_API_PUBLIC_KEY}`);
        this.client = axios.create({
            baseURL: process.env.MARVEL_API_URL,
            params: {apikey: process.env.MARVEL_API_PUBLIC_KEY, ts: 1, hash: this.hash}
        });
    }

    async findComic(id: number): Promise<ComicDto> {
        const res = await this.client.get<RootResponseDto<ComicDto>>(`/comics/${id}`);

        return res.data.data.results[0]
    }

    async findComicCharacters(id: number): Promise<CharacterDto[]> {
        const res = await this.client.get<RootResponseDto<CharacterDto>>(`/comics/${id}/characters`);

        return res.data.data.results
    }

    async findSerie(id: number): Promise<SerieDto> {
        const res = await this.client.get<RootResponseDto<SerieDto>>(`/series/${id}`);

        return res.data.data.results[0]
    }

    async findCharacter(id: number): Promise<CharacterDto> {
        const res = await this.client.get<RootResponseDto<CharacterDto>>(`/characters/${id}`);

        return res.data.data.results[0]
    }

    async getFile(path: string) {
        const formattedPath = path.replace("http://i.annihil.us/u/prod/marvel/i/mg",
            "https://x.annihil.us/u/prod/marvel/i/mg");
        const res = await axios.get(formattedPath + "/portrait_uncanny.jpg", {
            responseType: "arraybuffer",
            params: {apikey: process.env.MARVEL_API_PUBLIC_KEY, ts: 1, hash: this.hash}
        });

        return this.supabaseService.uploadFile("comics", `${uuid()}.jpg`, res.data)
    }
}
