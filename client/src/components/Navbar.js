import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LocalLibraryRoundedIcon from "@mui/icons-material/LocalLibraryRounded";
import { Link, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/user";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";

export default function ButtonAppBar() {
  const user = useSelector((state) => state.user.value);
  const logged = user.logged;
  //const name = user.email;
  console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      neutral: {
        main: "#64748B",
        contrastText: "#fff",
      },
    },
  });

  const logoutHandler = () => {
    //event.preventDefault();
    dispatch(
      logout({
        logged: false,
      })
    );

    navigate("/");
  };

  const handleRoute = () => {
    console.log(user)
    let admin = user.admin
    let teacher = user.teacher
    console.log(admin)
    
    console.log(teacher)
    if (admin === true) {
      navigate("/admin");
    } else if (teacher === true) {
      navigate("/teacher");
    } else if (admin && teacher === true) {
      navigate("/admin");
    } else {
      navigate("/profile");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 0 }}
          >
            <Link to="/">
              {" "}
              <LocalLibraryRoundedIcon fontSize="large" />
            </Link>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sigma Learning
          </Typography>

          <ThemeProvider theme={theme}>
            {!logged ? (
              <>
                <Button
                  href="/login"
                  sx={{ margin: 1 }}
                  variant="contained"
                  color="neutral"
                >
                  Login
                </Button>
                <Button
                  href="/register"
                  color="neutral"
                  sx={{ margin: 1 }}
                  variant="contained"
                >
                  Sing Up
                </Button>
              </>
            ) : (
              <>
                <Chip
                  sx={{ margin: 1 }}
                  label={user.firstName + " " + user.lastName}
                  color="primary"
                  component="a"
                  onClick={(e)=>handleRoute()}
                  variant="filled"
                  clickable
                />
                <Button
                  onClick={(e) => logoutHandler()}
                  variant="contained"
                  color="neutral"
                >
                  Log Out
                </Button>
              </>
            )}
          </ThemeProvider>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
