import React from "react";
import { MrMiyagi } from "@uiball/loaders";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {useStyles} from './styles/styles';

const ProtectedRoute = ({ children }) => {
  const { status, isAuth } = useSelector((state) => state.auth);

  const classes = useStyles();

  if (status === "loading" || isAuth === "undefined")
    return (
      <div className={classes.protectedScreenSpinnerContainer}>
        <MrMiyagi size={300} lineWeight={3.5} speed={1} color="#54BAB9" />
      </div>
    );
  if (isAuth === false) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
