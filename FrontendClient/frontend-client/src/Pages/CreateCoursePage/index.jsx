import React from "react";
import CreateCourse from "../../Components/CreateCourse"

const CreateCoursePage = () => {
    localStorage.setItem("current_page", "create");

    return (
        <div>
            <CreateCourse />
        </div>
    );
};

export default CreateCoursePage;
