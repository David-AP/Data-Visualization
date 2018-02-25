let margin = null,
    width = null,
    height = null;

let svg = null;
let x, y = null;
let tooltip = null;

let ylegend = null;

// Main Process
setupCanvasSize();
appendSvg("body");
setupXScale();
setupYScale();
appendXAxis();
appendYAxis();
appendChartBars();
appendLegend();

// Canvas Size for our SVG
function setupCanvasSize() {
    margin = {top: 20, left: 40, bottom: 20, right: 140};
    width = 960 - margin.left - margin.right;
    height = 400 - margin.top - margin.bottom;
}

// Adding SVG to the body using the attributes created in the previous step
function appendSvg(domElement) {
    svg = d3.select(domElement).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",`translate(${margin.left}, ${margin.top})`);
}

// Set scale for X axis (getting every product in totalSales array)
function setupXScale()
{
    // We are using discrete values for the X axis (products)
    x = d3.scaleBand()
            .rangeRound([0, width])
            .domain(totalSales.map(function(d, i) {
                return d.product;
            }));
}

//Set scale for Y axis (checking the max value for the sales property in totalSales array)
function setupYScale()
{
    var maxSales = d3.max(totalSales, function(d, i) {
        return d.sales;
    });

    // We are using continuos values for the Y axis (number of sales)
    y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, maxSales]);
}

//Add the X axis to the SVG
function appendXAxis() {
    svg.append("g")
        .attr("transform",`translate(0, ${height})`)
        .call(d3.axisBottom(x));
}

//Add the Y axis to the SVG
function appendYAxis() {
    svg.append("g")
        .call(d3.axisLeft(y));
}

// Add rectangles (the "bars") to the SVG
function appendChartBars()
{
    // Prepare a group per each rect and bind data stored in the totalSales var
    var rects = svg.selectAll('rect').data(totalSales);
    // Get access to all the elements (rects)
    var newRects = rects.enter();
    // Append rects to the svg
    var bars = newRects.append('rect');

    setupToolTip();
    addRect(bars);
    addColor(bars);
    addStroke(bars);
    addMouseEvents(bars);
}

//Add legend to the chart
function appendLegend()
{   
    var g = svg.append("g").attr("transform", "translate(" + 800 + "," + 10 + ")");

    setupLegendYScale();
    var legend = createLegend(g);
    addLegendElements(legend);
    addLegendText(legend);
}