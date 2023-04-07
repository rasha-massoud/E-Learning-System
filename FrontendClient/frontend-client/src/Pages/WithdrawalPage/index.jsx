import React from "react";
import Withdrawal from "../../Components/Withdrawal"

const WithdrawalPage = () => {
    localStorage.setItem("current_page", "withdrawal");

    return (
        <div>
            <Withdrawal />
        </div>
    );
};

export default WithdrawalPage;
