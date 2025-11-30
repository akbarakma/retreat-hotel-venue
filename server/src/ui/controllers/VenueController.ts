import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { Route, Tags, Post, Get, Put, Delete, Body, Header, Queries, Path } from "tsoa";
import type { GetAllVenuesValidator } from "../validators/Venues/GetAllVenuesValidator.js";
import { prisma } from "../../databases/prisma/prisma.js";
import { PaginationHelper } from "../../helpers/PaginationHelper.js";

export class VenueResponse {
  id!: string;
  name!: string;
}

@Route("v1/venues")
@Tags('Venues API')
export class VenueController {
  constructor() {}

  @Get('list')
  public async getAllVenues(@Queries() query: GetAllVenuesValidator): Promise<{ data: any[]; count: number }> {
    const pagination = PaginationHelper.sorter(query.orderBy ?? '+id');
    const { offset, limit } = PaginationHelper.getOffsetLimit(query.page, query.limit);
    const whereObject: Record<string, any> = {
      isDeleted: false,
    };

    if (query.location) {
      whereObject.location = {
        contains: query.location,
        mode: 'insensitive'
      }
    }

    if (query.capacity) {
      whereObject.capacity = {
        gte: query.capacity,
      }
    }

    if (query.price) {
      whereObject.price = {
        lte: query.price,
      }
    }

    if (query.venueId) {
      whereObject.id = query.venueId;
    }

    const venuesData = await prisma.venue.findMany({
      skip: offset,
      take: limit,
      orderBy: pagination,
      where: whereObject,
    });

    return {
      data: venuesData,
      count: 0,
    };
  }
}
