import React, { useState } from "react";
import quiz_categories, { difficulty } from "./selectValues";

function QuizUserSettings(props) {
  const [userSettings, setUserSettings] = useState({
    input: "5",
    category: "",
    difficulty: "",
  });

  // &category=9&difficulty=easy
  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "gameLength") {
      if (value >= 1 && value <= 50) {
        setUserSettings((prevValue) => {
          return {
            ...prevValue,
            input: value,
          };
        });
      }
    } else if (name === "quizCategory") {
      if (value !== "any") {
        setUserSettings((prevValue) => {
          return {
            ...prevValue,
            category: `&category=${value}`,
          };
        });
      } else {
        setUserSettings((prevValue) => {
          return {
            ...prevValue,
            category: "",
          };
        });
      }
    } else if (name === "quizDifficulty") {
      if (value !== "any") {
        setUserSettings((prevValue) => {
          return {
            ...prevValue,
            difficulty: `&difficulty=${value}`,
          };
        });
      } else {
        setUserSettings((prevValue) => {
          return {
            ...prevValue,
            difficulty: "",
          };
        });
      }
    }
  }

  return (
    <div>
      <form>
        <div className="mb-3">
          <label htmlFor="userInput" className="form-label">
            Number of Questions (1-50)
          </label>
          <input
            name="gameLength"
            value={userSettings.input}
            onChange={handleChange}
            type="number"
            className="form-control"
            id="userInput"
          />
        </div>

        <label htmlFor="selectCategory" className="form-label">
          Select Category
        </label>
        <select
          name="quizCategory"
          onChange={handleChange}
          className="form-select"
          id="selectCategory"
        >
          {quiz_categories.map((res) => {
            return (
              <option key={res.id} id={res.id} value={res.id}>
                {res.content}
              </option>
            );
          })}
        </select>

        <label htmlFor="selectDifficulty" className="form-label">
          Select Difficulty
        </label>
        <select
          name="quizDifficulty"
          onChange={handleChange}
          className="form-select"
          id="selectDifficulty"
        >
          {difficulty.map((res) => {
            return (
              <option key={res.id} id={res.id} value={res.level}>
                {res.content}
              </option>
            );
          })}
        </select>

        <button
          onClick={(e) => {
            props.settingsBtn(userSettings);
            e.preventDefault();
          }}
          type="submit"
          className="btn btn-primary mt-5"
        >
          Start Game
        </button>
      </form>
    </div>
  );
}

export default QuizUserSettings;
