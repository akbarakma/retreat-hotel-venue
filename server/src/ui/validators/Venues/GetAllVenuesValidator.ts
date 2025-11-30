import Joi from "joi";
import type { Request } from 'express';
import { Example } from "tsoa";

export class GetAllVenuesValidator {
  @Example(1)
  page: number;
  @Example(10)
  limit: number;
  orderBy?: string;
  location?: string;
  capacity?: string;
  price?: string;
  venueID?: string;
  
  static getAllQuery(request: Request) {
    const querySchema = Joi.object({
      page: Joi
        .number()
        .min(1)
        .default(1),
      limit: Joi
        .number()
        .max(50)
        .default(10),
      orderBy: Joi
        .string(),
      location: Joi
        .string()
        .optional()
        .allow(""),
      capacity: Joi
        .number()
        .optional()
        .default(0),
      price: Joi
        .number()
        .optional()
        .default(0),
      venueID: Joi
        .string()
        .optional()
        .allow("")
    });
    const query = request.query;
    const result = querySchema.validate(query);
    return result;
  }
}