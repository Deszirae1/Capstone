const { client } = require("/client");

const uuid = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT || "shhh";
if (JWT === "shhh") {
  console.log("If deployed, set process.env.JWT to something other than shhh");
}

const createUser = async ({ 
  username, 
  password, 
  isAdmin = false 
}) => {
  if (!username || !password) {
    const error = Error("username and password required!");
    error.status = 401;
    throw error;
  }

  const SQL = `
    INSERT INTO users(id, username, password, isAdmin) VALUES($1, $2, $3) RETURNING *
  `;

  const response = await client.query(SQL, [
    uuid.v4(),
    username,
    await bcrypt.hash(password, 5),
    isAdmin
  ]);
  
  return response.rows[0];
};

const findUserWithToken = async (token) => {
  let id;
  try {
    const payload = await jwt.verify(token, JWT);
    id = payload.id;
  } catch (ex) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
  const SQL = `
    SELECT * FROM users WHERE id=$1;
`;
  const response = await client.query(SQL, [id]);
  if (!response.rows.length) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
  return response.rows[0];
};

const fetchUsers = async () => {
  const SQL = `
    SELECT * FROM users WHERE id=$1;
`;
  const response = await client.query(SQL);
  return response.rows;
};

const getUsersWithReviewSummary = async () => {
  const SQL = `
    SELECT u.id, u.username, u.isAdmin, count
    FROM users u
    LEFT JOIN reviews r ON u.id = r.user_id
    GROUP BY u.id;
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const authenticate = async ({ username, password }) => {
  const SQL = `
    SELECT * FROM users WHERE id=$1;
`;
  const response = await client.query(SQL, [username]);
  if (
    !response.rows.length ||
    (await bcrypt.compare(password, response.rows[0].password)) === false
  ) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
  const token = await jwt.sign({ id: response.rows[0].id }, JWT);
  return { token };
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
    const error = Error("User not found");
    error.status = 404;
    throw error;
  }
  
  return response.rows[0]; 
};

module.exports = { createUser, findUserWithToken, fetchUsers, getUsersWithReviewSummary, authenticate, deleteUser };
