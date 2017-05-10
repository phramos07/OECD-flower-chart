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
			flowerBud.exit().remove();
			flowerBud = flowerBud
										.enter()
										.append('circle')
										.attr('class', "flower-bud")
										.merge(flowerBud);
			flowerBud
				.attr('x', 0)
				.attr('y', 0)
				.attr('r', 2);

			//Lines
			var line = d3
									.select(this)
									.selectAll("line.flower-line")
									.data([e]);
			line.exit().remove();
			line = line
							.enter()
							.append('line')
							.attr('class', "flower-line")
							.attr('stroke-width', 0.2)
							.attr('stroke', 'black')
							.attr('x1', 0)
							.attr('y1', height)
							.attr('x2', 0)
							.attr('y2', 0)
							.merge(line);

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
				.attr('y', -7)
				.attr('x', 10)
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
					return petalsScale[k](+e[k]) * Math.cos((2*Math.PI/metrics.length)*i)*2;
				})
				.attr('y2', function(k, i) {
					return petalsScale[k](+e[k]) * Math.sin((2*Math.PI/metrics.length)*i)*2;
				})
				.style('fill', 'none')
				.style('stroke', function(k) {
					return colorScale(k);
				})
				.style('stroke-width', '1.5px')
				.on('mouseover', function(k) {

					//highlight petals
					elements
						.selectAll(".flower-petal")
						.style('opacity', function(d) {
							return d === k ? 1 : 0.3;
						})
						.style('stroke-width', function(d) {
							return d === k ? '3px' : '1.5px';
						});

					//highlight lines
					elements
						.selectAll(".flower-line")
						.style('stroke', function(d) {
							return d === e ? colorScale(k) : 'black';
						})
						.style('stroke-width', function(d) {
							return d === e ? '2px' : '0.2px';
						});

				})
				.on('mouseout', function(e) {
			
					//unhighlight the petals
					elements
						.selectAll(".flower-petal")
						.style('opacity', 1)
						.style('stroke-width', '1.5px');


					//unhighlight lines
					elements
						.selectAll(".flower-line")
						.style('stroke', 'black')
						.style('stroke-width', '0.2px');


				});

		});

}


