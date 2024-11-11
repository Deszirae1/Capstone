const { client } = require("./client"); 
require('dotenv').config();  
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const JWT = process.env.JWT || "shhh";


if (JWT === "shhh" && process.env.NODE_ENV !== "production") {
  console.log("Warning: In production, ensure process.env.JWT is set to a secure value!");
}


const errorHandler = (message, statusCode) => {
  const error = new Error(message);
  error.status = statusCode;
  throw error;
};

const createUser = async ({ username, password, isAdmin = false }) => {
  if (!username || !password) {
    errorHandler("Username and password are required!", 401);
  }

  const SQL = `
    INSERT INTO users(id, username, password, isAdmin) 
    VALUES($1, $2, $3, $4) 
    RETURNING *
  `;
  
  const hashedPassword = await bcrypt.hash(password, 5); 
  const userId = uuid.v4();

  const response = await client.query(SQL, [userId, username, hashedPassword, isAdmin]);
  
  return { success: true, user: response.rows[0] };
};


const findUserWithToken = async (token) => {
  let id;
  try {
    const payload = await jwt.verify(token, JWT);
    id = payload.id;
  } catch (ex) {
    errorHandler("Not authorized", 401);
  }

  const SQL = `
    SELECT * FROM users WHERE id=$1;
  `;
  
  const response = await client.query(SQL, [id]);
  
  if (!response.rows.length) {
    errorHandler("Not authorized", 401);
  }
  
  return response.rows[0];
};


const fetchUsers = async (userId) => {
  const SQL = `SELECT * FROM users WHERE id=$1;`;
  const response = await client.query(SQL, [userId]);
  return response.rows;
};


const getUsersWithReviewSummary = async () => {
  const SQL = `
    SELECT u.id, u.username, u.isAdmin, COUNT(r.id) AS review_count
    FROM users u
    LEFT JOIN reviews r ON u.id = r.user_id
    GROUP BY u.id;
  `;
  
  const response = await client.query(SQL);
  return response.rows;
};


const authenticate = async ({ username, password }) => {
  const SQL = `
    SELECT * FROM users WHERE username=$1;
  `;
  
  const response = await client.query(SQL, [username]);
  
  if (!response.rows.length || !(await bcrypt.compare(password, response.rows[0].password))) {
    errorHandler("Invalid username or password", 401);
  }

  const token = jwt.sign({ id: response.rows[0].id }, JWT, { expiresIn: '1h' });
  return { success: true, token };
};

const deleteUser = async (userId) => {
  const deleteReviews = `
    DELETE FROM reviews
    WHERE user_id = $1;
  `;

  await client.query(deleteReviews, [userId]);

  const deleteFromUsers = `
    DELETE FROM users
    WHERE id = $1 RETURNING *;
  `;

  const response = await client.query(deleteFromUsers, [userId]);
  
  if (response.rowCount === 0) {
    errorHandler("User not found", 404);
  }

  return { success: true, user: response.rows[0] };
};

module.exports = {
  createUser,
  findUserWithToken,
  fetchUsers,
  getUsersWithReviewSummary,
  authenticate,
  deleteUser
};
