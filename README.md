# retreat-hotel-venue

This is a Retreat Take Home Assignment

## Setup Instructions for Server App

### Prerequisites
- node v20+
- create .env file based on .env-example in server folder

### 1. Clone the repository
```bash
git clone https://github.com/akbarakma/retreat-hotel-venue.git
cd server
```

### 2. Install dependencies
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
npm run build

npm run start
```
