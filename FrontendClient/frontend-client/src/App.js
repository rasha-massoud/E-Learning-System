import React, { useState } from 'react';
import { Routes, Route, Router } from "react-router-dom"
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import EnrollPage from "./Pages/EnrollPage";
import AddClassPage from "./Pages/AddClassPage";
import ListStudentsPage from "./Pages/ListStudentsPage";
import UploadFilesPage from "./Pages/UploadFilesPage";
import ViewAndDownloadFilesPage from "./Pages/ViewAndDownloadFilesPage";
import WithdrawalPage from "./Pages/WithdrawalPage";
import WithdrawalStatusPage from "./Pages/WithdrawalStatusPage";

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/enroll" element={<EnrollPage />} />
      <Route path="/add_class" element={<AddClassPage />} />
      <Route path="/list_students" element={<ListStudentsPage />} />
      <Route path="/upload_files" element={<UploadFilesPage />} />
      <Route path="/view_and_download_files" element={<ViewAndDownloadFilesPage />} />
      <Route path="/withdrawal" element={<WithdrawalPage />} />
      <Route path="/withdrawal_status" element={<WithdrawalStatusPage />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}

export default App;
