import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import { useStyles } from "./styles/styles";
import {changePassword} from '../../features/auth/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePasswordForm = () => {

  const { authMessage } = useSelector((state) => state.auth);
  const classes = useStyles();
  const dispatch = useDispatch();

  // Validation rules
  const formSchema = Yup.object().shape({
    new_password: Yup.string()
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters"),
    confirm_password: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("new_password")], "Passwords do not match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => {
    const newCredentials = {
        currentPassword: data.current_password,
        newPassword: data.new_password,
    }
    dispatch(changePassword(newCredentials))
  };

  useEffect(() => {
    if(authMessage === "Password changed successfully"){
        toast.success(authMessage);
    }
  },[authMessage])

  return (
    <Box className={classes.changePasswordContainer}>
    <ToastContainer/>
      <Box>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Box className={classes.changePasswordHeader}>
            <Typography variant="h4">Change your password</Typography>
            <Button type="submit" variant="contained">
              Save new password
            </Button>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="password"
                fullWidth
                label="You current password"
                {...register("current_password")}
              />
              {authMessage === "Incorrect password" && <span>{authMessage}</span>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                label="New password"
                fullWidth
                {...register("new_password")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                label="Confirm new password"
                fullWidth
                {...register("confirm_password")}
              />
              {errors.confirm_password && (
                <span>{errors.confirm_password.message}</span>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default ChangePasswordForm;
