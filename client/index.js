'use strict';

var displayBuffer = '0';
var operator = '';
var firstNumber = 0;
var secondNumber = 0;

$(document).ready(function() {

});

$(document).on('keypress', function(keyCharCode) {
	keyCharCode = String.fromCharCode(keyCharCode.which).toUpperCase();
  var liHit = $('p:contains("' + keyCharCode + '")').closest('li');
  buttonHit(liHit);
  inputHandler(keyCharCode);
});

$('li').click(function() {
  var valueOfClickedButton = $(this).find('p').text();
  buttonHit(this);
  inputHandler(valueOfClickedButton);
});

function buttonHit(button) {
  var originalColor = $(button).css('background-color');
  var newColor = ($(button).hasClass('orangebutton')) ? 'rgba(218, 146, 50, 0.75)' : 'rgba(227, 227, 227, 0.75)';
  $(button).css('background-color', newColor).delay(100).queue(function() {
    $(button).css('background-color', originalColor);
  });
}

function inputHandler(char) {
  if(char.match(/\d/) !== null || char === '.') {
    putNumberInBufferAndDisplay(char);
  }
  else if(char === 13) {
    performOperation();
  }
  switch (char) {
    case 'C':
      clearDisplay();
      break;
    case '+':
      setOperation(char);
      break;
    case '-':
      setOperation(char);
      break;
    case '=':
      performOperation();
      break;
    case '*':

  }
}

function putNumberInBufferAndDisplay(number) {
  if(displayBuffer === '0') {
    displayBuffer = number;
  }
  else if(number === '.') {
    if(displayBuffer.search(/[.]/) <= 0) {
      displayBuffer = displayBuffer.concat(number);
    }
  }
  else {
    displayBuffer = displayBuffer.concat(number);
  }
  $('#displaytext').text(displayBuffer);
}

function clearDisplay() {
  displayBuffer = '0';
  $('#displaytext').text(displayBuffer);
}

function setOperation(oper) {
  firstNumber = parseFloat(displayBuffer);
  operator = oper;
  clearDisplay();
}

function performOperation() {

}
