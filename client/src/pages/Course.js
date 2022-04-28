import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import axios from "axios";
import { Button } from "@mui/material";
import FileDownload from "js-file-download";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { create } from "../features/chapter";

const Course = () => {
  const state = useSelector((state) => state.course.value);
  const courseId = state.id;
  const nameCourse = state.name;
  const descriptionCourse = state.description;
  const durationCourse = state.duration;
  const idTeacher = state.idTeacher;
    console.log(courseId)
    console.log(nameCourse)
    console.log(descriptionCourse)
    console.log(durationCourse)
    console.log(idTeacher)

  const drawerWidth = 240;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //console.log(nameCourse)
  //console.log("this is your courseId " + courseId);
  const [chapters, setChapters] = useState([]);
  const [currentChapterDisplay, setCurrentChapterDisplay] = useState();
  const [button, setButton] = useState();

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:5000/api/chapters/" + courseId,
    })
      .then(function (response) {
        //console.log(response);
        setChapters(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [courseId]);

  const download = (chapterId) => {
    console.log(chapterId);
    let idChapter = chapterId;

    axios({
      method: "GET",
      url: "http://localhost:5000/api/getChapter/" + idChapter,
      responseType: "document",
    }).then((res) => {
      console.log(res);
      FileDownload(res.data, "downloaded.pdf");
    });
  };

  const upateChapterContent = (index, chapterId, chapName, idCourse) => {
    console.log(chapterId);
    console.log(chapName);
    console.log("votre id course = " + idCourse);

    setCurrentChapterDisplay(chapters[index].content);

    if (chapName === "Conclusion NodeJs" || chapName === "Conclusion ReactJs") {
      setButton(
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("/qcm")}
        >
          QCM
        </Button>
      );
    } else {
      setButton(
        <Button onClick={() => download(chapterId)}>Telecharger Chapter</Button>
      );
    }

    dispatch(
      create({
        id: chapterId,
        name: chapName,
        courseId: idCourse,
      })
    );
  };

  return (
    <Box sx={{ display: "block" }}>
      <CssBaseline />
      <AppBar
        color="inherit"
        position="relative"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {nameCourse}
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
            top: 130,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Divider />
        <List>
          {chapters.map((chapter, index) => (
            <ListItem button key={chapter._id}>
              <ListItemIcon>
                <ArrowForwardIosIcon />
              </ListItemIcon>
              <ListItemText
                primary={chapter.name}
                onClick={() =>
                  upateChapterContent(
                    index,
                    chapter._id,
                    chapter.name,
                    chapter.courseId
                  )
                }
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          marginLeft: 35,
          flexGrow: 1,
          bgcolor: "background.default",
          p: 0,
        }}
      >
        <Toolbar />
        <Typography paragraph>
          {currentChapterDisplay}
          {button}
        </Typography>
      </Box>
    </Box>
  );
};

export default Course;
