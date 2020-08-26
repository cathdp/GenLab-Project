// d3.json('/api/v1.1/table').then(function(data_bb) {
//   //Main variables
//   var site = data_bb.site;
//   var location = data_bb.location;
//   var order = data_bb.order;
//   var order_date = data_bb.order_date;
//   var test = data_bb.test;
//   var test_name = data_bb.test_name;
//   var ward = data_bb.ward;
//   console.log(location)
//   var keys = Object.entries(order)
//   var UMH = Object.entries(location)
//   //console.log(UMH)
//   //console.log(keys)
//       //Unique values
//       var uni_location = [new Set(location)]
//       //console.log(uni_location)


//       var trace1 = {
//         x: order_date,
//         y: site,
//         type: 'scatter',
//         name:"Site"
//       };
      
//       // var trace2 = {
//       //   x: order_date,
//       //   y: site,
//       //   type: 'scatter',
//       //   name:'M1'
//       // };
      
//       var data_x = [trace1];
      
//       Plotly.newPlot('scatter', data_x);
      
// });

//General Data

d3.json('/api/v1.0/table').then(function(data_gl) {
  //Main variables
  var location_1 = data_gl.location;
  var test_1 = data_gl.test;
  var jan = data_gl.january;
  var feb = data_gl.february;
  var march = data_gl.march;
  var april = data_gl.april;
  var total_1 = data_gl.total;
  //console.log(location);
      //Unique values
      var uni_location_1 = [new Set(location_1)]
      //console.log(uni_location_1)
      //console.log(location_1.indexOf('UMH'))
      //Bar Plot
        var bar_jan = {
          x: location_1,
          y: jan,
          type: 'bar',
          name: 'January',
          marker: {
            color: 'rgb(157,193,131)'
          }
        };

        var bar_feb = {
          x: location_1,
          y: feb,
          type: 'bar',
          name: 'February',
          marker: {
            color: 'rgb(0,168,107)'
          }
        };

        var bar_mar = {
          x: location_1,
          y: march,
          type: 'bar',
          name: 'March',
          marker: {
            color: 'rgb(46,139,87)'
          }
        };

        var bar_apr = {
          x: location_1,
          y: march,
          type: 'bar',
          name: 'April',
          marker: {
            color: 'rgb(208,240,192)'
          }
        };
        
        data_bar=[bar_jan,bar_feb,bar_mar,bar_apr];

        var layout_bar = {
          title: 'Number of Test performed',
          yaxis: {
            title: 'USD (millions)'
          },
          font:{
            family: 'Raleway, sans-serif'
          },
          showlegend: true,
          xaxis: {
            tickangle: -25
          },
          yaxis: {
            zeroline: false,
            gridwidth: 2
          },
          bargap :0.05
        };

        Plotly.newPlot('bar_1', data_bar,layout_bar);

        //pie chart

        var data_pie = [{
          values: data_gl.total,
          labels: location_1,
          rotation: 45,
          type: 'pie',
          hole:.3,
        }];
        
        var layout_pie = {
          title: 'Total Distribution of Tests',
          showlegend: true
        };
        Plotly.newPlot('pie', data_pie,layout_pie);
      });