import React, { useState } from 'react';
import { Routes, Route, Router } from "react-router-dom"
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import EnrollPage from "./Pages/EnrollPage";
import ListStudentPage from "./Pages/ListStudentPage";
import UploadFilesPage from "./Pages/UploadFilesPage";
import ViewAndDownloadFilesPage from "./Pages/ViewAndDownloadFilesPage";
import WithdrawalPage from "./Pages/WithdrawalPage";
import CreateCoursePage from './Pages/CreateCoursePage';
import WithdrawalStatusPage from "./Pages/WithdrawalStatusPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/enroll" element={<EnrollPage />} />
      <Route path="/create" element={<CreateCoursePage />} />
      <Route path="/list" element={<ListStudentPage />} />
      <Route path="/upload" element={<UploadFilesPage />} />
      <Route path="/download" element={<ViewAndDownloadFilesPage />} />
      <Route path="/withdrawal" element={<WithdrawalPage />} />
      <Route path="/withdrawal_status" element={<WithdrawalStatusPage />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}

export default App;
