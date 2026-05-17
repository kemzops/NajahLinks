import crypto from "node:crypto";

/**
 * Build student email from student ID
 */
export function buildStudentEmail(studentId) {
  return `s${studentId}@stu.najah.edu`;
}

/**
 * Validate student email format
 * Must match: s########@stu.najah.edu
 */
export function isValidStudentEmail(email) {
  return /^s[0-9]{8}@stu\.najah\.edu$/.test(email);
}

/**
 * Validate student email format
 * Must match: 1xxxxxxx
 */
export function isValidStudentID(studentID) {
  return typeof studentID === "string" && /^1[0-9]{7}$/.test(studentID);
}

/**
 * Extract student_id from email
 */
export function extractStudentID(email) {
  return Number(email.substring(1, 9));
}

/**
 * Generate a random slug
 */
export function generateSlug(length = 8) {
  return crypto.randomBytes(16).toString("hex").slice(0, length);
}

/**
 * Generate a random verification token
 */
export function generateVerificationToken() {
  return crypto.randomUUID();
}
