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

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();

  
  const handleClose = (e) => {
    onClose(e);
  }

  const handleUpdateLearner = (e) => {
    //console.log(firstName + lastName + email + password);
    console.log(selectedValueUpdate)
    let learnerId = selectedValueUpdate._id
    console.log(learnerId)
    axios({
      method: "PUT",
      url: "http://localhost:5000/api/updateuserbyid/" + learnerId,
      data: {
        id: learnerId,
        name: firstName,
        lastName: lastName,
        email: email,
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
            label="FirstName"
            variant="standard"
            name="firstName"
            autoComplete="given-name"
            value={firstName}
            required
            fullWidth
            autoFocus
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <TextField
            sx={{ width: 450, margin: 1 }}
            label="LastName"
            variant="standard"
            name="lastName"
            autoComplete="given-name"
            value={lastName}
            required
            fullWidth
            autoFocus
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <TextField
            sx={{ width: 450, margin: 1 }}
            label="Email"
            variant="standard"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Button
            sx={{ margin: 1 }}
            variant="contained"
            onClick={(e) => handleUpdateLearner(e)}
          >
            Update
          </Button>
        </Box>
      </ListItem>
    </List>
  </Dialog>
  );
};

export default DialogTest;
