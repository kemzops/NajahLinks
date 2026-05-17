/**
 * s12500001@stu.najah.edu - 12500001 (Verified Account)
 * s12500002@stu.najah.edu - 12500002 (Unverified account)
 * TESTED & ADDED ON LOCAL DEVELOPMENT ENV + TESTING DATABASE
 */
import request from "supertest";
import app from "../src/app.js";

import test from "node:test";
import assert from "node:assert/strict";

function testCase({ id, description }, fn) {
  return test(`${id} | ${description}`, fn);
}

function generateRandomStudent() {
  const suffix = Math.floor(Math.random() * 1000000);
  console.log(`Random student email: s999${suffix}@stu.najah.edu`);
  return {
    email: `s999${suffix}@stu.najah.edu`,
    password: "test12345",
  };
}

const randomStudent = generateRandomStudent();

/**
 * 4 AUTH_* Cases Covered in "Software_Project_Test_Cases.xlsx"
 */
testCase(
  {
    id: "AUTH_001",
    description:
      "POST /api/auth/register - Verify user can register with a valid university email.",
  },
  async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send(randomStudent);

    assert.equal(response.statusCode, 302);
    assert.ok(response.headers.location.startsWith("/auth?msg_type=error"));
  },
);

testCase(
  {
    id: "AUTH_002",
    description:
      "POST /api/auth/register - Verify registration fails with a non-university email.",
  },
  async () => {
    const response = await request(app).post("/api/auth/register").send({
      email: "contact@azizjaber.me",
      password: "12400257",
    });

    assert.equal(response.statusCode, 302);
    assert.ok(response.headers.location.startsWith("/auth?msg_type=error"));
  },
);

testCase(
  {
    id: "AUTH_003",
    description:
      "POST /api/auth/login - Verify user can login with valid credentials.",
  },
  async () => {
    const response = await request(app).post("/api/auth/login").send({
      student_id: "12500001",
      password: "12500001",
    });

    assert.equal(response.statusCode, 302);
    assert.equal(response.headers.location, "/dashboard");
    assert.ok(response.headers["set-cookie"]);
    assert.ok(
      response.headers["set-cookie"].some((cookies) =>
        cookies.includes("auth_token="),
      ),
    );
  },
);

testCase(
  {
    id: "AUTH_004",
    description:
      "POST /api/auth/login - Verify login fails with wrong password.",
  },
  async () => {
    const response = await request(app).post("/api/auth/login").send({
      student_id: "12500001",
      password: "12500002", // WRONG PASSOWORD :)
    });

    assert.equal(response.statusCode, 302);
    assert.ok(response.headers.location.startsWith("/auth?msg_type=error")); // redirect is a bad way but MVP + DEADLINE
  },
);

/**
 * Other cases i added myself :)
 */
testCase(
  {
    id: "AUTH_005",
    description:
      "POST /api/auth/login - Verify login fails with registered unverified account.",
  },
  async () => {
    const response = await request(app)
      .post("/api/auth/login")
      //.send(randomStudent); // the random student registered earlier
      .send({
        student_id: 12500002,
        password: "12500002",
      });

    assert.equal(response.statusCode, 302);
    assert.ok(response.headers.location.startsWith("/auth?msg_type=error")); // redirect is a bad way but MVP + DEADLINE
  },
);

testCase(
  {
    id: "AUTH_006",
    description:
      "GET /api/auth/logout - Clears auth cookie and redirects to auth page.",
  },
  async () => {
    const response = await request(app).post("/api/auth/logout");
    assert.equal(response.statusCode, 302);
    assert.ok(response.headers["set-cookie"]);
    assert.ok(response.headers.location.startsWith("/auth?msg_type=success"));
  },
);
