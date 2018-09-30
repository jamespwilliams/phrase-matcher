function getInputRegex() {
	let formatString = $("#format-input").val();

	let validator = /^(?:[0-9]+[,-]?)*$/gm;
	if (validator.exec(formatString)) {
		console.log("Valid");
	} else {
		console.log("Invalid");
	}
}

function reloadResults() {

	getInputRegex();
	return;


	jQuery.get('sayings.txt', function(data) {
    	for (line of data.split("\n")) {
    		$("#results").append("<tr><td>" + line + "</td></tr>");
    	}
	});
}

$(document).ready(reloadResults);
$("#format-go").on('click', reloadResults);