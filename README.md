# bytecraft-game
rest api for a one-piece-game for bytecraft open day 2023-2024 open day 


Overview:
The app is a game where players can open cards every 5 hours. These cards reveal devil fruits from the One Piece story, and each fruit has a certain score. Players compete to accumulate the highest score, and the player with the highest total score is the winner.

Key Features:
User Authentication:

Players need to register and log in to the game using JWT-based authentication.
Players have unique user profiles that store their information (username, email, and current score).
Opening Cards:

Players can open a card every 5 hours to get a random devil fruit.
Each devil fruit has an associated score, which gets added to the player's total score.
The API should ensure that players can't open more than one card within the 5-hour window.
Devil Fruits and Cards:

Each devil fruit is assigned a unique name (based on One Piece lore) and a score.
Cards contain these fruits, and players collect cards over time.
Leaderboard:

The API provides a leaderboard showing players ranked by their total score.
Players can check their ranking and compare themselves with others.
REST API Endpoints:
User Registration & Authentication:

POST /api/register: Create a new user account.
Request body: { "username": "Luffy", "email": "luffy@op.com", "password": "password123" }
POST /api/login: Log in and receive a JWT token.
Request body: { "email": "luffy@op.com", "password": "password123" }
Open a Card:

GET /api/open-card: Open a card and receive a devil fruit with a score. Can only be done once every 5 hours.
Protected route (requires JWT token).
Response: { "fruit": "Gomu Gomu no Mi", "score": 50, "nextAvailableTime": "2024-10-13T12:00:00Z" }
User Profile & Score:

GET /api/profile: View the player's current profile, including total score and last card opened.
Protected route (requires JWT token).
Response: { "username": "Luffy", "score": 150, "lastCardOpened": "2024-10-13T07:00:00Z" }
Leaderboard:

GET /api/leaderboard: Retrieve a list of players ranked by total score.
Response: [{ "username": "Zoro", "score": 500 }, { "username": "Luffy", "score": 450 }, ...]
Database Schema (MongoDB):
Users Collection:
{
  "_id": ObjectId,
  "username": "Luffy",
  "email": "luffy@op.com",
  "password": "hashed_password",
  "score": 150,
  "profilePicture":"pic uurl"
  "lastCardOpened": ISODate("2024-10-13T07:00:00Z")
}
Devil Fruits Collection:

{
  "_id": ObjectId,
  "name": "Gomu Gomu no Mi",
  "score": 50,
  users: ["id1","id2","id3"],
}
Opened Cards Collection (Optional, for history):

{
  "_id": ObjectId,
  "userId": ObjectId("luffy_id"),
  "fruit": "Gomu Gomu no Mi",
  "score": 50,
  "openedAt": ISODate("2024-10-13T07:00:00Z")
}
Core Logic:
Card Opening Timer: The API should track the time a user last opened a card and prevent them from opening another one before 5 hours have passed.
Random Devil Fruit Assignment: When opening a card, the API randomly selects a devil fruit from the Devil Fruits collection and returns it with its score.
Leaderboard Calculation: The leaderboard is dynamically generated by sorting users based on their total scores.
Tools & Technologies:
MongoDB: To store user data, devil fruits, and card opening history.
Express.js: For building the REST API.
JWT (JSON Web Tokens): For user authentication.
bcrypt: For hashing user passwords.
Cron Jobs or Time-based Logic: To enforce the 5-hour card opening limit.
