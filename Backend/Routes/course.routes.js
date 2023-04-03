const { Router } = require("express");
const { createCourse, enroll, listStudentsEnrolled, uploadFiles, downloadFiles, withdrawalForm, withdrawalFormStatus } = require("../Controllers/course.controllers");
const { adminMiddleware } = require("../Middlewares/admin.middleware");
const router = Router();

router.post("/create", adminMiddleware, createCourse);

router.get("/list", adminMiddleware, listStudentsEnrolled);

router.post("/upload", adminMiddleware, uploadFiles);

router.get('/download/:courseId/files/:fileId', downloadFiles)

router.post("/enroll", enroll);

router.post("/withdrawal_form", withdrawalForm);

router.post("/withdrawal_form_status", adminMiddleware, withdrawalFormStatus);

module.exports = router;