import express, { type Request, type Response, type NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import createError from 'http-errors';
import { CreateBookingValidator } from '../validators/Bookings/CreateBookingValidator.js';
import { BookingController } from '../controllers/BookingController.js';

export const bookingRouter = express.Router({
  strict: true
});

const bookingController = new BookingController();

bookingRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = CreateBookingValidator.createQuery(req);
    if (error) {
      let message = 'Internal Server Error';
      if (error.details[0]?.message) message = error.details[0]?.message;
      throw createError(StatusCodes.BAD_REQUEST, message);
    }
    const result = await bookingController.createBooking(value);
    res
      .status(StatusCodes.CREATED)
      .json({
        message: 'BOOKING_CREATED',
        status: StatusCodes.CREATED,
        content: result,
      });
  } catch (err) {
    next(err);
  }
});