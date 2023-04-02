const { Router } = require("express");
const { createCourse, enroll, listStudentsEnrolled, uploadFiles, upload } = require("../Controllers/course.controllers");
const { adminMiddleware } = require("../Middlewares/admin.middleware");
const router = Router();

// router.post("/create", adminMiddleware, createCourse);
router.post("/create", createCourse);

// router.get("/list/:id", adminMiddleware, listStudentsEnrolled);
router.get("/list", listStudentsEnrolled);

// router.post("/upload", adminMiddleware, uploadFiles);
router.post('/upload', uploadFiles);

router.post("/enroll", enroll);


module.exports = router;