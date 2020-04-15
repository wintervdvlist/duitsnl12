import React, {Fragment} from "react";
import ReactDOM from "react-dom";
import Tabletop from "tabletop";
import { TheoryBox } from "./TheoryGrid/TheoryBoxf";
import { Header } from "./Layouts/Header";
import { QuestionBox } from "./TheoryGrid/QuestionBox";
//import { TextParseChallenge } from "./TheoryGrid/TextParseChallenge";
import { HighLighter } from "./TheoryGrid/TextHighlighter2";
import "./styles.scss";

var publicSpreadsheetUrl =
  "https://docs.google.com/spreadsheets/d/1___fIV5Y2UdLvkaeYR7sdgIp_kyQ2-yjb9IzpvXVw2E/edit?usp=sharing";

class ParentWithData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      v0_woorden: [],
      v1_vormleer: [],
      v5_theorie: [],
      v6_parsing: [],
      v6_length: [],
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
          v5_theorie: tabletop.sheets("v5_theorie").all(),
          v6_parsing: tabletop.sheets("v6_parsing").all(),
          v6_length: tabletop.sheets("v6_parsing").all().length
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

    const jsxChunk = 
    (<Fragment>
        <Header />
    <QuestionBox
        onClick={this.nextQ}
        onAnswerReq={this.showA}
        currentAnswer={this.state.shownAnswer}
        currentQuestion={this.state.currentQuestion}
      />
      <TheoryBox
        theoryData={this.state.v5_theorie}
        userWidth={this.state.width}
      />
      </Fragment>)

     if(this.state.v6_length > 0){
      return (
        <div>
          {jsxChunk}
          <HighLighter text="this text" answer = 'text' 
          customClass="highlight" inpData = {this.state.v6_parsing} v6_length = {this.state.v6_length}/>
        </div>
      );
    } else {
      return (   
        <div>
          {jsxChunk}
        </div>
      );
    }
    
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<ParentWithData />, rootElement);
