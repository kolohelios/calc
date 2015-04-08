'use strict';

$(document).ready(function() {

});

$(document).on('keypress', function(keyCharCode) {
	var char = String.fromCharCode(keyCharCode.which).toLowerCase();
  console.log(char);
});

$('li').click(function() {
  console.log($(this).find('p').text());
});
