import { describe, it, expect } from "vitest";
import request from "supertest";
import { createRequire } from "node:module";

// Test environment secret
process.env.JWT_SECRET = "test-only-secret";

// Import Express app from main.js
const require = createRequire(import.meta.url);
const app = require("../../main");

describe("Check Login", () => {
    it("Should reject login when email and password is missing", async () => {
        const response = await request(app).post('/login').send({});

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Email and password are required");
    });

    it("Should reject login when the user does not exist", async () => {
        const response = await request(app).post("/login").send({
            email: "unknown@gmail.com",
            password: "123456",
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("User not found");
    })

    it("Should reject if the password is wrong", async () => {
        const response = await request(app).post('/login').send({
            email: "traderdikshantt@gmail.com",
            password: "unknown@gmail.com",
        })

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Wrong Password")
    })
})
