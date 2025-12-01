# retreat-hotel-venue

This is a Retreat Take Home Assignment

Thankfully I have time to deploy it so you can access it online.
I used Railway for the server app, and Vercel for the client app

- Client App: [https://retreat-hotel-venue-prod.vercel.app/](https://retreat-hotel-venue-prod.vercel.app/)
- Server App: [https://retreat-hotel-venue-production.up.railway.app/docs/](https://retreat-hotel-venue-production.up.railway.app/docs/)

## Setup Instructions for Retreat Venue List App

### Prerequisites
- node v20+
- create .env file based on .env-example in server and client folder

### 1. Clone the repository
```bash
git clone https://github.com/akbarakma/retreat-hotel-venue.git
cd retreat-hotel-venue/server
```

### 2. Install dependencies
Dont forget to create .env file in server root folder based on .env-example
and change your cred accordingly
```bash
npm install
```

### 3. Setup the database
```bash
npx prisma migrate dev --name init

npx prisma generate

npx prisma db seed
```

### 4. Run the app
```bash
npm run swagger

npm run build

npm run start
```

You can access the swagger docs in http://localhost:3000/docs (assuming you are running in localhost)

### 5. Running the Client App

Create a new terminal and cd into the client folder and run this command and
dont forget to create .env file in client root folder based on .env-example
and change your cred accordingly
```bash
npm install

npm run build

npm run start
```

You can access the client app in http://localhost:8080 (assuming you are running in localhost)



## Developer Notes

### My approach working on the project
So my approach in this project is to build a simple schema for the database with two tables with
a one to many relations. For the venues and bookings i make it simple with all filterable column with indexes.
I never get a chance to use Prisma in my work, but i am familiar with a TypeORM like Sequelize so with a little bit of 
searching in the documentation and how to use it with best practice, i am able to set it up and use it.

Im using ExpressJS with typescript for better code reliability and Swagger for the documentation as it is 
the simple way for other Developer to see the endpoint lists, request body, and responses.

I split the file structures inside src folder for better searchability since there is some code that will be used 
over and over again so it will be more efficient to store it as a helper and make it ready to be used. I seperate 
the folder for Router, Middlewares, Validators, and Controllers so it help me and other developer to spot bug when
error happen with narrowing where to look based on the error message.

For the frontend side, I init the NextJS app with typescript, and just make a simple 2 route page for the Venue list
and Detail Page where use can Book the appointment. For the data fetch, I use Axios to fetch the venue list and book the appointment from my server app. I dont use many Library like bootstrap which i usually use in frontend since i just want to make a simple page and with assignment time limit, but I use a DatePicker for the detail page when user pick a time for their booking form.

### What I'd Improve with more time

Obviously, the UI for the frontend. I'd make it more clean and dynamic for many screen. And the UI for the submit form can be a bit better with better Library. And for the integration with both frontend and backend, I think it will be better to show like a calendar with date and time in the frontend that some of it greyed out if an appointment already booked at a certain times. Im not yet create a booking endpoint list to list all the booked time for that venue, but with time i think i can do that. And for the server side i think i can improve it with a User table added. Even if there is no login requirement, i can manage only with the email from request body. Even if you can filter a booking list based on user's email, but a password for that user is better in the database since if it only relies on the email, anyone can access other people's data.