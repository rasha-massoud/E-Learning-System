import React from "react";
import ViewAndDownloadFiles from "../../Components/ViewAndDownloadFiles"

const ViewAndDownloadFilesPage = () => {
    localStorage.setItem("current_page", "view_and_download_files");

    return (
        <div>
            <ViewAndDownloadFiles />
        </div>
    );
};

export default ViewAndDownloadFilesPage;
