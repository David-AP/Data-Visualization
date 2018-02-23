let margin = null,
    width = null,
    height = null;

let svg = null;
let x, y = null; // scales

// Process
setupCanvasSize();
appendSvg("body");
setupXScale();
setupYScale();
appendXAxis();
appendYAxis();
appendChartBars();

// 1. Canvas Size for our SVG
function setupCanvasSize() {
    margin = {top: 20, left: 80, bottom: 20, right: 30};
    width = 960 - margin.left - margin.right;
    height = 350 - margin.top - margin.bottom;
}

// 2. Adding SVG to the body using the attributes created in the previous step
function appendSvg(domElement) {
    svg = d3.select(domElement).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",`translate(${margin.left}, ${margin.top})`);
}

// 3. Set scale for X axis (checking the max value for the sales property in totalSales array)
function setupXScale()
{
    var maxSales = d3.max(totalSales, function(d, i) {
        return d.sales;
    });

    // We are using continuos values for the X axis (number of sales)
    x = d3.scaleLinear()
            .range([0, width])
            .domain([0, maxSales]);
}

//4. Set scale for Y axis (getting every product in totalSales array)
function setupYScale()
{
    // We are using discrete values for the Y axis (products)
    y = d3.scaleBand()
            .rangeRound([0, height])
            .domain(totalSales.map(function(d, i) {
                return d.product;
            }));
}

//5. Add the X axis to the SVG
function appendXAxis() {
    svg.append("g")
        .attr("transform",`translate(0, ${height})`)
        .call(d3.axisBottom(x));
}

//6. Add the Y axis to the SVG
function appendYAxis() {
    svg.append("g")
        .call(d3.axisLeft(y));
}

//7. Add rectangles (the "bars") to the SVG
function appendChartBars()
{
    //Select the number of rectangles for the SVG (from the totalSales array)
    var rects = svg.selectAll('rect').data(totalSales);

    // Append to the list of Rectangles we already have
    var newRects = rects.enter();

    // Set X and Y positions and also set height (using y scale) and withd (using x scale)
    newRects.append('rect')
      .attr('x', x(0))
      .attr('y', function(d, i) {
        return y(d.product);
      })
      .attr('height', y.bandwidth)
      .attr('width', function(d, i) {
        return x(d.sales);
      });
}