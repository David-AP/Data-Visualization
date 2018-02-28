let margin = null,
    width = null,
    height = null;

let svg = null;
let x, y = null; // scales

let tooltip = null;

let radius = 7.5;

setupToolTip();
setupCanvasSize();
appendSvg("body");
setupXScale();
setupYScale();
appendXAxis();
appendYAxis();
appendLineCharts();



// Setup tooltip showed on the bars
function setupToolTip()
{
    tooltip = d3.select("body").append("div").attr("class", "toolTip");
}


// 1. let's start by selecting the SVG Node
function setupCanvasSize() {
  margin = {top: 20, left: 80, bottom: 20, right: 30};
  width = 960 - margin.left - margin.right;
  height = 520 - margin.top - margin.bottom;
}

function appendSvg(domElement) {
  svg = d3.select(domElement).append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .attr("class", "svgStyle")
              .append("g")
              .attr("transform",`translate(${margin.left}, ${margin.top})`);

}

// Now on the X axis we want to map totalSales values to
// pixels
// in this case we map the canvas range 0..350, to 0...maxSales
// domain == data (data from 0 to maxSales) boundaries
function setupXScale()
{

  x = d3.scaleTime()
      .range([0, width])
      .domain(d3.extent(totalSales, function(d) { return d.month}));
}

// Now we don't have a linear range of values, we have a discrete
// range of values (one per product)
// Here we are generating an array of product names
function setupYScale()
{
  var maxSales = d3.max(totalSales, function(d, i) {
    return d.sales;
  });

  y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, maxSales]);

}

function appendXAxis() {
  // Add the X Axis
  svg.append("g")
    .attr("transform",`translate(0, ${height})`)
    .call(d3.axisBottom(x));
}

function appendYAxis() {
  // Add the Y Axis
  svg.append("g")
  .call(d3.axisLeft(y));
}

function appendLineCharts()
{
  // define the line
  var valueline = d3.line()
                    .x(function(d) { return x(d.month); })
                    .y(function(d) { return y(d.sales); });

  // Add the valueline path.
  svg.append("path")
    .data([totalSales])
    .attr("class", "line")
    .attr("d", valueline)
    .on("mouseover", showLineHover)
    .on("mouseout", hideHoverLine);

  svg.selectAll("circle")
    .data(totalSales)
      .enter().append("circle")        
        .attr("cx", function(d) { return x(d.month); })
        .attr("cy", function(d) { return y(d.sales); })
        .attr("r", radius)
        .attr("fill", "steelblue")
        .on("mouseover", showHover)
        .on("mouseout", hideHoverAndTooltip)
        .on("click", showTooltip);
}

function showLineHover(d) {
  d3.select(this)
    .attr("class", "lineHover");
}

function hideHoverLine(d) {
  d3.select(this)
    .attr("class", "line");
}

function showHover(d) {
  d3.select(this)
    .attr("r", radius*2)
    .attr("fill", "#87FC02");
}

function hideHoverAndTooltip(d) {
  d3.select(this)
    .attr("r", radius)
    .attr("fill", "steelblue");

  hideTooltip();
}

function showTooltip(d) {
  tooltip
      .style("left", d3.event.pageX + "px")
      .style("top", d3.event.pageY + "px")
      .style("display", "inline")
      .html((d.month) + "<hr>" + "Sales: " + (d.sales));
}

function hideTooltip() {
  tooltip.style("display", "none");
}