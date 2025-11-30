
import express from 'express';
import { venueRouter } from './VenueRouter.js';

export const mainRouter = express.Router({
  strict: true
});

mainRouter.use('/venues', venueRouter);