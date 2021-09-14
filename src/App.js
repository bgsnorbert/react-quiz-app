import React, { useState, useEffect } from "react";
import QuizUserSettings from "./components/quizUserSettings";

function App() {
  const [quizData, setQuizData] = useState([]);
  const [quizSettings, setQuizSettings] = useState({
    input: "5",
    category: "",
    difficulty: "",
  });
  const [count, setCount] = useState(0);
  const [gameStart, setGameStart] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState([]);
  const [scoreCount, setScoreCount] = useState(0);

  let API_URL = `https://opentdb.com/api.php?amount=${quizSettings.input}${quizSettings.category}${quizSettings.difficulty}&type=multiple`;

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(API_URL);
      let data = await response.json();
      setQuizData(data.results);
      // console.log(data.results);
    }
    fetchMyAPI();
  }, [API_URL, quizSettings]);

  function handleQuizSettings(userSettings) {
    setQuizSettings(userSettings);
    setGameStart(true);
  }

  let randomArray = [];
  if (quizData.length > 0) {
    randomArray = [
      quizData[count].correct_answer,
      ...quizData[count].incorrect_answers,
    ].sort(() => Math.random() - 0.5);
    // let newarray = [...randomArray];
    // console.log(randomArray);
    // console.log(newarray);
  }

  function nextQuestion(e) {
    const eventValue = e.target.value;
    // if(quizData.length > 0) {
    setScore((prevValue) => {
      return [
        ...prevValue,
        {
          question: quizData[count].question,
          correctAns: quizData[count].correct_answer,
          userAns: eventValue,
          // wrongAns: [quizData[count].incorrect_answers],
          allAns: randomArray,
        },
      ];
    });
    // }
    if (eventValue === quizData[count].correct_answer) {
      setScoreCount(scoreCount + 1);
    }
    const countPlus = count + 1;
    // console.log(eventValue);
    if (countPlus < quizData.length) {
      setCount(count + 1);
    } else {
      setShowScore(true);
    }
  }

  function handleResetBtn() {
    setScoreCount(0);
    setScore([]);
    setCount(0);
    setQuizData([]);
    setQuizSettings({
      input: "5",
      category: "",
      difficulty: "",
    });
    setGameStart(false);
    setShowScore(false);
  }

  return (
    <div className="container App mt-5">
      {showScore ? (
        <div className="row">
          <h5>Your score is: {`${scoreCount}/${quizData.length}`}</h5>
          {score.map((res) => {
            return (
              <div>
                <h3
                  className="my-3 mt-5 text-center"
                  dangerouslySetInnerHTML={{
                    __html: res.question,
                  }}
                />
                <div className="row">
                  {res.allAns.map((re) => {
                    return (
                      <div className="col-6 my-1 text-center">
                        {re === res.correctAns && re === res.userAns ? (
                          <span>
                            <div
                              className="d-inline-block my-1 text-success"
                              dangerouslySetInnerHTML={{
                                __html: re,
                              }}
                            />
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="32"
                              fill="currentColor"
                              class="bi bi-check ms-2 d-inline-block text-success"
                              viewBox="0 0 16 16"
                            >
                              <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                            </svg>
                          </span>
                        ) : re.includes(res.userAns) ? (
                          <span>
                            <div
                              className="d-inline-block my-1 text-danger"
                              dangerouslySetInnerHTML={{
                                __html: re,
                              }}
                            />
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="32"
                              fill="currentColor"
                              class="bi bi-x ms-2 d-inline-block text-danger"
                              viewBox="0 0 16 16"
                            >
                              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                          </span>
                        ) : re.includes(res.correctAns) ? (
                          <div
                            className=" my-1 text-success"
                            dangerouslySetInnerHTML={{
                              __html: re,
                            }}
                          />
                        ) : (
                          <div
                            className="my-1"
                            dangerouslySetInnerHTML={{
                              __html: re,
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <button
            onClick={handleResetBtn}
            className="my-5 w-25 text-center mx-auto"
          >
            New Game
          </button>
        </div>
      ) : (
        <div>
          {gameStart ? (
            <div>
              {quizData.length > 0 ? (
                <div>
                  <span>Category: {quizData[count].category}</span>
                  <br />
                  <span>Difficulty: {quizData[count].difficulty}</span>
                  <br />
                  <span>{`${count + 1}/${quizData.length}`}</span>
                  <br />
                  <button
                    onClick={handleResetBtn}
                    type="button"
                    className="btn btn-outline-info text-white my-1"
                  >
                    reset game
                  </button>
                  <h2 className="text-center"
                    dangerouslySetInnerHTML={{
                      __html: quizData[count].question,
                    }}
                  />
                  <div className="row mt-5">
                    {randomArray.map((res, index) => {
                      return (
                        <div key={index} className="col-6 text-center">
                          <button
                            value={res}
                            onClick={nextQuestion}
                            dangerouslySetInnerHTML={{ __html: res }}
                            className="btn btn-info ans my-2"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div
                  className="spinner-border text-white text-center"
                  role="status"
                >
                  <span className="sr-only"></span>
                </div>
              )}
            </div>
          ) : (
            <div className="row">
              <div className="col text-center mt-5">
                <QuizUserSettings settingsBtn={handleQuizSettings} />
              </div>
            </div>
          )}

          <div className="row mt-5"></div>
        </div>
      )}
    </div>
  );
}

export default App;
