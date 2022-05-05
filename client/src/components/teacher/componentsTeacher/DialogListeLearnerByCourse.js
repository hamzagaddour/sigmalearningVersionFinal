import React, { useState, useEffect } from "react";
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

const DialogListeLearnerByCourse = (props) => {
  const { slectedValueListeLearner, onClose, open } = props;
  console.log(slectedValueListeLearner);
  let idCourse = slectedValueListeLearner._id
  console.log(idCourse)


  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:5000/api/getcoursebyidteacher/" 
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleClose = (e) => {
    onClose(e);
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
       Liste Learner
      </DialogTitle>

      <List>
        <ListItem></ListItem>
      </List>
    </Dialog>
  );
};

export default DialogListeLearnerByCourse;
