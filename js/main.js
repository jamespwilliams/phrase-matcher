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

	/*if (!validator.exec(formatString)) {
		return null;
	}*/

	let regexString = "^";

	for (character of formatString) {
		if (character == ',') {
			regexString += ' ';
			continue;
		} else if (character == '*') {
			regexString += '.';
			continue;
		}

		let num = parseInt(character);
		if (!isNaN(num)) {
			regexString += "[a-zA-Z]{" + num + "}";
		} else {
			// Just append the character
			regexString += character;
		}
	}

	regexString += "$";	
	return new RegExp(regexString, "gmi");
}

function loadResultsForFormat(formatString) {
	clearErrors();

	$("#results").empty();

	let formatRegex = getFormatRegex(formatString);

	console.log(formatRegex);

	if (formatRegex == null) {
		displayError("Invalid format");
		return;
	}

	jQuery.get('sayings.txt', function(data) {
		while (match = formatRegex.exec(data)) {
			$("#results").append("<tr><td>" + match + "</td></tr>");

			if (formatRegex.lastIndex == match.lastIndex) {
				formatRegex.lastIndex++;
			}
		}
	});
}

function reloadResults() {
	let formatString = $("#format-input").val();

	loadResultsForFormat(formatString);
}

function loadPlaceholderResults() {
	loadResultsForFormat("4,3,3");
}


$(document).ready(loadPlaceholderResults);
$("#format-go").on('click', reloadResults);

let isHidden = true;

$("#examples").hide();

$("#show-examples").click(function() {
	isHidden = !isHidden;
	if (isHidden) {
		$("#examples").fadeOut();
		$("#show-examples").text("Show More Information");
	} else {
		$("#examples").fadeIn();
		$("#show-examples").text("Hide Information");
	}
});
