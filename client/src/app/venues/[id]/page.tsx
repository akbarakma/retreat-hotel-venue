"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

export default function VenueDetail() {
  const router = useRouter();
  const { id } = useParams();
  const now = new Date();

  const [venue, setVenue] = useState<any>(null);

  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [attendeeCount, setAttendeeCount] = useState(0);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const isToday =
    startDate &&
    now.toDateString() === startDate.toDateString();

  const fetchVenue = async () => {
    const res = await axios.get(
      `${API_URL}/venues/list?venueId=${id}`
    );
    setVenue(res.data.content.data[0]);
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${API_URL}/bookings/create`, {
        venueId: id,
        companyName,
        email,
        startDate,
        endDate,
        attendeeCount: Number(attendeeCount),
      });
  
      alert("Booking submitted!");
      router.push("/");
    } catch (err: any) {
      if (err.response && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        console.log('err', err.message);
        alert(err.message);
      }
    }
  };

  useEffect(() => {
    fetchVenue();
  }, []);

  useEffect(() => {
    if (!endDate) {
      setEndDate(startDate);
    } else if (startDate && startDate > endDate) {
      setEndDate(startDate);
    }
  }, [startDate]);

  useEffect(() => {
    if (!startDate) {
      setStartDate(endDate);
    }
  }, [endDate]);

  if (!venue) return <p className="p-8">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{venue.name}</h1>
        <p className="text-gray-600 text-sm">📍 {venue.location}</p>
      </div>

      {/* Venue Card */}
      <div className="p-6 rounded-2xl border shadow-sm space-y-3">
        <div className="flex justify-between">
          <h2>Capacity: </h2>
          <p className="font-semibold">{venue.capacity}</p>
        </div>

        <div className="flex justify-between">
          <h2>Price: </h2>
          <p className="font-semibold">${venue.price}</p>
        </div>

        <p className="text-xs text-gray-400">
          Updated {new Date(venue.updatedAt).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      {/* Booking Form */}
      <div className="p-6 rounded-2xl border shadow-sm space-y-4">
        <h2 className="text-lg font-semibold">Book This Venue</h2>

        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full p-3 border rounded-xl"
        />

        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-xl"
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              timeIntervals={15}
              dateFormat="yyyy-MM-dd HH:mm"
              className="w-full p-3 border rounded-xl mt-1"
              minDate={new Date()}
              minTime={isToday ? now : new Date(0, 0, 0, 0, 0)}
              maxTime={new Date(0, 0, 0, 23, 59)}
            />
          </div>

          <div>
            <label className="text-sm">End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              showTimeSelect
              timeIntervals={15}
              dateFormat="yyyy-MM-dd HH:mm"
              className="w-full p-3 border rounded-xl mt-1"
              minDate={startDate ?? new Date()}
              minTime={isToday ? now : new Date(0, 0, 0, 0, 0)}
              maxTime={new Date(0, 0, 0, 23, 59)}
            />
          </div>
        </div>

        <label className="text-sm">Attendee Count</label>
        <input
          type="number"
          placeholder="Attendee Count"
          value={attendeeCount}
          min={1}
          onChange={(e) => setAttendeeCount(Number(e.target.value))}
          className="w-full p-3 border rounded-xl"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition shadow"
        >
          Submit Booking
        </button>

        <button
          onClick={() => router.push("/")}
          className="w-full bg-red-800 p-2 rounded-xl hover:bg-red-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
