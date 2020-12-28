const reader = new FileReader()

function read(input) {
	const csv = input.files[0]
	reader.readAsText(csv)
}

function changeDOM(domElement, innerHTML) {
	// Get the specific html element by the assigned id
	document.getElementById(domElement).innerHTML = innerHTML
}

reader.onload = function (e) {
	// Grabs all information from csv file
	var content = e.target.result;

	// format the content to allow easier manuplation
	content = content.replace(/(\r\n|\n|\r)/gm, ",");
	var ArrayContent = content.split(',');
	ArrayContent = ArrayContent.filter(function (el) {
		return el != "";
	});

	// Grabs all of the relavent information and casts it to varibles
	var Timesheet = ArrayContent.splice(11);

	var InvoiceNo = ArrayContent[1];
	var Recipent = ArrayContent[5];
	var From = ArrayContent[7];
	var TotalCost = 0;

	// Calculates total cost of everything
	var TimesheetCells = Array();
	while(Timesheet.length != 0) {
		var element = Timesheet.splice(0, 5);
		var hours = (element[3]);
		var rate = (element[4]);
		var cost = hours * rate;
		TotalCost += cost;

		element.push(cost);
		TimesheetCells.push(element);
	}
	console.log(TimesheetCells);

	// Manpulates inner html of all DOM objects
	// The DOM objects can all be found in the index.html file.
	// In this context the changeDOM only manuplates div elements with an ID
	changeDOM("CompanyTitle", "Sam Siggs");
	changeDOM("InvoiceTitle", "Tax Invoice # " + InvoiceNo);
	changeDOM("InvoiceDate", "Date: Dec 12, 2020");
	changeDOM("BillTo", "Bill To: OnionCRM");
	changeDOM("BalanceDue", "Balance Due: $"+parseFloat(TotalCost).toFixed(2));

	// Creating a table to display all of the times
	var table = document.getElementById("InvoiceItems");
	var header = table.createTHead();
	var row = header.insertRow(0);
	row.insertCell(0).innerHTML = "<b>Date</b>";
	row.insertCell(1).innerHTML = "<b>Item</b>";
	row.insertCell(2).innerHTML = "<b>Description</b>";
	row.insertCell(3).innerHTML = "<b>Quantity</b>";
	row.insertCell(4).innerHTML = "<b>Rate</b>";
	row.insertCell(5).innerHTML = "<b>Amount</b>";


	// Adding the timesheet elements to the html table
	for (var i = 0; i < TimesheetCells.length; i++) {
			var list = TimesheetCells[i];
			row = table.insertRow(i+1);
			list = list.reverse();
			list.forEach(e => row.insertCell(0).innerHTML = e);
	}

}
