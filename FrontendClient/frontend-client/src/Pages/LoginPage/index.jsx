import React from "react";
import Login from "../../Components/Login"

const LoginPage = () => {
    localStorage.setItem("current_page", "login");

    return (
        <div>
            <Login />
        </div>
    );
};

export default LoginPage;
