import React from "react";
import UploadFiles from "../../Components/UploadFiles"

const UploadFilesPage = () => {
    localStorage.setItem("current_page", "upload");

    return (
        <div>
            <UploadFiles />
        </div>
    );
};

export default UploadFilesPage;
