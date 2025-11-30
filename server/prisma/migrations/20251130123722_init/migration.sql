-- CreateIndex
CREATE INDEX "Booking_id_venueId_email_companyName_isDeleted_idx" ON "Booking"("id", "venueId", "email", "companyName", "isDeleted");

-- CreateIndex
CREATE INDEX "Venue_id_name_location_capacity_price_isDeleted_idx" ON "Venue"("id", "name", "location", "capacity", "price", "isDeleted");
