export interface RootResponseDto<T> {
    code: number;
    status: string;
    copyright: string;
    attributionText: string;
    attributionHTML: string;
    etag: string;
    data: Data<T>;
}

export interface Data<T> {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: T[];
}
