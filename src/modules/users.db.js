import db from "../database/client.js";

/**
 * Find user by email
 */
export async function findUserByEmail(email) {
  const result = await db.execute(
    "SELECT * FROM users WHERE email = ? LIMIT 1",
    [email],
  );

  return result.rows[0] || null;
}

/**
 * Find user by student_id
 */
export async function findUserByStudentId(studentId) {
  const result = await db.execute(
    "SELECT * FROM users WHERE student_id = ? LIMIT 1",
    [studentId],
  );

  return result.rows[0] || null;
}

/**
 * Find user by ID
 */
export async function findUserById(id) {
  const result = await db.execute("SELECT * FROM users WHERE id = ? LIMIT 1", [
    id,
  ]);

  return result.rows[0] || null;
}

/**
 * Create new user
 */
export async function createUser({
  student_id,
  email,
  password,
  verification_token = null,
}) {
  const result = await db.execute(
    `
      INSERT INTO users (student_id, email, password, verification_token)
      VALUES (?, ?, ?, ?)
    `,
    [student_id, email, password, verification_token],
  );

  return result.lastInsertRowid;
}

/**
 * Verify user by token (1-step)
 */
export async function verifyUserByToken(token) {
  const result = await db.execute(
    `
      UPDATE users
      SET is_verified = 1,
          verification_token = NULL
      WHERE verification_token = ?
    `,
    [token],
  );

  return result.rowsAffected > 0;
}
