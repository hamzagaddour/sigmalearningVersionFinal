import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LocalLibraryRoundedIcon from "@mui/icons-material/LocalLibraryRounded";
import { Link} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from 'react-redux'



export default function ButtonAppBar() {

  const user = useSelector((state)=> state.user.value);
  const logged = user.logged 

  const theme = createTheme({
    palette: {
      neutral: {
        main: "#64748B",
        contrastText: "#fff",
      },
    },
  });

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
            {!logged ? (<>
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
            </> ) : ("")}
            </ThemeProvider>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
