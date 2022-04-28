import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { create } from "../features/course";

const Profile = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleCourse = (course) => {
    console.log(course);

    dispatch(
      create({
        id: course._id,
        name: course.name,
        image: course.image,
        description: course.description,
        duration: course.duration,
        idTeacher : course.idTeacher,
        nameTeacher: course.nameTeacher,
      })
    );
    navigate("/course");
  };

  return (
    <div className="card">
      {courses.map((course) => {
        //let courseId = course._id

        return (
          <Card
            key={course._id}
            sx={{
              display: "inline-block",
              margin: 4,
              padding: 10,
              width: 275,
              height: 450,
            }}
          >
            <CardContent>
              <img
                src={require(`./uploads/${course.image}`)}
                alt={course.image}
              />
              <Typography variant="h5" component="div">
                {course.name}
              </Typography>
              <Typography color="red" variant="h7">
                {course.duration}
              </Typography>

              <Typography color="darkcyan" variant="body2">
                {course.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleCourse(course)}
                size="large"
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
};

export default Profile;
