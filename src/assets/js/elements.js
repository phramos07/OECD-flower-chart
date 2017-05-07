var draw = function() {

	//Draw visualization elements outer group
	var elements = g
									.selectAll("g.vis-elements")
									.data(["vis-elements"]);
	elements.exit().remove();
	elements = elements
							.enter()
							.append('g')
							.attr('class', "vis-elements")
							.merge(elements);

	//Flower groups
	var flowers = elements
									.selectAll("g.flowers")
									.data(data);
	flowers.exit().remove();
	flowers = flowers
							.enter()
							.append('g')
							.attr('class', "flowers")
							.merge(flowers);
	flowers
		.attr('transform', function(d) {
			return "translate(" + (xScale(d.country) + xScale.bandwidth()/2) + "," + (yScale(+d.mean)) + ")";
		})
		.each(function(e) {

			//Center circles
			var flowerBud = d3
												.select(this)
												.selectAll("circle.flower-bud")
												.data([e]);

			//Labels
			var flowerLabel = d3
													.select(this)
													.selectAll(".flower-label")
													.data([e]);
			flowerLabel.exit().remove();
			flowerLabel = flowerLabel
											.enter()
											.append('text')
											.attr('class', "flower-label")
											.merge(flowerLabel);
			flowerLabel
				.attr('transform', 'rotate(90) translate(20,4)')
				.text(function(d) {
					return countries[d.country].pt;
				});

			//Get metrics
			var metrics = Object
											.keys(e)
											.filter(function(k) {
												return k !== "country";
											})
											.sort(function(a, b) {
												return d3.ascending(a,b);
											});

			//Petals
			var flowerPetal = d3
													.select(this)
													.selectAll(".flower-petal")
													.data(metrics);
			flowerPetal.exit().remove();
			flowerPetal = flowerPetal
											.enter()
											.append('line')
											.attr('class', "flower-petal")
											.merge(flowerPetal);
			flowerPetal
				.attr('x1', 0)
				.attr('y1', 0)
				.attr('x2', function(k, i) {
					return petalsScale[k](+e[k]) * Math.cos((2*Math.PI/metrics.length)*i);
				})
				.attr('y2', function(k, i) {
					return petalsScale[k](+e[k]) * Math.sin((2*Math.PI/metrics.length)*i);
				})
				.style('fill', 'none')
				.style('stroke', function(k) {
					return colorScale(k);
				})
				.style('stroke-width', '1.5px')
				.on('mouseover', function(k) {
					elements
						.selectAll(".flower-petal")
						.style('opacity', function(d) {
							return d === k ? 1 : 0.3;
						});
				})
				.on('mouseout', function(e) {
					elements
						.selectAll(".flower-petal")
						.style('opacity', 1);
				});

		});

}


