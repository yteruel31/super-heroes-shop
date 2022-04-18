import {Module} from "@nestjs/common";
import {SupabaseModule} from "../supabase/supabase.module";
import {MarvelService} from "./marvel.service";

@Module({
    providers: [MarvelService],
    exports: [MarvelService],
    imports: [SupabaseModule]
})
export class MarvelModule {
}
