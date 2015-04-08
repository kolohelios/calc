'use strict';

var displayBuffer = '0';

$(document).ready(function() {

});

$(document).on('keypress', function(keyCharCode) {
	keyCharCode = String.fromCharCode(keyCharCode.which).toLowerCase();
  inputHandler(keyCharCode);
});

$('li').click(function() {
  $(this).css('background-color', 'gray').delay('fast').
  inputHandler($(this).find('p').text());
});

function inputHandler(char) {
  console.log($(this).parent('li'));
  if(char.match(/\d/) !== null || char === '.') {
    putNumberInBufferAndDisplay(char);
  }
  switch (char) {
    case 'c':
      clearDisplay();
      break;
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
  displayBuffer = 0;
  $('#displaytext').text(displayBuffer);
}
