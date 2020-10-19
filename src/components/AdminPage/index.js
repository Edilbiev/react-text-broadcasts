import React from "react";
import AdminOnlines from "../AdminOnlines";

function AdminPage({ isAdmin }) {
  return (
    <>
      <AdminOnlines isAdmin={isAdmin} />
    </>
  );
}

export default AdminPage;
