import Joi from "joi";
import type { Request } from 'express';
import { Example } from "tsoa";

export class GetAllVenuesValidator {
  @Example(1)
  page: number;
  @Example(5)
  limit: number;
  /**
   * Order the results by a field.
   * Examples:
   * - "+name" + for ascending
   * - "-price" - for descending
   * - default: "+id"
   */
  orderBy?: string;
  location?: string;
  capacity?: number;
  price?: number;
  venueId?: number;
  
  static getAllQuery(request: Request) {
    const querySchema = Joi.object({
      page: Joi
        .number()
        .min(1)
        .default(1),
      limit: Joi
        .number()
        .max(50)
        .default(5),
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
      venueId: Joi
        .number()
        .optional(),
    });
    const query = request.query;
    const result = querySchema.validate(query);
    return result;
  }
}