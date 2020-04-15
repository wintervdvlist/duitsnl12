import React from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

export class TheoryBox extends React.Component {
  render() {
    const styling = {
      root: {},
      gridList: {},
      theorygridtile: {
        margin: "5px",
        padding: "10px",
        border: "2px dotted black",
        backgroundColor: "darkgrey"
      }
    };

    const theoryData = this.props.theoryData;
    const userWidth = this.props.userWidth;
    let nrCols;
    if (userWidth > 1200) {
      nrCols = 12;
    } else if (userWidth > 1000) {
      nrCols = 10;
    } else if (userWidth > 800) {
      nrCols = 8;
    } else {
      nrCols = 6;
    }

    console.log("userWidth ", userWidth);
    console.log("nrCols ", nrCols);

    return (
      <div style={styling.root}>
        <GridList cellHeight="auto" style={styling.gridList} cols={nrCols}>
          {theoryData.map(function(tcard) {
            let hasicon = tcard.iconsrc !== "";
            let gridtype;
            if (hasicon) {
              gridtype = "tgridwicon";
            } else {
              gridtype = "tgridwithouticon";
            }
            return (
              <GridListTile
                style={styling.theorygridtile}
                key={tcard.key}
                cols={parseInt(tcard.cols, 10) || 1}
              >
                <div className={gridtype}>
                  <div className="tgridheader">
                    <h1>{tcard.theoryclass}</h1>
                    <h2>{tcard.title}</h2>
                  </div>
                  <div className="tgridicon">
                    <img src={tcard.iconsrc} alt="" className="theoryicon" />
                  </div>
                  <div className="tgridtext">
                    <p>{tcard.text}</p>
                  </div>
                </div>
              </GridListTile>
            );
          })}
        </GridList>
      </div>
    );
  }
}
