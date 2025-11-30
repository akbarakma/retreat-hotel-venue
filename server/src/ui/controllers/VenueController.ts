import { Route, Tags, Get, Queries } from "tsoa";
import type { GetAllVenuesValidator } from "../validators/Venues/GetAllVenuesValidator.js";
import { prisma } from "../../databases/prisma/prisma.js";
import { PaginationHelper } from "../../helpers/PaginationHelper.js";
import type { Venue } from '../../generated/prisma/client.js';
import type { IPaginationMeta } from "../../types/CommonTypes.js";

@Route("v1/venues")
@Tags('Venues API')
export class VenueController {
  constructor() {}

  @Get('list')
  public async getAllVenues(@Queries() query: GetAllVenuesValidator): Promise<{ data: Venue[], paginationMeta: IPaginationMeta }> {
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

    const venuesDataCount = await prisma.venue.count({
      where: whereObject,
    });
    const paginationMeta = PaginationHelper.generateMeta(query.page, query.limit, venuesDataCount);

    return {
      data: venuesData,
      paginationMeta: paginationMeta,
    };
  }
}
