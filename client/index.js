'use strict';

var displayBuffer = '0';
var operator = '';
var firstNumber = 0, secondNumber = 0;
var subsequentOperation = false;
var maxDisplayChars = 10;
var performOperationStaged = false;

$(document).ready(function() {

});

$(document).on('keypress', function(keyCharCode) {
	if(keyCharCode.which === 13) {
    performOperation();
  }
  else {
    keyCharCode = String.fromCharCode(keyCharCode.which).toUpperCase();
    keyCharCode = fixKeyboardMapping(keyCharCode);
    var listItemHit = $('p:contains("' + keyCharCode + '")').closest('li');
    buttonHit(listItemHit);
    inputHandler(keyCharCode);
  }
});

$('li').click(function() {
  var valueOfClickedButton = $(this).find('p').text();
  buttonHit(this);
  inputHandler(valueOfClickedButton);
});

function buttonHit(button) {
  if($(button).hasClass('orangebutton')) {
    $(button).toggleClass('orangebuttonhit');
    setTimeout(function() { $(button).toggleClass('orangebuttonhit'); }, 75);
  }
  else {
    $(button).addClass('graybuttonhit');
    setTimeout(function() { $(button).toggleClass('graybuttonhit'); }, 75);
  }
}

function inputHandler(char) {
  switch (char) {
    case 'C':
      clearDisplay();
      break;
    case '+':
      setOperation(char);
      break;
    case '&#X02014;': // minus
      setOperation(char);
      break;
    case '=':
      performOperation();
      break;
    case 'X':
      setOperation(char);
      break;
    case '&#X00F7;': //divide
      setOperation(char);
      break;
    case '⁺⁄‒':
      negateValue();
      break;
    case '%':
      percentage();
      break;
    default:
      if(char.match(/\d/) !== null || char.match(/[.]/)) {
        putNumberInBufferAndDisplay(char);
    }
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
  else if(displayBuffer.length >= maxDisplayChars) {
    // do nothing... the display is full
  }
  else {
    displayBuffer = displayBuffer.concat(number);
  }
  $('#displaytext').text(displayBuffer);
}

function clearDisplay() {
  displayBuffer = '0';
  $('#displaytext').text(displayBuffer);
  subsequentOperation = false;
}

function setOperation(oper) {
  if(performOperationStaged === false) {
    if(displayBuffer.length > 0) {
      if(subsequentOperation) {
        secondNumber = parseFloat(displayBuffer);
      }
      else {
        firstNumber = parseFloat(displayBuffer);
      }
      clearDisplay();
    }
  }
  operator = oper;
  performOperationStaged = true;
}

function fixKeyboardMapping(keyCharCode) {
  switch(keyCharCode) {
    case '*':
      return 'X';
    case '/':
      return '&#X00F7;'; //divide
    case '-':
      return '&#X02014;'; // minus
    default:
      return keyCharCode;
  }
}

function negateValue() {
  if(displayBuffer.search(/[-]/) < 0) {
    displayBuffer = '-'.concat(displayBuffer);
  }
  else {
    displayBuffer = displayBuffer.substr(1, displayBuffer.length);
  }
  $('#displaytext').text(displayBuffer);
}

function percentage() {
  var pct = parseFloat(displayBuffer);
  pct /= 100;
  displayBuffer = String(pct);
  $('#displaytext').text(displayBuffer);
}

function performOperation() {
  if(!subsequentOperation) {
    secondNumber = parseFloat(displayBuffer);
  }
  var result;
  switch (operator) {
    case '+':
      result = firstNumber + secondNumber;
      break;
    case '&#X02014;': // minus
      result = firstNumber - secondNumber;
      break;
    case 'X':
      result = firstNumber * secondNumber;
      break;
    case '&#X00F7;': //divide
      if(secondNumber !== 0) {
        result = firstNumber / secondNumber;
      }
      else {
        result = 'Divide by 0';
        clearDisplay();
      }
  }
  $('#displaytext').text(result);
  firstNumber = result;
  displayBuffer = '0';
  subsequentOperation = true;
  performOperationStaged = false;
}
