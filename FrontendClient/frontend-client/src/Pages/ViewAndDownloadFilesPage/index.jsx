import React from "react";
import ViewAndDownloadFiles from "../../Components/ViewAndDownloadFiles"

const ViewAndDownloadFilesPage = () => {
    localStorage.setItem("current_page", "download");

    return (
        <div>
            <ViewAndDownloadFiles />
        </div>
    );
};

export default ViewAndDownloadFilesPage;
