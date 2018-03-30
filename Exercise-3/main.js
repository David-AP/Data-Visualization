var format = d3.format(",");
let data;
let populationById = {};
let startYear, endYear;
let countrydata;

// Set tooltips
var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([150, 100])
    .html(function (d) {
        return "<strong>Country: </strong><span class='details'>" + d.properties.name + 
           "<br></span>" + 
           "<strong>Population: </strong><span class='details'>" + format(d.population) + 
           "<br></span>" +
           "<strong>Year: </strong><span class='details'>" + d.year + 
           "</span>";
    })

var margin = { top: 0, right: 0, bottom: 0, left: 0 };
var width = SVG_WIDTH - margin.left - margin.right;
var height = SVG_HEIGHT - margin.top - margin.bottom;

// Color range according to the population
var color = d3.scaleThreshold()
    .domain(POPULATION_RANGES)
    .range(POPULATION_RANGES_COLOR);

// Combo Box to select year
d3.select("#yearSelection")
.append("text")
.attr("class", "yearStyle")
.text(TEXT);

var select = d3.select("#yearSelection")
.append('select')
.attr('class','select comboStyle')
.on('change', updateMap);

// Button to start the animation
var button = d3.select("#animationButton")
.append("input")
.attr("type", "button")
.attr("name", "toggle")
.attr("value", TEXT_ANIMATION)
.attr("onclick", "runAnimation()"); 

var animationyear = d3.select("#AnimationText")
.append("text")
.attr("class", "yearStyle")
.text("1960");

// Map
var svg = d3.select("#RowBottom")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "svgStyle")
    .append('g')
    .attr("transform", "translate(" + POSITION_X + "," + POSITION_Y + ")")
    .attr('class', 'map');

// Create the projection (how to represent a point on a sphere)
var projection = d3.geoMercator()
    .scale(130)
    .translate([width / 2, height / 1.5]);

var path = d3.geoPath()
    .projection(projection);

// Set the tooltip to the svg
svg.call(tip);

// World_countries extracted from: https://raw.githubusercontent.com/jdamiani27/Data-Visualization-and-D3/master/lesson4/world_countries.json
queue()
    .defer(d3.json, "world_countries.json")
    .defer(d3.json, "country-data.json")
    .await(createMap);

// After Load world_countries file, we create the Map
function createMap(error, countriesData, countriesPopulation) {
    data = countriesData;
    countrydata = countriesPopulation;

    // List of years to feed the Combo Box
    var years = [];
    startYear = countrydata.reduce((first, row) => Math.min(first, row.Year), MAX_YEAR);
    endYear = countrydata.reduce((last, row) => Math.max(last, row.Year), MIN_YEAR);
  
    for(var i = startYear; i <= endYear; i++){
        years.push(i);
    }

    // Feed Combo box with the years
    var options = select
        .selectAll('option')
        .data(years).enter()
        .append('option')
        .text(function (d) { return d; });

    // In the first load, we will obtain the data for the startYear
    populationById = {};
    // Get Data (Country code and population) needed for the year filtered
    var yearData = countrydata
        .filter(data => data.Year === startYear)
        .map(data => ({id: data["Country Code"], population: data.Value}))
    // Prepare a map with the population (value) by id (Key)
    yearData.forEach(function (d) { populationById[d.id] = +d.population; });
    // Add to the Countries data the selected year and the population for that year
    data.features.forEach(function (d) { d.population = populationById[d.id], d.year = startYear });
    
    // Adding countries information to the Map
    svg.append("g")
        .attr("class", "countries")
        .selectAll("path")
        .data(data.features)
        .enter().append("path")
        .attr("d", path)
        .style("fill", function (d) { return color(populationById[d.id]); })
        .attr("class", "countriesStyle")
        .on('mouseover', showCountryHoverAndTip)
        .on('mouseout', hideCountryHoverAndTip);
}

function showCountryHoverAndTip(d) {
  tip.show(d);

  d3.select(this)
      .style("opacity", 1)
      .style("stroke", "Black")
      .style("stroke-width", 2);
}

function hideCountryHoverAndTip(d) {
  tip.hide(d);

  d3.select(this)
      .style("opacity", 0.8)
      .style("stroke", "Black")
      .style("stroke-width", 0.5);
}

// Function to refresh the Map using a specific year
function RefreshMap(year) {
  // Prepare data for the year selected
  populationById = {};
  var yearData = countrydata
      .filter(data => data.Year === year)
      .map(data => ({id: data["Country Code"], population: data.Value}))
  yearData.forEach(function (d) { populationById[d.id] = +d.population; });
  data.features.forEach(function (d) { d.population = populationById[d.id], d.year = year });

  // Refresh the countries using the data for the new year selected
  var refresh = d3.select("body").transition();
  refresh.select(".countries")
            .duration(REFRESH_DURATION)
            .selectAll("path")
            .style("fill", function (d) { return color(populationById[d.id]); });

  animationyear
      .transition().duration(REFRESH_DURATION)
      .text(year);
}

// ComboBox on change
function updateMap() {
  // Select current year for the combobox
  selectValue = d3.select('select').property('value')
  // Refresh map with the year selected
  RefreshMap(parseInt(selectValue));  
};

// To execute on animation button click
function runAnimation()
{
  var year = startYear;
  function mapAnimation() {
      RefreshMap(year);
      select.property('value', year);
      year++;
      // Every iteration call have a delay close to 1 second in order to simulate the animation
      if( year <= endYear ){
          setTimeout( mapAnimation, REFRESH_DURATION );
      }
  }

  mapAnimation();
}