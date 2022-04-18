import {Field, ObjectType, Int, ArgsType} from '@nestjs/graphql';
import {Type} from '@nestjs/common';

@ArgsType()
export class PaginationArgs {
    @Field((type) => Int)
    offset: number = 0;

    @Field((type) => Int)
    limit: number = 10;
}

interface IEdgeType<T> {
    cursor: string;
    node: T;
}

export interface IPaginatedType<T> {
    edges: IEdgeType<T>[];
    nodes: T[];
    totalCount: number;
    hasNextPage: boolean;
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
    @ObjectType(`${classRef.name}Edge`)
    abstract class EdgeType {
        @Field((type) => String)
        cursor: string;

        @Field((type) => classRef)
        node: T;
    }

    @ObjectType({isAbstract: true})
    abstract class PaginatedType implements IPaginatedType<T> {
        @Field((type) => [EdgeType], {nullable: true})
        edges: EdgeType[];

        @Field((type) => [classRef], {nullable: true})
        nodes: T[];

        @Field((type) => Int)
        totalCount: number;

        @Field()
        hasNextPage: boolean;
    }

    return PaginatedType as Type<IPaginatedType<T>>;
}
