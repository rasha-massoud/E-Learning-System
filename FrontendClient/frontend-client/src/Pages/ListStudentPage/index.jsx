import React from "react";
import ListStudent from "../../Components/ListStudent"

const ListStudentPage = () => {
    localStorage.setItem("current_page", "list");

    return (
        <div>
            <ListStudent />
        </div>
    );
};

export default ListStudentPage;
