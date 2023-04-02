const { Router } = require("express");
const { createCourse, enroll, listStudentsEnrolled, uploadFiles, downloadFiles, withdrawalForm, withdrawalFormStatus } = require("../Controllers/course.controllers");
const { adminMiddleware } = require("../Middlewares/admin.middleware");
const router = Router();

// router.post("/create", adminMiddleware, createCourse);
router.post("/create", createCourse);

// router.get("/list/:id", adminMiddleware, listStudentsEnrolled);
router.get("/list", listStudentsEnrolled);

// router.post("/upload", adminMiddleware, uploadFiles);
router.post('/upload', uploadFiles);

router.get('/download/:courseId/files/:fileId', downloadFiles)

router.post("/enroll", enroll);

router.post("/withdrawal_form", withdrawalForm);

// router.post("/withdrawal_form_status", adminMiddleware, withdrawalFormStatus);
router.post("//withdrawal_form_status", withdrawalFormStatus);


module.exports = router;