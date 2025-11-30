import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { Route, Tags, Post, Get, Put, Delete, Body, Header, Queries, Path } from "tsoa";
import type { GetAllVenuesValidator } from "../validators/Venues/GetAllVenuesValidator.js";

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
    
    return {
      data: [],
      count: 0,
    };
  }
}
