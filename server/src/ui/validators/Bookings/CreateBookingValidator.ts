import Joi from "joi";
import type { Request } from 'express';
import { Example } from "tsoa";

export class CreateBookingValidator {
  venueId: number;
  companyName: string;
  email: string;
  startDate: Date;
  endDate: Date;
  /**
   * Minimum: 1
   */
  attendeeCount: number;
  
  static createQuery(request: Request) {
    const querySchema = Joi.object({
      venueId: Joi
        .number()
        .required(),
      companyName: Joi
        .string(),
      email: Joi
        .string(),
      startDate: Joi
        .date(),
      endDate: Joi.date() // Validate start date and end date using Joi
        .min(Joi.ref('startDate'))
        .messages({
          "date.min": "endDate must be greater than or equal to startDate"
        }),
      attendeeCount: Joi
        .number()
        .min(1)
    });
    const query = request.body;
    const result = querySchema.validate(query);
    return result;
  }
}