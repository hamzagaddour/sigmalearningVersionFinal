import React, { useState, useEffect, Fragment } from "react";
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
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { Box } from "@mui/system";
//import SimpleDialogLearnerUpdate from "./componentsTeacher/SimpleDialogLearnerUpdate";
import DialogTest from "./componentsTeacher/DialogUpdate";

const AdminListLearner = () => {
  const [learners, setLearners] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const [openLearnerUpdate, setOpenLearnerUpdate] = useState(false);

  const [selectedValueUpdate, setSelectedValueUpdate] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/getalllearner")
      .then((res) => {
        console.log(res);
        setLearners(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function SimpleDialog(props) {
    const [firstNameAddLearner, setFirstNameAddLearner] = useState("");
    const [lastNameAddLearner, setLastNameAddLearner] = useState("");
    const [emailAddLearner, setEmailAddLearner] = useState("");
    const [passwordAddLearner, setPasswordAddLearner] = useState("");

    const { onClose, selectedValue, open } = props;
    const handleClose = () => {
      onClose(selectedValue);
    };

    const handleAddLearner = () => {
      //console.log(firstName + lastName + email + password);
      axios({
        method: "POST",
        url: "http://localhost:5000/api/createuser",
        data: {
          name: firstNameAddLearner,
          lastName: lastNameAddLearner,
          email: emailAddLearner,
          password: passwordAddLearner,
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
          Add Learner
        </DialogTitle>

        <List>
          <ListItem>
            <Box style={{ display: "inline-grid" }}>
              <TextField
                sx={{ width: 450, margin: 1 }}
                id="firstNameAddLearner"
                label="FirstName"
                variant="standard"
                name="firstNameAddLearner"
                autoComplete="given-name"
                required
                fullWidth
                autoFocus
                onChange={(e) => {
                  setFirstNameAddLearner(e.target.value);
                }}
              />
              <TextField
                sx={{ width: 450, margin: 1 }}
                id="lastNameAddLearner"
                label="LastName"
                variant="standard"
                name="lastNameAddLearner"
                autoComplete="given-name"
                required
                fullWidth
                autoFocus
                onChange={(e) => {
                  setLastNameAddLearner(e.target.value);
                }}
              />
              <TextField
                sx={{ width: 450, margin: 1 }}
                id="emailAddLearner"
                label="Email"
                variant="standard"
                name="emailAddLearner"
                autoComplete="email"
                onChange={(e) => {
                  setEmailAddLearner(e.target.value);
                }}
              />
              <TextField
                sx={{ width: 450, margin: 1 }}
                id="passwordAddLearner"
                label="Password"
                variant="standard"
                name="passwordAddLearner"
                autoComplete="new-password"
                type="password"
                onChange={(e) => {
                  setPasswordAddLearner(e.target.value);
                }}
              />
              <Button
                sx={{ margin: 1 }}
                variant="contained"
                onClick={handleAddLearner}
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

  const handleDelete = (idUser) => {
    console.log(idUser);
    axios({
      method: "delete",
      url: "http://localhost:5000/api/removeuserbyid/" + idUser,
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleCloseUpdate = () => {
    setOpenLearnerUpdate(false);
  };

  function disableUser(learnerId){
    console.log(learnerId)
    axios({
      method: "PUT",
      url: "http://localhost:5000/api/desactiverlearnerbyid/" + learnerId,
      data: {
        id: learnerId,
        activer: false
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  function enableUser(learnerId){
    console.log(learnerId)
    axios({
      method: "PUT",
      url: "http://localhost:5000/api/activerlearnerbyid/" + learnerId,
      data: {
        id: learnerId,
        activer: true
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleSwitch = (learner) => {
    console.log(learner)
    console.log('trigged student status updating');
    console.log(learner);
  
    if(learner.activer === true){
      console.log('trigger disable user action')
      disableUser(learner._id)
    } else {
      console.log('trigger activate user action')
      enableUser(learner._id)
    }
    
  };

  return (
    <Fragment>
      <Button
        onClick={() => setOpen(true)}
        sx={{ margin: 3 }}
        color="success"
        variant="contained"
      >
        Add Learner
      </Button>
      <SimpleDialog
        slectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />

      <DialogTest
        selectedValueUpdate={selectedValueUpdate}
        open={openLearnerUpdate}
        onClose={handleCloseUpdate}
      />

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>LastName</TableCell>
              <TableCell>Email</TableCell>
              {/*<TableCell>Status</TableCell>*/}
              <TableCell>Modifier</TableCell>
              <TableCell>Supprimer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {learners.map((learner, index) => {
              //const learnerId = learner;
              return (
                <>
                  <TableRow key={index}>
                    <TableCell>{learner.name}</TableCell>
                    <TableCell>{learner.lastName}</TableCell>
                    <TableCell>{learner.email}</TableCell>
                    {/**<TableCell key={learner._id}>
                <Button variant="outlined" color="primary" onClick={e => handleSwitch(learner)}>
                          {(learner.activer === true ? ("DESACTIVER") : ("ACTIVER"))}
                    </Button>
                </TableCell>*/}
                    <TableCell>
                      <>
                        <Button
                          onClick={() => {
                            setSelectedValueUpdate(learner);
                            setOpenLearnerUpdate(true);
                          }}
                        >
                          <AutoFixHighIcon />
                        </Button>
                      </>
                    </TableCell>
                    <TableCell key={learner._id}>
                      <Button onClick={(e) => handleDelete(learner._id)}>
                        <DeleteForeverIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default AdminListLearner;
