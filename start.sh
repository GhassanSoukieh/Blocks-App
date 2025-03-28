#!/bin/bash

# Start the frontend development server in the background
npm run dev &

# Navigate to the server directory and start the backend server
cd server && node server.js