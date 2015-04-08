'use strict';

var displayBuffer = '0';
var operator = '';
var firstNumber = 0;
var secondNumber = 0;

$(document).ready(function() {

});

$(document).on('keypress', function(keyCharCode) {
	if(keyCharCode.which === 13) {
    performOperation();
  }
  else {
    keyCharCode = String.fromCharCode(keyCharCode.which).toUpperCase();
    keyCharCode = fixKeyboardMapping(keyCharCode);
    var liHit = $('p:contains("' + keyCharCode + '")').closest('li');
    buttonHit(liHit);
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
  if(char.match(/\d/) !== null || char === '.') {
    putNumberInBufferAndDisplay(char);
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
    case 'X':
      setOperation(char);
      break;
    case '&#X00F7;':
      setOperation(char);
      break;
    case '⁺⁄‒':
      negateValue();
      break;
    case '%':
      percentage();
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
  if(displayBuffer.length > 0) {
    firstNumber = parseFloat(displayBuffer);
    operator = oper;
    clearDisplay();
  }
}

function fixKeyboardMapping(keyCharCode) {
  switch(keyCharCode) {
    case "*":
      return 'X';
    case "/":
      return '&#X00F7;'
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
  secondNumber = parseFloat(displayBuffer);
  var result;
  switch (operator) {
    case '+':
      result = firstNumber + secondNumber;
      break;
    case '-':
      result = firstNumber - secondNumber;
      break;
    case 'X':
      result = firstNumber * secondNumber;
      break;
    case '&#X00F7;':
      if(secondNumber !== 0) {
        result = firstNumber / secondNumber;
      }
      else {
        result = "Not a number";
        clearDisplay();
      }
  }
  $('#displaytext').text(result);
  firstNumber = result;
  displayBuffer = String(result);
  secondNumber = 0;
}
