import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [number, setNumber] = useState(Math.floor(Math.random() * 10) + 1);
  const [guess, setGuess] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorType, setErrorType] = useState("");
  const [live, setLive] = useState(3);
  const handleSubmit = (e) => {
    console.log(number);
    const inputGuess = parseInt(guess);
    e.preventDefault();
    if (guess == "") {
      setError(true);
      setErrorType("empty");
      setErrorMessage("Can't be empty!");
      setGuess("");
      setTimeout(() => {
        setError(false);
        setErrorType("");
        setErrorMessage("");
      }, 1000);
    } else {
      if (inputGuess < 1 || inputGuess > 10) {
        setError(true);
        setErrorType("notBetween");
        setErrorMessage("Input must be between 1-10");
        setGuess("");
        setTimeout(() => {
          setError(false);
          setErrorType("");
          setErrorMessage("");
        }, 1000);
      } else if (inputGuess == number) {
        setError(true);
        setErrorType("success");
        setErrorMessage("You guessed it!");
        setGuess("");
        reset();
        setTimeout(() => {
          setError(false);
          setErrorType("");
          setErrorMessage("");
        }, 1000);
      } else {
        setError(true);
        setErrorType("wrong");
        setErrorMessage(`You guessed it wrong! You've ${live - 1} guess.`);
        setGuess("");
        setLive(live - 1);
        if (live == 1) {
          setError(true);
          setErrorType("finish");
          setErrorMessage(
            `You couldn't guess it in 3 times. The number was ${number}`
          );
          setGuess("");
          reset();
          setTimeout(() => {
            setError(false);
            setErrorType("");
            setErrorMessage("");
          }, 1000);
        }
        setTimeout(() => {
          setError(false);
          setErrorType("");
          setErrorMessage("");
        }, 1000);
      }
    }
  };

  const reset = () => {
    setNumber(Math.floor(Math.random() * 10) + 1);
    setLive(3);
  };
  return (
    <div className="App">
      <h1>Guess Game</h1>
      <p style={{ marginTop: "1rem" }}>
        Guess number between <span className="badge bg-primary">1</span> and{" "}
        <span className="badge bg-success">10</span>
      </p>
      <p style={{ marginTop: "1rem" }}>
        You've <span className="badge bg-warning">{live}</span> guess.
      </p>
      <form style={{ width: "50%", marginTop: "1rem" }} onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Enter your guess"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            paddingTop: "1rem",
          }}
        >
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={reset}
          >
            Reset Game
          </button>
        </div>
      </form>
      <div style={{ width: "50%", marginTop: "2rem" }}>
        {error && errorType == "empty" ? (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        ) : null}
        {error && errorType == "notBetween" ? (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        ) : null}
        {error && errorType == "wrong" ? (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        ) : null}
        {error && errorType == "finish" ? (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        ) : null}
        {error && errorType == "success" ? (
          <div className="alert alert-success" role="alert">
            {errorMessage}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
