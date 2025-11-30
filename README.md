# retreat-hotel-venue

This is a Retreat Take Home Assignment

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
Dont forget to create .env in server root folder based on .env-example
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
dont forget to create .env in client root folder based on .env-example
and change your cred accordingly
```bash
npm install

npm run build

npm run start
```

You can access the client app in http://localhost:8080 (assuming you are running in localhost)