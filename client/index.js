'use strict';

var displayBuffer = '0';
var operator = '';
var firstNumber = 0, secondNumber = 0;
var subsequentOperation = false;
var maxDisplayChars = 10;
var mustClearAfterDivideByZero = false;
var performOperationStaged = false;

$(document).ready(init);

function init() {
	$(document).on('keypress', function(keyCharCode) {
		if(keyCharCode.which === 13) {
			buttonHit($('#lastrowbox'));
	    inputHandler('=');
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
}

function buttonHit(button) {
  if($(button).hasClass('orangebutton')) {
    $(button).toggleClass('orangebuttonhit');
    setTimeout(function() { $(button).toggleClass('orangebuttonhit'); }, 100);
  }
  else {
    $(button).addClass('graybuttonhit');
    setTimeout(function() { $(button).toggleClass('graybuttonhit'); }, 100);
  }
}

function inputHandler(char) {
	if(mustClearAfterDivideByZero) {
		clearDisplay(true);
		mustClearAfterDivideByZero = false;
	}
	console.log(char);
  if((char === 'C') || (char === 'AC')) {
		clearDisplay(true);
	}
	switch (char) {
    case '.':
			handleDecimal();
			break;
    case '+':
      setOperation(char);
      break;
    case '—':
      setOperation(char);
      break;
    case '=':
      performOperation();
      break;
    case 'X':
      setOperation(char);
      break;
    case '÷':
      setOperation(char);
      break;
    case '⁺⁄‒':
      negateValue();
      break;
    case '%':
      percentage();
      break;
    default:
      if(char.match(/\d/) !== null) {
        putNumberInBufferAndDisplay(char);
    	}
		}
}

function putNumberInBufferAndDisplay(number) {
  if(displayBuffer === '0') {
    displayBuffer = number;
		$('#calcclear').text('C');
  }
  else if(displayBuffer.length >= maxDisplayChars) {
    // do nothing... the display is full
  }
  else {
    displayBuffer = displayBuffer.concat(number);
  }
  $('#displaytext').text(displayBuffer);
}

function handleDecimal () {
	if(displayBuffer.indexOf('.') === -1) {
		displayBuffer = displayBuffer + '.';
	}
	$('#displaytext').text(displayBuffer);
}

function clearDisplay(clearButton) {
  displayBuffer = '0';
  $('#displaytext').text(displayBuffer);
	if (clearButton) {
		$('#calcclear').text('AC');
		firstNumber = 0;
		secondNumber = 0;
		operator = 0;
		mustClearAfterDivideByZero = false;
	}
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
      return '÷'; //divide
    case '-':
      return '—'; // minus
    default:
      return keyCharCode;
  }
}

function negateValue() {
  if(displayBuffer !== '0') {
		if(displayBuffer.indexOf('-') === -1) {
	    displayBuffer = '-'.concat(displayBuffer);
	  }
	  else {
	    displayBuffer = displayBuffer.substr(1, displayBuffer.length);
	  }
	  $('#displaytext').text(displayBuffer);
	}
	else {
		if(subsequentOperation) {
			firstNumber *= -1;
			$('#displaytext').text(firstNumber);
		}
	}
}

function percentage() {
  if(!subsequentOperation) {
		var pct = parseFloat(displayBuffer);
	  pct /= 100;
	  displayBuffer = String(pct);
	  $('#displaytext').text(displayBuffer);
	}
	else {
		firstNumber /= 100;
		$('#displaytext').text(firstNumber);
	}
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
    case '—':
      result = firstNumber - secondNumber;
      break;
    case 'X':
      result = firstNumber * secondNumber;
      break;
    case '÷':
      if(secondNumber !== 0) {
        result = firstNumber / secondNumber;
      }
      else {
        result = 'Divide by 0';
				mustClearAfterDivideByZero = true;
      }
  }
  $('#displaytext').text(result);
  firstNumber = result;
  displayBuffer = '0';
  subsequentOperation = true;
  performOperationStaged = false;
}
