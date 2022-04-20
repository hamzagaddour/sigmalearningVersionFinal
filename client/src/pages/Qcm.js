import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Box, RadioGroup } from "@mui/material";
import { useSelector } from 'react-redux'

const Qcm = () => {
  const navigate = useNavigate()
  const state = useSelector((state)=> state.chapter.value);
  const chapterId = state.id
  const chapterName = state.name
  const courseId = state.courseId

  const [qcm, setQcm] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [button, setButton] = useState();
  const [score, setScore] = useState(0);
  const [displayScore, setDisplayScore] = useState(false);

  console.log(chapterId)
  console.log(chapterName)
  console.log(courseId)

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:5000/api/getqcm/" + courseId,
    })
      .then(function (response) {
        console.log(response);
        setQcm(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [courseId]);

  const handleQuestion = (qcmId) => {
    //console.log(qcmId);
    let qcmID = qcmId;

    axios({
      method: "GET",
      url: "http://localhost:5000/api/getQuestion/" + qcmID,
    }).then((res) => {
      console.log(res);
      setQuestions(res.data);
      console.log(res.data);

      setButton(
        <Box textAlign="center">
          <Button variant="contained" onClick={(e) => calculateQcmScore(qcmId)}>
            My button
          </Button>
        </Box>
      );
    });
  };

  const handleQuestionResp = (e, questionId, item) => {
    /*
    console.log('pressed radio button')
    console.log(e)
    console.log(e.target.value)*/
    console.log(
      "la question avec id_>> " +
        questionId +
        " a la réponse suivante >> " +
        item.title
    );
    responses.push({ id: questionId, response: item.title });
  };

  const calculateQcmScore = (qcmID) => {
    console.log("handle user response to backed to calculate score");
    console.log(responses);

    var evalData = {
      qcmId: qcmID,
      reps: responses,
    };
    axios({
      method: "POST",
      url: "http://localhost:5000/api/calculateScore",
      data: evalData,
    })
      .then((response) => {
        setScore(response.data.score);
        setDisplayScore(true);
        //navigate('Model')
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {qcm.map((q) => {
        let qcmId = q._id;

        //console.log(qcmId)

        return (
          <div key={q._id}>
            <h3>{q.title}</h3>
            <Button onClick={() => handleQuestion(qcmId)}>Display Qcm</Button>
            <div>
              <form>
                {questions.map((question) => {
                  return (
                    <div key={question._id}>
                      <h4 key={question._id}>{question.title}</h4>
                      <RadioGroup>
                        {question.items.map((item, index) => (
                          <div>
                            <input
                              key={index}
                              type="radio"
                              name={question.title}
                              onChange={(e) =>
                                handleQuestionResp(e, question._id, item)
                              }
                            />
                            <label>{item.title}</label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  );
                })}
                {button}
                <br></br>
                {displayScore ? (
                  <span>
                    <b>{alert("vous avez obtenu "+score+"/20")}</b>
                  </span>
                ) : (
                  <span></span>
                )}
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Qcm;
