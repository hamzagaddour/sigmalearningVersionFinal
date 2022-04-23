import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const AdminListCourse = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/getallcourses")
      .then((res) => {
        console.log(res);
        setCourses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  return (
    <main>
    <Container sx={{ py: 8 }} maxWidth="md">
      {/* End hero unit */}
      <Grid container spacing={4}>
        {courses.map((course) => (
          <Grid item key={course._id} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <CardMedia
                component="img"

                src={require(`../pages/uploads/${course.image}`)}
                alt={course.image}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {course.name}
                </Typography>
                <Typography>
                  {course.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  </main>
  )
}

export default AdminListCourse