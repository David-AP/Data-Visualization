let ylegend = null;

let startPositionX = null,
    startPositionY = null,
    startContentX = null,
    startContentY = null;

function setupCanvasLegend() {
    startPositionX = width + LEGEND_MARGIN_LEFT;
    startPositionY = LEGEND_MARGIN_TOP;
    startContentX = startPositionX + LEGEND_CONTENT_MARGIN_LEFT;
    startContentY = startPositionY + LEGEND_CONTENT_MARGIN_TOP;
}

// Setup the scale for the legend elements
function setupLegendScale()
{
    ylegend = d3.scaleBand()
                .rangeRound([0, LEGEND_CONTENT_HEIGHT])
                .domain(totalSales.map(function(d, i) {
                    return d.product;
                }));
}

// Legend creation
function createLegend(svg) {
    createLegendTitle(svg);
    createLegendRectangule(svg);    

    var g = svg.append("g")
                .attr("transform", "translate(" + (startContentX) + "," + (startContentY) + ")");

    return g.append("g")
            .attr("class", "legend")
            .selectAll("g")
            .data(totalSales)
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0," + i * LEGEND_ELEMENT_HEIGHT + ")"; });
}

function createLegendTitle(svg) {
    svg.append("text")
        .attr("x", startPositionX + LEGEND_TITLE_MARGIN_LEFT)
        .attr("y", 0)
        .attr("class", "legendTitle")
        .text("Legend");
}

function createLegendRectangule(svg) {
    svg.append("rect")
                .attr('x', startPositionX)
                .attr('width', LEGEND_WIDTH)
                .attr('y', startPositionY)    
                .attr('height', totalSales.length * LEGEND_ELEMENT_HEIGHT + LEGEND_MARGIN_TOP)
                .attr('class', "legendRect chartStroke");
}

// Adding elements to the legend
function addLegendElements(legend) {
    legend.append("rect")
            .attr("width", LEGEND_ELEMENT_WIDTH)
            .attr('height', function(d, i) {
                return ylegend.bandwidth() - LEGEND_ELEMENT_SEPARATION;
            })
            .attr('fill', function(d, i) {
                return d.color;
            })
            .attr('class', 'chartStroke');
            
}

// Adding product names to each element in the legend
function addLegendText(legend) {
    legend.append("text")
            .attr("x", LEGEND_TEXT_ELEMENT_START_X)
            .attr("y", LEGEND_TEXT_ELEMENT_START_Y)
            .attr("dy", ".35em")
            .text(function(d) { return d.product; });
}