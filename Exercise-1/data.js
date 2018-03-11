/*var totalSales = [
    { product: 'Hoodie', sales: 7, color: "#BEF781" },
    { product: 'Jacket', sales: 6, color: "#F7D358" },
    { product: 'Snuggie', sales: 9, color: "#848484" },
    { product: 'Gloves', sales: 3, color: "#A9BCF5" },
    { product: 'Scarf', sales: 13, color: "#F5A9F2" },
    { product: 'Coat', sales: 5, color: "#FAFA17" }
];*/

var totalSales = null;

queue()
  .defer(d3.json, "data.json")
  .await(ready);

// We must wait to read the data before start the chart built
function ready(error, data) {
    totalSales = data;
    buildChart();
}