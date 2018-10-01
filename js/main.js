function displayError(message) {
	$("#format-error").text(message);
}

function clearErrors() {
	displayError("");
}

/*
	Transforms a crossword style format to a regex
	e.g: 3,3 -> /^... ...$/
*/
function getFormatRegex(formatString) {
	let validator = /^(?:[0-9]+[,-]?)*$/gm;

	if (!validator.exec(formatString)) {
		return null;
	} else {
		return /^..............$/;
	}
}

function reloadResults() {
	clearErrors();

	let formatString = $("#format-input").val();

	let formatRegex = getFormatRegex(formatString);

	console.log(formatRegex);

	if (formatRegex == null) {
		displayError("Invalid format");
	}

	return;

	jQuery.get('sayings.txt', function(data) {
    	for (line of data.split("\n")) {
    		$("#results").append("<tr><td>" + line + "</td></tr>");
    	}
	});
}

$(document).ready(reloadResults);
$("#format-go").on('click', reloadResults);