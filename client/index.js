'use strict';

var displayText = '0';
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
  if(displayText === '0') {
    displayText = number;
		$('#calcclear').text('C');
  }
  else if(displayText.length >= maxDisplayChars) {
    // do nothing... the display is full
  }
  else {
    displayText = displayText.concat(number);
  }
  $('#displaytext').text(displayText);
}

function handleDecimal () {
	if(displayText.indexOf('.') === -1) {
		displayText = displayText + '.';
	}
	$('#displaytext').text(displayText);
}

function clearDisplay(clearButton) {
  displayText = '0';
  $('#displaytext').text(displayText);
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
    if(displayText.length > 0) {
      if(subsequentOperation) {
        secondNumber = parseFloat(displayText);
      }
      else {
        firstNumber = parseFloat(displayText);
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
  if(displayText !== '0') {
		if(displayText.indexOf('-') === -1) {
	    displayText = '-'.concat(displayText);
	  }
	  else {
	    displayText = displayText.substr(1, displayText.length);
	  }
	  $('#displaytext').text(displayText);
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
		var pct = parseFloat(displayText);
	  pct /= 100;
	  displayText = String(pct);
	  $('#displaytext').text(displayText);
	}
	else {
		firstNumber /= 100;
		$('#displaytext').text(firstNumber);
	}
}

function performOperation() {
  if(displayText.slice(-1) === '.') {
		displayText = displayText.subst(0, displayText.length - 1);
	}
	if(!subsequentOperation) {
    secondNumber = parseFloat(displayText);
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
        result = 'Not a number';
				mustClearAfterDivideByZero = true;
      }
  }
  $('#displaytext').text(result);
  firstNumber = result;
  displayText = '0';
  subsequentOperation = true;
  performOperationStaged = false;
}
