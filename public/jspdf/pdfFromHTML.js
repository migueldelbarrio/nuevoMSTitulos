function pdfToHTML(){

var pdf = new jsPDF('p','pt','letter');

source = $('#pdf2htmldiv')[0];

specialElementsHandlers = {

	'#bypassme': function(element,renderer){
		return true
		}
	}
margins = {
	
	top:50,
	left:60,
	width:545
};

pdf.fromHTML(source, margins.left,margins.top,
{'width':margins.width,'elementHandlers':specialElementsHandlers},
function (dispose){
	pdf.save('b.pdf');



}


)

}
	










