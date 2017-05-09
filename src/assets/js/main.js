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
		margin = { top: 30, left: 30, right: 10, bottom: 30};

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


////////////////////////////////////////
////TRABALHO ANTIGO: TABELA DINAMICA////
////////////////////////////////////////

// var countClicks;
// var ROWS_PER_PAGE = 10+1; //needs to include header
// var current_page = 0;
// var current_data;

// $(document).ready(function() {
// 	d3.csv("data/dados-tp1.csv", function(erro,data){
      
//       //Crate table header and initialize dataset in a table
//       var columnsNames = d3.keys(data[0]);
//       var head = $('#table > thead > tr');
//       columnsNames.forEach(function(d) {
//   	    head.append($('<th>'+d+'</th>'));
//       });
//       countClicks = Array.apply(null, new Array(columnsNames.length)).map(Number.prototype.valueOf,0);
//       updateTable(data,columnsNames);
      
//       // Update rows in the table with dataset object
//       function updateTable(newData,columns){
      
//         current_data = newData;
//       	newData = newData.slice(current_page*ROWS_PER_PAGE, ROWS_PER_PAGE*(1+current_page)-1);
      
//       	$("#tablebody tr").remove(); 
//       	var tbody = d3.select('#tablebody');

//       	var rows = tbody.selectAll('tr').data(newData).enter().append('tr')
//       	var cells = rows.selectAll('td').data(function(row) {
//       		return columns.map(function (column) {
// 	    	  return { column: column, value: row[column] }
// 	      })
//         }).enter().append('td').text(function (d) { return d.value });
        
//       }

//       //Search function
//       $("#search").keyup(function () {
//       	var inputText = this.value;
//       	var regex = new RegExp("^" + inputText + ".*", "i");
//       	var fdata=data.filter(function (i){
//       		var match=0;
//       		d3.values(i).forEach(function(k) {
//       			if(regex.test(k)){
//       				match=1;
//       			}
// 	        });
//       		return match;
//       	});
//         current_page=0;
//       	updateTable(fdata,columnsNames);
//       });
      
//       //Previous function
//       $("#previous_link").click(function(){
//         if(current_page > 0){
//             current_page--;
//             updateTable(current_data, columnsNames);
//         }
//       });
      
//       //Next function
//       $("#next_link").click(function(){
//         if(current_page+1 < Math.floor(current_data.length/(ROWS_PER_PAGE-1))){
//             current_page++;
//             updateTable(current_data, columnsNames);
//         }
//       });

//       //Sorting function
//       $('#table > thead > tr > th').click(function(){
//       	var colIndex = $(this).parent().children().index($(this));
//       	var sdata = data;
      	
//       	current_page = 0; //resetting current page
      	
//       	if(countClicks[colIndex]%2==0){
//       		sdata.sort(function(a, b) {
//       		  return d3.ascending(a[columnsNames[colIndex]], b[columnsNames[colIndex]]);		
//       	    });
//       	} else{
//       		sdata.sort(function(a, b) {
//       			return d3.descending(a[columnsNames[colIndex]], b[columnsNames[colIndex]]);		
//       	    });
//       	}
      	
// 		  //data = sdata; //saving sorted data again		
		
//       	countClicks[colIndex]++;
//       	updateTable(sdata,columnsNames);
//       });

//     });
// });

     /* function showTable(data){
	    var body = $('#table > tbody');
	    data.forEach(function(d) {
	  	  var row = $('<tr></tr>');
	  	  d3.values(d).forEach(function(i) {
	  		  row.append($('<td>'+i+'</td>'));
	  		  body.append(row);
	      });
	    });
      }*/
