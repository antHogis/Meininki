# Requirements
- node.js
- Environment variables (If using dotenv, the .env file should be stored in directory `backend/`)
    - `DB_CONNECTION` - contains url to a MongoDB database.
    - `JWT_SECRET` - contains secret for creating Json web tokens.

# Installing dependencies
## Front end
`cd frontend && npm install`
## Back end
`cd backend && npm install`

# Running dev builds
## Front end
`cd frontend && npm run serve`

The frontend runs at localhost:8080, live reload enabled with vue-cli-service
## Back end
`cd backend && npm start`

The backend runs at localhost:3000, live reload enabled with nodemon

