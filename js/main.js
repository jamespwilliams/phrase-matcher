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
	}
	


	return /^.... ... ...$/gm;
}

function reloadResults() {
	clearErrors();

	let formatString = $("#format-input").val();

	let formatRegex = getFormatRegex(formatString);

	console.log(formatRegex);

	if (formatRegex == null) {
		displayError("Invalid format");
		return;
	}

	jQuery.get('sayings.txt', function(data) {

		console.log(data);

		while (match = formatRegex.exec(data)) {
			console.log(match);

			$("#results").append("<tr><td>" + match + "</td></tr>");

			if (formatRegex.lastIndex == match.lastIndex) {
				formatRegex.lastIndex++;
			}
		}
	});
}

$(document).ready(reloadResults);
$("#format-go").on('click', reloadResults);