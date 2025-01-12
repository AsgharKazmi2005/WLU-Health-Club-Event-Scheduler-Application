import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import AdminConsole from "../components/AdminConsole";

const AdminPage = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: user, error } = await supabase.auth.getUser();
      if (error || !user) {
        navigate("/login"); // Redirect to login if not authenticated
        return;
      }
      setLoading(false); // Authenticated
    };

    checkAuth();
  }, [navigate]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-main">
      <h1>Admin Dashboard</h1>
      <AdminConsole />
    </div>
  );
};

export default AdminPage;
