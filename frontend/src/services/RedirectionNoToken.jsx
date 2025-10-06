import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const redirectionNoToken = (token) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/se-connecter");
  }, [token]);
};
