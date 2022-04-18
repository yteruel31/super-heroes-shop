import {ApolloDriverConfig, ApolloDriver} from "@nestjs/apollo";
import {Module} from '@nestjs/common';
import {GraphQLModule} from "@nestjs/graphql";
import {join} from "path";
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CharactersModule} from "./characters/characters.module";
import {ComicsModule} from "./comics/comics.module";
import {MarvelModule} from "./marvel/marvel.module";
import {PrismaModule} from "./prisma/prisma.module";
import {SeriesModule} from "./series/series.module";
import {SupabaseModule} from "./supabase/supabase.module";

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            sortSchema: true,
        }),
        MarvelModule,
        CharactersModule,
        SeriesModule,
        ComicsModule,
        PrismaModule,
        SupabaseModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
