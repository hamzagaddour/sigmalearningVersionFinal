import React, {useState} from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TeacherListLearner from "../components/teacher/TeacherListLearner";
import TeacherListCourse from "../components/teacher/TeacherListCourse";
import TeacherDefaultPage from "../components/teacher/TeacherDefaultPage";

const drawerWidth = 240;

export default function PermanentDrawerLeft() {

    const [currentNavDisplay, setCurrentNavDisplay] = useState(<TeacherDefaultPage/>)




  const handleNavAdmin = (text, index) => {
    //console.log(text);
    //console.log(index);
    switch (text) {

      case "List Learner":
        setCurrentNavDisplay(<TeacherListLearner/>);
        break;
      case "List Course":
        setCurrentNavDisplay(<TeacherListCourse/>);
        break;
        default:
          setCurrentNavDisplay()
          break;
    }
  };

  return (
    <Box sx={{ display: "block" }}>
      <CssBaseline />
      <AppBar
        color="default"
        position="relative"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
           Teacher Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            top: 66,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {[ "List Course"].map(
            (text, index) => (
              <ListItem button key={text}>
                <ListItemIcon><ArrowForwardIosIcon/></ListItemIcon>
                <ListItemText
                  onClick={(e) => handleNavAdmin(text, index)}
                  primary={text}
                />
              </ListItem>
            )
          )}
        </List>
        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{
          marginLeft: 35,
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
        }}
      >
        <Toolbar />
        <Typography paragraph>
          {currentNavDisplay}
        </Typography>
      </Box>
    </Box>
  );
}
