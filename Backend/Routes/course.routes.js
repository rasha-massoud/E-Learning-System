const { Router } = require("express");
const { createCourse, enroll, listStudentsEnrolled } = require("../Controllers/course.controllers");
const { adminMiddleware } = require("../Middlewares/admin.middleware");
const router = Router();

// router.post("/create", adminMiddleware, createCourse);
router.post("/create", createCourse);

// router.get("/list/:id", adminMiddleware, listStudentsEnrolled);
router.get("/list", listStudentsEnrolled);

router.post("/enroll", enroll);


module.exports = router;