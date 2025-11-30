
import express from 'express';
import { venueRouter } from './VenueRouter.js';
import { bookingRouter } from './BookingRouter.js';

export const mainRouter = express.Router({
  strict: true
});

mainRouter.use('/venues', venueRouter);
mainRouter.use('/bookings', bookingRouter);