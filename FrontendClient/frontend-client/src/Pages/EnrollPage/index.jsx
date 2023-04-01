import React from "react";
import Enroll from "../../Components/Enroll"

const EnrollPage = () => {
    localStorage.setItem("current_page", "enroll");

    return (
        <div>
            <Enroll />
        </div>
    );
};

export default EnrollPage;
