$(document).ready(function(){

	togglePublicationContent();

	generateBibTexForPublication();

});

function generateBibTexKey(title, author, year){
	return camelize(author.split(",")[0].replace(".", "") + year + title.split(":")[0]);
}

function camelize(str) {
	return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
		if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
		return index == 0 ? match.toLowerCase() : match.toUpperCase();
	});
}

function togglePublicationContent(){
	$(".toggle-summary-btn").click(function(){
		var $that = $(this);
		$(this).parent().siblings(".toggle-summary").slideToggle(function(){
			if(!$that.parent().siblings(".toggle-summary").is(":hidden")){
				$that.removeClass("fa-plus").addClass("fa-minus");
			}
			else{
				$that.removeClass("fa-minus").addClass("fa-plus");	
			}
		});
	});
}

function generateBibTexForPublication(){
	$(".bibtex-link").click(function(e){
		e.preventDefault();
		e.stopPropagation();

		$("#bibtex-dialog").dialog();
		if(!parseInt($(this).data("bibtex-available"))){
			var author = $(this).data("author-field");
			var title = $(this).data("title-field");
			var year = $(this).data("year-field");
			var booktitle = $(this).data("booktitle-field");

			var bibtex_string = 
							"@inproceedings{{0},<br>\
							title={{1}},<br>\
							author={{2}},<br>\
							booktitle={{3}},<br>\
							year={{4}} }".format(generateBibTexKey(title, author, year),title, author, booktitle, year);

			$("#bibtex-dialog").html(bibtex_string);
		}

		return false;
	});
}

String.prototype.format = function() {
	a = this;
	for (k in arguments) {
		a = a.replace("{" + k + "}", arguments[k]);
	}
	return a;
}