import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";

const DialogTest = (props) => {
  const { selectedValueUpdate, onClose, open } = props;

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [duration, setDuration] = useState();

  const handleClose = (e) => {
    onClose(e);
  };

  const handleUpdateLearner = (e) => {
    console.log(selectedValueUpdate);
    let courseId = selectedValueUpdate._id;
    console.log(courseId);
    axios({
      method: "PUT",
      url: "http://localhost:5000/api/updatecoursebyid/" + courseId,
      data: {
        id: courseId,
        name: name,
        description: description,
        duration: duration,
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    onClose(selectedValueUpdate);
  };

  return (
    <Dialog
      PaperProps={{
        style: {
          width: 500,
          height: 600,
        },
      }}
      onClose={(e) => handleClose(e)}
      open={open}
    >
      <DialogTitle component="form" noValidate sx={{ marginLeft: 20 }}>
        Update Learner
      </DialogTitle>

      <List>
        <ListItem>
          <Box style={{ display: "inline-grid" }}>
            <TextField
              sx={{ width: 450, margin: 1 }}
              label="Name Course"
              variant="standard"
              name="name"
              required
              fullWidth
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
           
            <TextField
              sx={{ width: 450, margin: 1 }}
              label="Description"
              variant="standard"
              name="description"
              required
              fullWidth
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <TextField
              sx={{ width: 450, margin: 1 }}
              label="Duration Course"
              variant="standard"
              name="duration"
              onChange={(e) => {
                setDuration(e.target.value);
              }}
            />
            <Button
              sx={{ margin: 1 }}
              variant="contained"
              onClick={(e) => handleUpdateLearner(e)}
            >
              Update Course
            </Button>
          </Box>
        </ListItem>
      </List>
    </Dialog>
  );
};

export default DialogTest;
