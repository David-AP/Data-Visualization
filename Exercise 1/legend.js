function setupLegendYScale()
{
    ylegend = d3.scaleBand()
                .rangeRound([0, 110])
                .domain(totalSales.map(function(d, i) {
                    return d.product;
                }));
}

function createLegend(g) {
    return g.append("g")
            .attr("class", "legend")
            .selectAll("g")
            .data(totalSales)
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
}

function addLegendElements(legend) {
    legend.append("rect")
            .attr("width", 20)
            .attr('height', function(d, i) {
                return ylegend.bandwidth() - 2;
            })
            .attr('fill', function(d, i) {
                return d.color;
            })
            .attr('stroke', '#000')
            .attr('stroke-width', '1.5')
            .attr('stroke-opacity', '1.1');
            
}

function addLegendText(legend) {
    legend.append("text")
            .attr("x", 67)
            .attr("y", 9)
            .attr("dy", ".35em")
            .text(function(d) { return d.product; });
}