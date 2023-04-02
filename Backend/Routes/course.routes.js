const { Router } = require("express");
const { createCourse , enroll} = require("../Controllers/course.controllers");
const { adminMiddleware } = require("../Middlewares/admin.middleware");
const router = Router();

router.post("/create", adminMiddleware, createCourse);
router.post("/enroll", enroll);


module.exports = router;