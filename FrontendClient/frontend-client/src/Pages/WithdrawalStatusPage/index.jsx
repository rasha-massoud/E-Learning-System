import React from "react";
import WithdrawalStatus from "../../Components/WithdrawalStatus"

const WithdrawalStatusPage = () => {
    localStorage.setItem("current_page", "withdrawal_status");

    return (
        <div>
            <WithdrawalStatus />
        </div>
    );
};

export default WithdrawalStatusPage;
