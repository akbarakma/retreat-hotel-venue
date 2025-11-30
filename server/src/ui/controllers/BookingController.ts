import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { Route, Tags, Post, Get, Put, Delete, Body, Header, Queries, Path } from "tsoa";
import { prisma } from "../../databases/prisma/prisma.js";
import type { CreateBookingValidator } from "../validators/Bookings/CreateBookingValidator.js";
import type { Booking } from '../../generated/prisma/client.js';

export class VenueResponse {
  id!: string;
  name!: string;
}

@Route("v1/bookings")
@Tags('Bookings API')
export class BookingController {
  constructor() {}

  @Post('create')
  public async createBooking(@Body() body: CreateBookingValidator): Promise<{ data: Booking }> {
    const venueData = await prisma.venue.findUnique({
      where: {
        id: body.venueId,
        isDeleted: false,
      }
    });
    if (!venueData) throw createHttpError(StatusCodes.NOT_FOUND, 'Venue Not Found');

    if (venueData.capacity < body.attendeeCount) {
      throw createHttpError(StatusCodes.BAD_REQUEST, 'Attendee Count Exceeded Venue Capacity');
    }

    const newCapacity = venueData.capacity - body.attendeeCount;

    // Update venue capacity after create booking
    const [bookingData, _]: [Booking, any] = await prisma.$transaction([
      prisma.booking.create({
        data: {
          venueId: body.venueId,
          companyName: body.companyName,
          email: body.email,
          startDate: body.startDate,
          endDate: body.endDate,
          attendeeCount: body.attendeeCount,
        }
      }),
      prisma.venue.update({
        where: { id: body.venueId },
        data: { capacity: newCapacity },
      })
    ]);

    return {
      data: bookingData,
    };
  }
}
