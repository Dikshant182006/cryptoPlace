import { describe, it, expect } from "vitest";
import request from "supertest";
import { createRequire } from "node:module";

// Test environment secret
process.env.JWT_SECRET = "test-only-secret";

// Import Express app from main.js
const require = createRequire(import.meta.url);
const app = require("../../main");

describe("CryptoPlace Backend Health API", () => {

    it("should return successful response from root endpoint", async () => {
        const response = await request(app).get("/");

        expect(response.status).toBe(200);
        expect(response.body.status).toBe("success");
    });
});
