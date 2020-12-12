const reader = new FileReader()

function read(input) {
	const csv = input.files[0]
	reader.readAsText(csv)
}

function changeDOM(domElement, innerHTML) {
	document.getElementById(domElement).innerHTML = innerHTML
}

function addRow(list) {

}

reader.onload = function (e) {
	// Grabs all information from csv file
	var content = e.target.result;
	// document.querySelector('.output').innerText = content;
	console.log(content);
	content = content.replace(/(\r\n|\n|\r)/gm, ",");
	var ArrayContent = content.split(',');
	ArrayContent = ArrayContent.filter(function (el) {
		return el != "";
	});

	var Timesheet = ArrayContent.splice(12);

	var InvoiceNo = ArrayContent[1];
	var HourlyRate = ArrayContent[3];
	var Recipent = ArrayContent[5];
	var From = ArrayContent[7];
	var TotalCost = 0;

	var TimesheetCells = Array();
	while(Timesheet.length != 0) {
		var element = Timesheet.splice(0, 4);
		var hours = (element[3]);
		var rate = (HourlyRate);
		var cost = hours * rate;
		TotalCost += cost;

		element.push(cost);
		TimesheetCells.push(element);
	}
	console.log(TimesheetCells);

	// Manpulates inner html of all DOM objects 
	changeDOM("CompanyTitle", "Sam Siggs");
	changeDOM("InvoiceTitle", "Tax Invoice # " + InvoiceNo);
	changeDOM("InvoiceDate", "Date: Dec 12, 2020");
	changeDOM("BillTo", "Bill To: OnionCRM");
	changeDOM("BalanceDue", "Balance Due: $"+parseFloat(TotalCost).toFixed(2));

	var table = document.getElementById("InvoiceItems");
	var header = table.createTHead();
	var row = header.insertRow(0);
	row.insertCell(0).innerHTML = "<b>Item</b>";
	row.insertCell(1).innerHTML = "<b>Quantity</b>";
	row.insertCell(2).innerHTML = "<b>Rate</b>";
	row.insertCell(2).innerHTML = "<b>Amount</b>";


	// addRow(table, TimesheetCells[0]);
	var list = TimesheetCells[0];
	row = table.insertRow(1);
	list = list.reverse();
	list.forEach(e => row.insertCell(0).innerHTML = e);
}