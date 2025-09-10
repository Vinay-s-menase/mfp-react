import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link to="/">Your Website</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  "@global": {
    a: {
      textDecoration: "none",
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp({ onSignIn }) {
  const classes = useStyles();
  const [userData, setUserData] = useState({});
  const [error, setError] = useState({});

  const handleError = () => {
    setError({});
    let errorPresent = false;
    const regexExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regexExp.test(userData?.email)) {
      setError((prev) => ({ ...prev, email: "Enter email properly" }));
      errorPresent = true;
    }
    if (!userData?.password || userData?.password?.length < 4) {
      setError((prev) => ({
        ...prev,
        password: "Enter password of atleast 4 characters",
      }));
      errorPresent = true;
    }
    if (!userData.firstName || userData.firstName.length <= 0) {
      setError((prev) => ({
        ...prev,
        firstName: "Enter First name",
      }));
      errorPresent = true;
    }
    if (!userData.lastName || userData.lastName.length <= 0) {
      setError((prev) => ({
        ...prev,
        lastName: "Enter Last name",
      }));
      errorPresent = true;
    }
    return errorPresent;
  };

  const handleSignIn = () => {
    const errorPresent = handleError();

    if (!errorPresent) {
      const alertOne = confirm("Are you sure email and password are correct?");
      if (alertOne) {
        console.log(userData?.email, userData?.password);
        onSignIn && onSignIn();
        setError({});
      } else {
        return;
      }
    }
  };

  const handleUserData = (e, key) => {
    const { value } = e.target;
    setUserData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          onSubmit={(e) => e.preventDefault()}
          className={classes.form}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={userData?.firstName}
                onChange={(e) => handleUserData(e, "firstName")}
              />
              <Typography color="error">{error.firstName}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={userData?.lastName}
                onChange={(e) => handleUserData(e, "lastName")}
              />
              <Typography color="error">{error.lastName}</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={userData?.email}
                onChange={(e) => handleUserData(e, "email")}
              />
              <Typography color="error">{error.email}</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={userData?.password}
                onChange={(e) => handleUserData(e, "password")}
              />
              <Typography color="error">{error.password}</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSignIn}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/auth/signin">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
