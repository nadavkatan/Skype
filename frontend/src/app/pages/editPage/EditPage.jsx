import React from "react";
import { useStyles } from "./styles/styles";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "../../components/avatar/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import EditIcon from '@mui/icons-material/Edit';

const EditPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  const { currentUser } = useSelector((state) => state.auth);
  const classes = useStyles();

  return (
    <Box className={classes.editPageWrapper}>
    <Box className={classes.editPageContainer}>
    <Box className={classes.editPageHeader}>
      <Typography variant="h3">Edit profile</Typography>
      <Typography variant="subtitle1">
        People on Skype will get to know you with the info below
      </Typography>
      </Box>
      <Box
        className={classes.editPageFormContainer}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box className={classes.formHeader}>
            <Box className={classes.editPageAvatarContainer}>
              <Avatar avatarDimensions={{ width: 150, height: 150 }}/>
              <Fab size="small" color="warning" className={classes.editIcon}>
                <EditIcon/>
                <TextField
                  style={{ display: "none" }}
                  type="file"
                  {...register("avatar")}
                />
              </Fab>
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
    </Box>
    </Box>
  );
};

export default EditPage;
