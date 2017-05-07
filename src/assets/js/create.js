//Create svg and inner group
var create = function() {

	// Draw svg
	wrap = container.d3.selectAll('svg.flowers-chart').data(["chart-svg"], 
		function (d) { return d; }); // Bind data to elements
	// Remove deleted elements
	wrap.exit().remove(); 
	// Merge new elements with old elements
	wrap = wrap.enter().append("svg").attr('class', 'flowers-chart').merge(wrap);
	// Update all elements
	wrap.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom);

	//Draw background rect
	var bgRect = wrap.selectAll("rect.bg-rect").data(["bg-rect"]);
	bgRect.exit().remove();
	bgRect = bgRect.enter().insert('rect', ':first-child').attt('class', "bg-rect").merge(bgRect);
	bgRect
		.attr("transform", 'translate(' + magin.left + ',0)')
		.attr('width', width)
		.attr('height', height + margin.top + margin.bottom);

	//Draw inner g
	g = wrap.selectAll("g.chart-wrap").data(["chart-wrap"]);
	g.exit().remove();
	g = g.enter().append('g').attr('class', "chart-wrap").merge(g);


}

