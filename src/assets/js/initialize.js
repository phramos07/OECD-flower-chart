//initialize variables
initialize = function() {

	//get container
	container = {
		selector: "#visualization", 
		d3: d3.select("#visualization"),
		jq: $("#visualization")};

	//set container height
	container.jq.css('height', ($(window).outerHeight() - container.jq.offset().top - 20) + "px");

	//get width, height and margins
	width = container.jq.outerWidth() - (margin.left + margin.right);
	height = container.jq.outerHeight() - (margin.top + margin.bottom);

	//set color scale
	colorScale = d3.scaleOrdinal(d3.schemeCategory10);

	//set scales
	xScale = d3.scaleBand().range([0, width]).padding(0.1);
	console.log(xScale);
	yScale = d3.scaleLinear().range([height, 0]);
		console.log(yScale);

}

//map countries as hash
mapCountries = function(data) {

	//set countries as hash
	data.forEach(function(d) { countries[d.code] = d; });

}

mapData = function(data) {

	//set Mean
	data.forEach(function(d) {

		//get values
		var values = Object
			.keys(d)
			.filter(function(k) { return k !== "country"; })
			.map(function(k) { return +d[k]; });

		//set mean, median, max and min
		d.mean = d3.mean(values);
		d.median = d3.median(values);
		d.max = d3.max(values);
		d.min = d3.min(values);

	})

}