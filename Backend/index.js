const cluster = require("cluster");
const OS = require("os")
const express = require("express");
const app = express();
app.use(express.json())
require("dotenv").config();

const authRouter = require("./Routes/auth.routes")
app.use('/auth', authRouter)

const courseRouter = require("./Routes/course.routes");
const { authMiddleware } = require("./Middlewares/auth.middleware");
app.use('/course', authMiddleware, courseRouter)

if (cluster.isMaster) {
    const numCpus = OS.cpus().length;
    for (let i = 0; i < numCpus; i++) {
        cluster.fork();
    }
} else {
    app.listen(process.env.PORT, (err) => {
        if (err) console.error(err)
        console.log(`Worker ${process.pid} is running on port `, process.env.PORT);
        require("./Configs/db.config")
    });
}
