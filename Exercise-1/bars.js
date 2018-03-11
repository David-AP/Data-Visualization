let tooltip = null;

// Setup tooltip showed on the bars
function setupToolTip()
{
    tooltip = d3.select("body").append("div").attr("class", "toolTip");
}

// Adding bars to the chart
function addRect(bars) {
    bars.attr('x', setBarStartPositionX)
        .attr('width', setBarEndPositionX)
        .attr('y', setBarStartPositionY)    
        .attr('height', setBarEndPositionY);
}

function setBarStartPositionX(d, i) {
    return x(d.product) + 5;
}

function setBarEndPositionX(d, i) {
    return x.bandwidth() - 10;
}

function setBarStartPositionY(d, i) {
    return y(d.sales) + 0.5;
}

function setBarEndPositionY(d, i) {
    return height - y(d.sales) - 0.5;
}

// Adding color to each bar
function addColor(bars) {
    bars.attr('fill', function(d, i) {
        return d.color;
    })
}

// Adding Stroke to each bar
function addStroke(bars) {
    bars.attr('class', 'chartStroke');
}

// Adding Mouse Events
function addMouseEvents(bars) {
    bars.on("mouseover", showHover)
        .on("mousemove", showTooltip)
        .on("mouseout", hideHoverAndTooltip);
}

function showHover(d) {
    d3.select(this).style("fill", function() {
        return d3.rgb(d3.select(this).style("fill")).darker(HOVER_INTENSITY);
    });
}

function hideHoverAndTooltip(d) {
    d3.select(this).style("fill", function() {
        return d3.rgb(d3.select(this).style("fill")).brighter(HOVER_INTENSITY);
    });
    hideTooltip();
}

function showTooltip(d) {
    tooltip
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY + "px")
        .style("display", "inline")
        .html((d.product) + "<hr>" + "Sales: " + (d.sales));
}

function hideTooltip() {
    tooltip.style("display", "none");
}