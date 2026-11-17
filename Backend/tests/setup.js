import { beforeAll, afterAll } from "vitest";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const mongoose = require("mongoose");
const { connectDB } = require("../models/user");

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await mongoose.disconnect();
});
