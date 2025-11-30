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
  for (let i = 1; i <= 12; i++) {
    await prisma.venue.create({
      data: {
        name: 'venue ' + i,
        location: 'location ' + i,
        capacity: i,
        price: 10 + i,
      }
    });
  }
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