import React from "react";
import { $ } from "jquery";
import Card from "@material-ui/core/Card";

function getSelectionText() {
  var text = "";
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type !== "Control") {
    text = document.selection.createRange().text;
  }
  return text;
}

function thisRespondHightlightText(thisDiv) {
  $(thisDiv).on("mouseup", function() {
    var selectedText = getSelectionText();
    var selectedTextRegExp = new RegExp(selectedText, "g");
    var text = $(this)
      .text()
      .replace(
        selectedTextRegExp,
        "<span class='red'>" + selectedText + "</span>"
      );
    $(this).html(text);
  });
}

onmouseup = function() {
  var sel = document.selection;
  document.execCommand("backColor", false, "chartreuse");
  console.log(window.getSelection());
  console.log(sel);
  window.getSelection().removeAllRanges();
};

export const TextParseChallenge = props => {
  var displayText = getSelectionText();
  return (
    <Card contentEditable>
      <p>Parse this text!</p>
      <p>{displayText}</p>
    </Card>
  );
};
