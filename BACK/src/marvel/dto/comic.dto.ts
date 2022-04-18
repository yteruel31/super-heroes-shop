export interface ComicDto {
    id: number;
    digitalId: number;
    title: string;
    issueNumber: number;
    variantDescription: string;
    description?: string;
    modified: Date;
    isbn: string;
    upc: string;
    diamondCode: string;
    ean: string;
    issn: string;
    format: string;
    pageCount: number;
    textObjects: any[];
    resourceURI: string;
    urls: {
        type: string;
        url: string;
    }[];
    series: {
        resourceURI: string;
        name: string;
    };
    variants: any[];
    collections: any[];
    collectedIssues: any[];
    dates: Date[];
    prices: {
        type: string;
        price: number;
    }[];
    thumbnail: {
        path: string;
        extension: string;
    };
    images: {
        path: string;
        extension: string;
    }[];
    creators: {
        available: number;
        collectionURI: string;
        items: {
            resourceURI: string;
            name: string;
            role: string;
        }[];
        returned: number;
    };
    characters: {
        available: number;
        collectionURI: string;
        items: {
            resourceURI: string;
            name: string;
        }[];
        returned: number;
    };
    stories: {
        available: number;
        collectionURI: string;
        items: {
            resourceURI: string;
            name: string;
            type: string;
        }[];
        returned: number;
    };
    events: {
        available: number;
        collectionURI: string;
        items: any[];
        returned: number;
    };
}
