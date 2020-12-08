const reader = new FileReader()

function read(input) {
	const csv = input.files[0]
	reader.readAsText(csv)
}

reader.onload = function (e) {
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

	var timesheetjson = "";

	TimesheetCells.forEach(function(e) {
		timesheetjson += '['+e+'],';
	});

	// console.log(timesheetjson);
	
	var json = '{ "InvoiceNo":' + InvoiceNo  + ','+
				' "HourlyRate":' + HourlyRate + ','+
				' "Recipent":' + Recipent + ',' +
				' "From":' + From + ','+
				' "Timesheets": [' + timesheetjson + '],'+
				' "TotalCost":' + TotalCost + ']}';
	console.log(json);
	console.log(JSON.parse(json)); 
}