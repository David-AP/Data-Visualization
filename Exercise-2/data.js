/*var totalSales = [
    { month: new Date(2016,10, 01), sales: 6500, sales2: 3500, sales3: 2000 },
    { month: new Date(2016,11, 01), sales: 5400, sales2: 3900, sales3: 2000 },
    { month: new Date(2016,12, 01), sales: 3500, sales2: 2200, sales3: 2000 },
    { month: new Date(2017,1, 01), sales: 9000, sales2: 4500, sales3: 2000 },
    { month: new Date(2017,2, 01), sales: 8500, sales2: 10000, sales3: 2000 }
];*/

var totalSales = null;
var dataList = [];
var pointList = [];

queue()
  .defer(d3.json, "data.json")
  .await(ready);

// We must wait to read the data before start the chart built
function ready(error, data) {
    totalSales = data;

    // Get the field names
    var dataKeys = Object.keys(totalSales[0]);    
    
    // Get data for every line
    for(var i = 1, len = dataKeys.length; i < len; i++){
        dataList.push(totalSales.map(data => ({month: data.month, name: dataKeys[i], sales: data[dataKeys[i]]})));
    }

    // Get data for every point
    for(var i = 0, len = totalSales.length; i < len; i++) {
        for(var j = 1, lenj = dataKeys.length; j < lenj; j++) {
            pointList.push({month: totalSales[i].month, name: dataKeys[j], sales: totalSales[i][dataKeys[j]]});
        }
    }

    // Create the chart
    buildChart();
}
