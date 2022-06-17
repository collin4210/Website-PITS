require("dotenv").config();

const path = require("path");

const express = require("express");
const app = express();

const helmet = require("helmet");
const cors = require("cors");

const userController = require("./controllers/user-controller");
const jwtController = require("./controllers/jwt-controller");

app.use(express.json());
app.use(cors({
    origin: process.env.CORS
}));
app.use(helmet());

app.use(express.static(path.resolve(__dirname + "/../../frontend/dist/")));

app.post("/api/user", async (req, res) => {
    try {
        const { password, ...user } = await userController.createUser(req.body.username, req.body.email, req.body.password);
        res.json(user);
    } catch (err) {
        res.status(400).json(err);
    }
});

app.post("/api/auth", async (req, res) => {
    const { usernameOrEmail, password } = req.body;
    try {
        const user = await userController.getUserByLogin(usernameOrEmail, password);
        if (!user) {
            res.status(400).json({
                message: "Invalid username or password"
            });
            return;
        }
        const token = await jwtController.createToken(user.username);
        res.json({
            token
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

app.get("/api/auth/validation", async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const username = await jwtController.verifyToken(token);
        const user = userController.getUserByUsername(username);
        if (!user) {
            res.status(400).json({
                message: "Invalid token"
            });
            return;
        }
        res.json({username});
    } catch {
        res.status(400).json({
            message: "Invalid token"
        });
    }
});

app.listen(process.env.PORT, () => {
    console.log("Running on port " + process.env.PORT);
});
