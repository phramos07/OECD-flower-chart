var createXAxis = function() {

	//create and update X axis
	x_axis = g.selectAll(".x.axis").data(['x']);
	x_axis.exit().remove();
	x_axis = x_axis.enter().append('g').attr("class", "x axis").merge(x_axis);
	x_axis.call(d3.axisBottom(xScale)).attr("transform", 'translate(0,' + height + ')');

	//remove country codes
	x_axis.selectAll("path, .tick").remove();

}

var createYAxis = function() {

	//create and update Y axis	
	y_axis = g.selectAll(".y.axis").data(['y']);
	y_axis.exit().remove();
	y_axis = y_axis.enter().append('g').attr("class", "y axis").merge(y_axis);
	y_axis.call(d3.axisLeft(yScale));

}