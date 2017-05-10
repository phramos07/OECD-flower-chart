// Initialize variables
var container,
		wrap,
		width=100,
		height=100,
		countries ={},
		data,
		colorScale,
		xScale,
		yScale,
		x_axis,
		y_axis,
		petalSize = {},
		petalsScale ={},
		margin = { top: 0, left: 0, right: 10, bottom: 20};

//After document is ready
$(document).ready(function() {

	//initialize the variables 
	initialize();
	
	//create SVG and inner group
	create();

	//get data from CSV
	d3.json("./data/countries.json", function(error, dataCountries) {

		//map countries as hash
		mapCountries(dataCountries);

		//Get data out of csv
		d3.csv("./data/data.csv", function(error, csvData) {
			
			//set data
			data = csvData;
		
			//map data
			mapData(data);

			//update x scale
			updateXScale();

			//update y scale
			updateYScale();

			//update Petals scales
			updatePetalsScale();

			//create X axis
			createXAxis();

			//create Y axis
			createYAxis();

			//Draw elements
			draw();

		})

	});

});