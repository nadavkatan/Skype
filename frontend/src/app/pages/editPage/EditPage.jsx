import React from "react";
import ChangePasswordForm from "../../components/changePasswordForm/ChangePasswordForm";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "../../components/avatar/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useMediaQuery } from "@mui/material";
import { updateUserCredentials } from "../../features/auth/authSlice";
import { useStyles } from "./styles/styles";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import editBackground from '../../assets/images/edit-background.jpeg';

const EditPage = () => {
  const { currentUser } = useSelector((state) => state.auth);

  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data.avatar.length) {
      const formData = new FormData();
      formData.append("avatar", data.avatar[0]);
      formData.append("first_name", data.first_name);
      formData.append("last_name", data.last_name);
      formData.append("username", data.username);
      formData.append("email", data.email);

      dispatch(updateUserCredentials(formData));
    } else {
      dispatch(updateUserCredentials(data));
    }
  };

  return (
    <>
      {currentUser && (
        <Box className={classes.editPageWrapper} style={{backgroundImage:`url(${editBackground})`, backgroundSize: 'contain',}}>
          <Box
            className={
              isSmallScreen
                ? classes.smScreenEditPageContainer
                : classes.editPageContainer
            }
          >
            <Box className={classes.editPageHeader}>
              <Typography variant="h3" className={classes.editPageTitle}>Edit profile</Typography>
              <Typography variant="subtitle1">
                People on Skype will get to know you with the info below
              </Typography>
            </Box>
            {/* <Grid container spacing={2}>
              <Grid item md={6} xs={12}></Grid>
              <Grid item md={6} xs={12}></Grid>
            </Grid> */}
            <Box
              className={classes.editPageFormContainer}
              component="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Box
                className={
                  isSmallScreen
                    ? classes.smScreenFormHeader
                    : classes.formHeader
                }
              >
                <Box
                  className={
                    isSmallScreen
                      ? classes.smScreenEditPageAvatarContainer
                      : classes.editPageAvatarContainer
                  }
                >
                  <div className={classes.editPageAvatar}>
                    <Avatar
                      avatarDimensions={{ width: 150, height: 150 }}
                      imgSrc={currentUser.avatar.secure_url}
                      loggedIn={currentUser.is_logged_in}
                    />
                  </div>
                  <Button
                    variant="outlined"
                    component="label"
                    className={
                      isSmallScreen ? classes.smScreenChangePictureBtn : null
                    }
                  >
                    Change profile picture
                    <input
                      style={{
                        width: "100%",
                        position: "absolute",
                        display: "none",
                      }}
                      type="file"
                      accept="image/png, image/jpeg"
                      {...register("avatar")}
                    />
                  </Button>
                </Box>
                <Button type="submit" variant="contained">
                  Done
                </Button>
              </Box>
              <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    defaultValue={currentUser.first_name}
                    {...register("first_name")}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    defaultValue={currentUser.last_name}
                    {...register("last_name")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    defaultValue={currentUser.username}
                    {...register("username")}
                  />
                  {errors.username && <span>{errors.username.message}</span>}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    defaultValue={currentUser.email}
                    {...register("email", {
                      pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                  />
                  {errors.email && <span>{errors.email.message}</span>}
                </Grid>
              </Grid>
            </Box>
            <ChangePasswordForm />
          </Box>
          <Box
            className={
              isSmallScreen
                ? classes.smScreenBackBtnContainer
                : classes.backBtnContainer
            }
          >
            <Button
              variant="contained"
              onClick={() => navigate("/")}
              className={isSmallScreen ? classes.smScreenBackBtn : null}
            >
              Back
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default EditPage;
