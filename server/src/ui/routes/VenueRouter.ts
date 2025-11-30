import express, { type Request, type Response, type NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import createError from 'http-errors';
import { VenueController } from '../controllers/VenueController.js';
import { GetAllVenuesValidator } from '../validators/Venues/GetAllVenuesValidator.js'

export const venueRouter = express.Router({
  strict: true
});

const venueController = new VenueController();

venueRouter.get('/list', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = GetAllVenuesValidator.getAllQuery(req);
    if (error) {
      let message = 'Internal Server Error';
      if (error.details[0]?.message) message = error.details[0]?.message;
      throw createError(StatusCodes.BAD_REQUEST, message);
    }
    const result = await venueController.getAllVenues(value);
    res
      .status(StatusCodes.OK)
      .json({
        message: 'VENUE_LIST',
        status: StatusCodes.OK,
        content: result,
      })
  } catch (err) {
    next(err);
  }
});