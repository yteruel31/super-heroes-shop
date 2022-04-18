import {Injectable} from "@nestjs/common";
import {createClient, SupabaseClient} from "@supabase/supabase-js";

@Injectable()
export class SupabaseService {
    private client: SupabaseClient;

    constructor() {
        this.client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    }

    public async uploadFile(bucket: string, filename: string, file: Buffer) {
        const path = `public/${filename}`;
        const verify = await this.verifyBucket(bucket);
        console.log(verify);
        const resUpload = await this.client.storage.from(bucket).upload(path, file);
        console.log(resUpload);
        const res = this.client.storage.from(bucket).getPublicUrl(path);
        return res.data.publicURL;
    }

    private async verifyBucket(bucket: string) {
        const exist = await this.bucketExist(bucket);
        console.log(exist);
        if (!exist) {
            return this.client.storage.createBucket(bucket, {public: true})
        }
    }

    private async bucketExist(bucket: string) {
        const res = await this.client.storage.listBuckets();
        return res.data.some(b => b.id == bucket);
    }
}
