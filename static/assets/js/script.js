var originalData = [];
var dataFiltered = [];
var locations = [];
var tests = [];
var transformedDataFiltered = [];

var $locationFilter = document.getElementById("locationFilter");
var $testFilter = document.getElementById("testFilter");
var $tableBody = document.getElementById("tableBody");

document
  .querySelector("#locationFilter")
  .addEventListener("change", function (e) {
    resetFilter(originalData);
    if ($locationFilter.value != "-1") locationFilter($locationFilter.value);
  });

document.querySelector("#testFilter").addEventListener("change", function (e) {
  resetFilter(originalData);
  if ($testFilter.value != "-1") testFilter($testFilter.value);
});

var p_data = {
  location: [],
  test: [],
};

d3.json("/api/v1.0/table2").then(function (data) {
  originalData = data;
  dataFiltered = data;

  loadLocationFilter();
  loadTestFilter();
  showTable(data);
  //graph

  graphData(data);
});

//127.0.0.1:5000/locations

d3.json("/tests").then(function (d) {
  console.log("tests", d);
  tests = d;
});

d3.json("/locations").then(function (r) {
  console.log("locations", r);
  locations = r;
});
/*originalData = data;
dataFiltered = data;*/
function graphData(data) {
  console.log("render graphs");
  _.take(data,10).forEach(function (o) {
  //data.forEach(function (o) {
    var dataRecord = {
      "c": o.test,
      "v": o.april,
    };


    // console.log(dataRecord);
    transformedDataFiltered.push(dataRecord);
  });
}
function clearTable() {
  console.log("clearTable");
  $tableBody.innerHTML = "";
}

function showTable(data) {
  /*wrong data schema */
  console.log("showTable", data);
  clearTable();

  data.forEach(function (o) {
    var row = d3.select("tbody").append("tr");
    row.append("td").text(o.location);
    row.append("td").text(o.test);
    row.append("td").text(o.january);
    row.append("td").text(o.february);
    row.append("td").text(o.march);
    row.append("td").text(o.april);
    row.append("td").text(o.total);
  });
}
// YOUR CODE HERE!

function resetFilter(data) {
  console.log("resetFilter");
  dataFiltered = originalData;
  showTable(originalData);
}

function locationFilter(locationFilter) {
  console.log("locationFilter");

  dataFiltered = dataFiltered.filter(function (l) {
    return l.location.includes(locationFilter);
  });
  showTable(dataFiltered);
}

function testFilter(testFilter) {
  console.log("testFilter");
  dataFiltered = dataFiltered.filter(function (l) {
    return l.test === testFilter;
  });
  showTable(dataFiltered);
}
function loadLocationFilter() {
  console.log("loadLocationFilter");
  locations = [];
  originalData.forEach(function (o) {
    locations.push(o.location);
  });
  _.uniq(locations).forEach(function (o) {
    var option = document.createElement("option");
    option.value = o;
    option.text = o;
    $locationFilter.appendChild(option);
  });
}

function loadTestFilter() {
  console.log("loadTestFilter");

  console.log("loadtestFilter");
  tests = [];
  originalData.forEach(function (o) {
    tests.push(o.test);
  });

  _.uniq(tests).forEach(function (o) {
    var option = document.createElement("option");
    option.value = o;
    option.text = o;
    $testFilter.appendChild(option);
  });
}

function init() {
  console.log("init");
  resetFilter(originalData);

 
}



function renderGraph() {
  console.log("transformedDataFiltered", transformedDataFiltered);
  am4core.ready(function () {
    // Themes begin
      am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("chartdiv", am4charts.PieChart);
    
    // Add data
  chart.data =transformedDataFiltered;

    console.log("chart", chart);
    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "v";
    pieSeries.dataFields.category = "c";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;
  }); // end am4core.ready()
}

init();
 setTimeout(function () {
 renderGraph();
    }, 5000);
 
