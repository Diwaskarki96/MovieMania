// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const AdminGuestGuard = (props) => {
//   const isAdminLoggedIn = localStorage.getItem("accessToken");
//   const isAdmin = localStorage.getItem("role");
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (isAdminLoggedIn && isAdmin) {
//       navigate("/admin/home");
//     }
//   }, [isAdminLoggedIn, isAdmin, navigate]);
//   return <div>{!isAdmin && !isAdminLoggedIn ? props.children : null}</div>;
// };

// export default AdminGuestGuard;
