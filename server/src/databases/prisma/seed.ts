import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../../generated/prisma/client.js'

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

const seed = async () => {
  const venues = await prisma.venue.findMany();
  if (venues.length) {
    console.log("Seed already initialized");
    return;
  }
  await prisma.venue.createMany({
    data: [
      {
        name: "Venue Aurora Peak",
        location: "Jakarta",
        capacity: 7,
        price: 55,
      },
      {
        name: "Venue Silver Harbor",
        location: "Bandung",
        capacity: 3,
        price: 35,
      },
      {
        name: "Venue Golden Summit",
        location: "Surabaya",
        capacity: 10,
        price: 25,
      },
      {
        name: "Venue Ocean Vista",
        location: "Bali",
        capacity: 6,
        price: 90,
      },
      {
        name: "Venue Crimson Oasis",
        location: "Yogyakarta",
        capacity: 2,
        price: 35,
      },
      {
        name: "Venue Nimbus Hall",
        location: "Medan",
        capacity: 9,
        price: 85,
      },
      {
        name: "Venue Zenith Garden",
        location: "Makassar",
        capacity: 4,
        price: 65,
      },
      {
        name: "Venue Horizon Point",
        location: "Semarang",
        capacity: 5,
        price: 10,
      },
      {
        name: "Venue Echo Heights",
        location: "Jakarta",
        capacity: 8,
        price: 100,
      },
      {
        name: "Venue Prime Valley",
        location: "Bali",
        capacity: 1,
        price: 10,
      },
      {
        name: "Venue Twilight Ridge",
        location: "Bandung",
        capacity: 10,
        price: 75,
      },
      {
        name: "Venue Sapphire Court",
        location: "Surabaya",
        capacity: 3,
        price: 50,
      },
    ],
  });
};

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })