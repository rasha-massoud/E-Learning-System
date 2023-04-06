const cluster = require("cluster");
const OS = require("os")
const express = require("express");
const app = express();
const cors = require('cors');
const fileUpload = require("express-fileupload");
app.use(express.json())

require("dotenv").config();

app.use(cors({ origin: 'http://localhost:3001' }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

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
