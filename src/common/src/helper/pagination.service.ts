import { Injectable } from '@nestjs/common';
import { BasePaginationQueryDto } from '../dto/base-pagination-query.dto';
import PaginateType from '../entities/paginate-type';

@Injectable()
export class PaginationService {

    buildWhereCondition(
        filterModel?: string,
        filterKeyword?: string,
        searchKeyword?: string,
        searchColumns: string[] = [],
    ) {
        const where: any = {};

        if (filterModel && filterKeyword) {
            if (filterModel === 'role') {
                where[filterModel] = { equals: filterKeyword };
            } else {
                where[filterModel] = { contains: filterKeyword };
            }
        }

        if (searchKeyword && searchColumns.length > 0) {
            where.OR = searchColumns.map((column) => ({
                [column]: { contains: searchKeyword },
            }));
        }

        return where;
    }

    buildOrderByCondition(sortField?: string, sortType?: string) {
        return sortField && sortType ? { [sortField]: sortType } : {};
    }

    async paginate<T>(
        basicQuery: BasePaginationQueryDto,
        model: any,
        searchColumns: string[] = [],
        include: any = {},
    ): Promise<PaginateType<T>> {
        const {
            page = 1,
            limit = 10,
            sortField,
            sortType,
            filterModel,
            filterKeyword,
            searchKeyword,
        } = basicQuery;

        const where = this.buildWhereCondition(filterModel, filterKeyword, searchKeyword, searchColumns);
        const orderBy = this.buildOrderByCondition(sortField, sortType);
        const offset = (Number(page) - 1) * Number(limit);

        const [data, count]: [T[], number] = await Promise.all([
            model.findMany({
                skip: offset,
                take: +limit,
                where,
                orderBy,
                include,
            }),
            model.count({ where }),
        ]);

        return {
            status: "Fetched Successfully.",
            data: {
                total: count,
                totalPage: Math.ceil(count / Number(limit)),
                limit: Number(limit),
                page: Number(page),
                data: data
            }
        }
    }
}
