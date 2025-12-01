"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const [venues, setVenues] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const [filterColumn, setFilterColumn] = useState("location");
  const [filterQuery, setFilterQuery] = useState("");
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchVenues = async () => {
    const res = await axios.get(`${API_URL}/venues/list`, {
      params: {
        page,
        limit,
        [filterColumn]: filterQuery || undefined,
      },
    });

    const venuesData = res.data.content.data;
    const pagination = res.data.content.paginationMeta;

    setVenues(venuesData);
    setTotalPages(pagination.totalPage);
  };

  useEffect(() => {
    setVenues([]);
    fetchVenues();
  }, [page]);

  const applyFilter = () => {
    setPage(1);
    fetchVenues();
  };

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Retreat Venue List</h1>

      <div className="flex gap-3 items-center">
        <select
          value={filterColumn}
          onChange={(e) => {
            setFilterColumn(e.target.value);
            setFilterQuery("");
          }}
          className="border p-2 rounded"
        >
          <option value="location">Location</option>
          <option value="capacity">Capacity (≥)</option>
          <option value="price">Price (≤)</option>
        </select>

        {filterColumn === "capacity" ? (
          <input
            type="number"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Capacity ≥ ..."
            className="border p-2 rounded flex-1"
          />
        ) : filterColumn === "price" ? (
          <input
            type="number"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Price ≤ ..."
            className="border p-2 rounded flex-1"
          />
        ) : (
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search..."
            className="border p-2 rounded flex-1"
          />
        )}

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={applyFilter}
        >
          Filter
        </button>
      </div>

      <div className="space-y-4">
        {venues.length === 0 ? (
          <h2>Loading ...</h2>
        ) : (
          venues.map((data: any) => (
            <div
              key={data.id}
              className="border rounded-2xl p-5 shadow-sm flex justify-between items-center hover:shadow-md transition"
            >
              <div>
                <p className="font-semibold text-lg">{data.name}</p>
                <p className="text-sm text-gray-500">📍 {data.location}</p>
                <p className="text-sm text-gray-500">👥 Capacity: {data.capacity}</p>
                <p className="text-sm text-gray-500">💵 Price: ${data.price}</p>
              </div>
              {data.capacity === 0 ? (
                <button
                  className="px-4 py-2 rounded-xl bg-gray-400 text-white cursor-not-allowed"
                  disabled
                >
                  Full
                </button>
              ) : (
                <Link
                  href={`/venues/${data.id}`}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
                >
                  Book
                </Link>
              )}
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Prev
        </button>

        <span>
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
