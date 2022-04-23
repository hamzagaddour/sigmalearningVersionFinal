import React, { useState, useEffect } from "react";
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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { Box } from "@mui/system";

const AdminListLearner = () => {
  const [users, setUsers] = useState();
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/getalllearner")
      .then((res) => {
        console.log(res);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  

  function SimpleDialog(props) {


    const [firstName, setFirstName]=useState('')
    const [lastName, setLastName]=useState('')
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')

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
        name: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      onClose(selectedValue);
    }



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
        <DialogTitle component="form"
            noValidate sx={{ marginLeft: 20 }}>Add Learner</DialogTitle>

        <List>
          <ListItem>
            <Box style={{ display: "inline-grid" }}>
              <TextField
                sx={{ width: 450, margin: 1 }}
                id="firstName"
                label="FirstName"
                variant="standard"
                name="firstName"
                autoComplete="given-name"
                required
                fullWidth
                autoFocus
                onChange={(e)=>{setFirstName(e.target.value)}}
              />
              <TextField
                sx={{ width: 450, margin: 1 }}
                id="lastName"
                label="LastName"
                variant="standard"
                name="lastName"
                autoComplete="given-name"
                required
                fullWidth
                autoFocus
                onChange={(e)=>{setLastName(e.target.value)}}
              />
              <TextField
                sx={{ width: 450, margin: 1 }}
                id="email"
                label="Email"
                variant="standard"
                name="email"
                autoComplete="email"
                onChange={(e)=>{setEmail(e.target.value)}}
              />
              <TextField
                sx={{ width: 450, margin: 1 }}
                id="password"
                label="Password"
                variant="standard"
                name="password"
                autoComplete="new-password"
                type="password"
                onChange={(e)=>{setPassword(e.target.value)}}
              />
              <Button sx={{ margin: 1 }} variant="contained" onClick={handleAddLearner}>
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

  const handleDelete = (idUser)=>{
    console.log(idUser)
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

  }
  return (
    <>
      <>
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
      </>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>LastName</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell><Button onClick={()=>handleDelete(row._id)}><DeleteForeverIcon/></Button></TableCell>
                <TableCell><Button><AutoFixHighIcon/></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminListLearner;
