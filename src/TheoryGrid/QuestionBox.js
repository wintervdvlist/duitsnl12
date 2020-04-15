import React from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export const QuestionBox = props => {
  return (
    <Card>
      <Button variant="contained" type="button" onClick={props.onClick}>
        Next question
      </Button>
      <p>{props.currentQuestion}</p>
      <Button variant="contained" type="button" onClick={props.onAnswerReq}>
        Show Answer
      </Button>
      <p>{props.currentAnswer}</p>
      <form noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Enter answer"
          variant="outlined"
        />
      </form>
    </Card>
  );
};
