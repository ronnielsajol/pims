import express from "express";
import { PORT } from "./config/env.js";

import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import { checkDBConnection } from "./database/pg.js";
import errorMiddleware from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
	res.send("Welcome!");
});

app.listen(PORT, async () => {
	console.log(`Server is running on port ${PORT}`);

	await checkDBConnection();
});

export default app;
