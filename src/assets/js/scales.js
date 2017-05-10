
//update x scale
var updateXScale = function() {

	xScale
		.domain(data.map(function(d) { return d.country; }))
		// .sort(function(a,b) { return d3.ascending(countries[a].pt, countries[b].pt); });

}


//update y scale
var updateYScale = function() {

	//initialize variables
	var min = 99999999,
			max = 0;

	//get min and max from metrics median 
	data.forEach(function(d) {

		//get Mean value
		var value =  d3.mean(Object
														.keys(d)
														.filter(function(k) { return k !== "country"; })
														.map(function(k) { return +d[k]; }));

		//update min and max
		if (value < min) { min = value; }
		if (value > max) { max = value; }

		//set diff
		if (max - min < 0.01) { max = min + 0.01};

		yScale.domain([0,1]);

	 });
}

//update petal scale
var updatePetalsScale = function() {

	//get metrics
	var metrics = Object.keys(data[0]).filter(function(k) { return k !== "country"; });

	//Initialize petalsScale
	metrics.forEach(function(k) { 
		if(petalsScale[k] == null) { 
		 petalsScale[k] = d3
		 										.scaleLinear()
		 										.range([5, xScale.bandwidth()/2])
		 										.domain([0,1]); 
		}
	});

	//Get min and max from metrics median
	data.forEach(function(d) {

		//For each metric
		metrics.forEach(function(k) {

			//get petals domain for key
			var domain = petalsScale[k].domain();

			//update min and max
			if (domain[0] > +d[k]) { domain[0] = +d[k]; }
			if (domain[1] < +d[k]) { domain[1] = +d[k]; }

			//update domain locally
			petalsScale[k].domain(domain);

			//update domain globally
			petalsScale[k].domain(yScale.domain());

		});
	});

}