import { describe, it, expect } from "vitest";
import request from "supertest";
import { createRequire } from "node:module";

// Test environment secret
process.env.JWT_SECRET = "test-only-secret";

// Import Express app from main.js
const require = createRequire(import.meta.url);
const app = require("../../main");

describe("Check Register", () => {
    it("Should reject register when email and password is missing", async () => {

        const response = await request(app).post("/register").send({});
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("All fields are required");
    });

    it("Should reject register when user is already exists", async () => {
        const response = await request(app).post("/register").send({
            email: "traderdikshantt@gmail.com",
            password: "abcdef"
        })

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("User already exists")
    });

    it("Should register a user successfully with valid details", async () => {
        const response = await request(app).post("/register").send({
            firstname: "dikshat",
            lastname: "Sharma",
            email: "notexistsuser@gmail.com",
            password: "abcd123"
        });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("User created successfully")
    })
})
