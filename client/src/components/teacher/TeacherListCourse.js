import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  TextField,
} from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Box } from "@mui/system";
import DialogeUpdateCourse from "./componentsTeacher/DialogUpdateCourse";
import DialogListeLearnerByCourse from "./componentsTeacher/DialogListeLearnerByCourse";
import { Link } from "@mui/material";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const AdminListCourse = () => {
  const [courses, setCourses] = useState([]);

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValueUpdate, setSelectedValueUpdate] = useState("");
  const [openCourseUpdate, setOpenCourseUpdate] = useState(false);

  const [slectedValueListeLearner, setSlectedValueListeLearner] = useState("");
  const [openLearnerListe, setOpenLearnerListe] = useState(false);

  const course = useSelector((state) => state.course.value);
  const user = useSelector((state) => state.user.value);
  console.log(user);
  console.log(course);
  let teacherId = user._id;
  let teacherName = user.firstName;
  console.log(teacherName);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:5000/api/getcoursebyidteacher/" + teacherId,
    })
      .then(function (response) {
        console.log(response);
        setCourses(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [teacherId]);

  function SimpleDialog(props) {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");

    const { onClose, selectedValue, open } = props;
    const handleClose = () => {
      onClose(selectedValue);
    };

    const handleAddCourse = () => {
      //console.log(name + image + description + duration);

      axios({
        method: "POST",
        url: "http://localhost:5000/api/course/create/",
        data: {
          name: name,
          image: image,
          description: description,
          duration: duration,
          idTeacher: teacherId,
          nameTeacher: teacherName,
        },
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      onClose(selectedValue);
    };

    return (
      <Dialog
        PaperProps={{
          style: {
            width: 500,
            height: 600,
          },
        }}
        onClose={handleClose}
        open={open}
      >
        <DialogTitle component="form" noValidate sx={{ marginLeft: 20 }}>
          Add Course
        </DialogTitle>

        <List>
          <ListItem>
            <Box style={{ display: "inline-grid" }}>
              <TextField
                sx={{ width: 450, margin: 1 }}
                id="name"
                label="Name"
                variant="standard"
                name="name"
                autoComplete="given-name"
                required
                fullWidth
                autoFocus
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <TextField
                sx={{ width: 450, margin: 1 }}
                id="image"
                label="Image"
                variant="standard"
                name="image"
                required
                fullWidth
                autoFocus
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              />
              <TextField
                sx={{ width: 450, margin: 1 }}
                id="description"
                label="Description"
                variant="standard"
                name="description"
                autoComplete="description"
                required
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <TextField
                sx={{ width: 450, margin: 1 }}
                id="duration"
                label="Duration"
                variant="standard"
                name="duration"
                autoComplete="new-duration"
                required
                onChange={(e) => {
                  setDuration(e.target.value);
                }}
              />
              <Button
                sx={{ margin: 1 }}
                variant="contained"
                onClick={handleAddCourse}
              >
                Add
              </Button>
            </Box>
          </ListItem>
        </List>
      </Dialog>
    );
  }

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const handleDelete = (idCourse) => {
    console.log(idCourse);
    axios({
      method: "delete",
      url: "http://localhost:5000/api/removecoursebyid/" + idCourse,
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleCloseUpdate = () => {
    setOpenCourseUpdate(false);
  };

  function disableUser(courseId) {
    console.log(courseId);
    axios({
      method: "PUT",
      url: "http://localhost:5000/api/desactivercoursebyid/" + courseId,
      data: {
        id: courseId,
        activer: false,
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function enableUser(courseId) {
    console.log(courseId);
    axios({
      method: "PUT",
      url: "http://localhost:5000/api/activercoursebyid/" + courseId,
      data: {
        id: courseId,
        activer: true,
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleSwitch = (course) => {
    console.log("trigged course status updating");
    console.log(course);

    if (course.activer === true) {
      console.log("trigger disable course action");
      disableUser(course._id);
    } else {
      console.log("trigger activate course action");
      enableUser(course._id);
    }
  };

  const handleCloseLeanerliste = () => {
    setOpenLearnerListe(false);
  };

  return (
    <>
      <>
        <Button
          sx={{ margin: 3 }}
          variant="contained"
          onClick={() => setOpen(true)}
          color="success"
        >
          Add Course
        </Button>
        <SimpleDialog
          slectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />
        <DialogeUpdateCourse
          selectedValueUpdate={selectedValueUpdate}
          open={openCourseUpdate}
          onClose={handleCloseUpdate}
        />
        <DialogListeLearnerByCourse
          slectedValueListeLearner={slectedValueListeLearner}
          open={openLearnerListe}
          onClose={handleCloseLeanerliste}
        />
      </>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Supprimer</TableCell>
              <TableCell>Modifier</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => {
              let courseId = course._id;
              return (
                <TableRow key={courseId}>
                  <TableCell>
                    <Link
                      onClick={() => {
                        setSlectedValueListeLearner(course);
                        setOpenLearnerListe(true);
                      }}
                    >
                      {course.name}
                    </Link>
                  </TableCell>
                  <TableCell key={course._id}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={(e) => handleSwitch(course)}
                    >
                      {course.activer === true ? "DESACTIVER" : "ACTIVER"}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleDelete(course._id)}>
                      <DeleteForeverIcon />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setSelectedValueUpdate(course);
                        setOpenCourseUpdate(true);
                      }}
                    >
                      <AutoFixHighIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminListCourse;
