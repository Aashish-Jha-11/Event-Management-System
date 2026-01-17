# Event Management System

Multi-timezone event management app built with React, Express, and MongoDB.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Zustand
- **Backend**: Express.js, MongoDB, Mongoose
- **Timezone**: dayjs

## Setup

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account (or local MongoDB)

### Install

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### Configure

Create `backend/.env`:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
```

### Run

**Backend** (Terminal 1):
```bash
cd backend
npm run dev
```

**Frontend** (Terminal 2):
```bash
cd frontend
npm run dev
```

Open: http://localhost:3000

## Features

- Create multiple user profiles
- Create events for single or multiple profiles
- 16 timezone support (US, Europe, Asia, Pacific)
- View events in any timezone
- Edit events with automatic timezone conversion
- Update history logs for all changes
- Change profile timezone - all events auto-convert

## API Endpoints

### Profiles
- `GET /api/profiles` - all profiles
- `POST /api/profiles` - create profile
- `PUT /api/profiles/:id` - update profile

### Events
- `GET /api/events` - all events (filter: ?profileId=xxx)
- `POST /api/events` - create event
- `PUT /api/events/:id` - update event
- `DELETE /api/events/:id` - delete event
- `GET /api/events/:id/logs` - event logs

## Usage

1. Create profiles with names
2. Select profiles and create events
3. Choose timezone for event
4. Pick start/end dates & times
5. View events in different timezones
6. Edit events - changes are logged
7. Change profile timezone - all timestamps update

## Project Structure

```
├── backend/
│   ├── config/         # DB connection
│   ├── models/         # Mongoose schemas
│   ├── controllers/    # Business logic
│   ├── routes/         # API routes
│   └── server.js       # Entry point
│
└── frontend/
    └── src/
        ├── components/ # React components
        ├── store/      # Zustand state
        └── utils/      # Helper functions
```

## Timezone Handling

- All dates stored in UTC in MongoDB
- Frontend converts to user's selected timezone using dayjs
- When user changes timezone, all events auto-update

## License

MIT
