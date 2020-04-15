import React from "react";
import ReactDOM from "react-dom";
import Tabletop from "tabletop";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

var publicSpreadsheetUrl =
  "https://docs.google.com/spreadsheets/d/1___fIV5Y2UdLvkaeYR7sdgIp_kyQ2-yjb9IzpvXVw2E/edit?usp=sharing";

class QuestionBox extends React.Component {
  render() {
    return (
      <div>
        <button type="button" onClick={this.props.onClick}>
          Next question
        </button>
        <p>{this.props.currentQuestion}</p>
        <button type="button" onClick={this.props.onAnswerReq}>
          Show Answer
        </button>
        <p>{this.props.currentAnswer}</p>
      </div>
    );
  }
}

class TheoryBox extends React.Component {
  render() {
    const styling = {
      root: {},
      gridList: {}
    };

    const theoryData = this.props.theoryData;
    const userWidth = this.props.userWidth;
    let nrCols;
    if (userWidth > 1200) {
      nrCols = 6;
    } else if (userWidth > 1000) {
      nrCols = 5;
    } else if (userWidth > 800) {
      nrCols = 4;
    } else {
      nrCols = 3;
    }

    console.log("userWidth ", userWidth);
    console.log("nrCols ", nrCols);

    return (
      <div style={styling.root}>
        <GridList cellHeight="auto" style={styling.gridList} cols={nrCols}>
          {theoryData.map(function(tcard) {
            return (
              <GridListTile
                key={tcard.key}
                cols={parseInt(tcard.cols, 10) || 1}
              >
                <h1>{tcard.theoryclass}</h1>
                <h2>{tcard.title}</h2>
                <p>{tcard.text}</p>
              </GridListTile>
            );
          })}
        </GridList>
      </div>
    );
  }
}

class ParentWithData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      v0_woorden: [],
      v1_vormleer: [],
      v5_theorie: [],
      width: 0,
      height: 0,
      questionCounter: 0,
      currentQuestion: "",
      currentAnswer: "",
      answerVisible: false,
      shownAnswer: ""
    };
    this.nextQ = this.nextQ.bind(this);
    this.showA = this.showA.bind(this);
    //this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    Tabletop.init({
      key: publicSpreadsheetUrl,
      callback: (data, tabletop) => {
        //console.log('tabletop0 --->', tabletop.sheets("v0_woorden").all()[questionCounter].nederlands);
        this.setState({
          data: data,
          v0_woorden: tabletop.sheets("v0_woorden").all(),
          v1_vormleer: tabletop.sheets("v1_vormleer").all(),
          v5_theorie: tabletop.sheets("v5_theorie").all()
        });
        return null;
      },
      simpleSheet: false
    });
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  handleResize = () =>
    this.setState({
      width: window.innerHeight,
      height: window.innerWidth
    });

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  nextQ() {
    const intCounter = this.state.questionCounter + 1;
    const questionRow = this.state.v0_woorden[intCounter];
    this.setState({
      questionCounter: intCounter,
      currentQuestion: questionRow.nederlands,
      currentAnswer: questionRow.duits,
      answerVisible: false,
      shownAnswer: ""
    });
  }

  showA() {
    this.setState({
      answerVisible: true,
      shownAnswer: this.state.currentAnswer
    });
  }

  render() {
    console.log("userwidth level 0 ", this.state.width);

    return (
      <div>
        <div>
          <QuestionBox
            onClick={this.nextQ}
            onAnswerReq={this.showA}
            currentAnswer={this.state.shownAnswer}
            currentQuestion={this.state.currentQuestion}
          />
        </div>
        <TheoryBox
          theoryData={this.state.v5_theorie}
          userWidth={this.state.width}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<ParentWithData />, rootElement);
