let tooltip = null;

// Setup tooltip showed when click the dots
function setupToolTip()
{
    tooltip = d3.select("body").append("div").attr("class", "toolTip");
}

// Adding paths to the lines chart
function createPaths(svg) {
    // define the line
    var valueline = d3.line()
                        .x(function(d) { return x(d.month); })
                        .y(function(d) { return y(d.sales); });

    var lines = svg.selectAll(".line")
                .data(dataList)
                .enter().append("g");

    lines.append("path")
                .attr("class", "line")
                .attr("d", valueline)
                .on("mouseover", showLineHover)
                .on("mouseout", hideHoverLine);
}

function showLineHover(d) {
    d3.select(this)
      .attr("class", "lineHover");
  }
  
  function hideHoverLine(d) {
    d3.select(this)
      .attr("class", "line");
  }

// Adding dots to the lines
function createDots(svg) {  
    var dots =  svg.selectAll("circle")
        .data(pointList)
        .enter().append("circle")
        .attr("class", "dot")      
        .attr("cx", function(d) { return x(d.month); })
        .attr("cy", function(d) { return y(d.sales); })
        .attr("r", DOT_RADIOUS);
        
    addDotMouseEvents(dots);    
}

function addDotMouseEvents(dots) {
    dots.on("mouseover", showDotHover)
        .on("mouseout", hideDotHoverAndTooltip)
        .on("click", showTooltip);
}
  
function showDotHover(d) {
    d3.select(this)
      .attr("r", DOT_RADIOUS * DOT_RADIOUS_INCREASE_HOVER)
      .attr("class", "dotHover");
}
  
function hideDotHoverAndTooltip(d) {
    d3.select(this)
      .attr("r", DOT_RADIOUS)
      .attr("class", "dot");
  
    hideTooltip();
}
  
function showTooltip(d) {
    tooltip.style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY + "px")
            .style("display", "inline")
            .html((d.month) + "<hr>" + "Sales: " + (d.sales));
}
  
function hideTooltip() {
    tooltip.style("display", "none");
}