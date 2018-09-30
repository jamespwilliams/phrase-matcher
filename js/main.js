function reloadResults() {
	jQuery.get('sayings.txt', function(data) {
    	for (line of data.split("\n")) {
    		$("#results").append("<tr><td>" + line + "</td></tr>");
    	}
	});
}

$(document).ready(reloadResults);
$("#format-go").on('click', reloadResults);