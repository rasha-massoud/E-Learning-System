import React from "react";
import Register from "../../Components/Register"

const RegisterPage = () => {
    localStorage.setItem("current_page", "register");

    return (
        <div>
            <Register />
        </div>
    );
};

export default RegisterPage;