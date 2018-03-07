var totalSales = [
    { month: new Date(2016,10, 01), sales: 6500, sales2: 3500, sales3: 2000 },
    { month: new Date(2016,11, 01), sales: 5400, sales2: 3900, sales3: 2000 },
    { month: new Date(2016,12, 01), sales: 3500, sales2: 2200, sales3: 2000 },
    { month: new Date(2017,1, 01), sales: 9000, sales2: 4500, sales3: 2000 },
    { month: new Date(2017,2, 01), sales: 8500, sales2: 10000, sales3: 2000 },
    ];

var dataKeys = Object.keys(totalSales[0]);
var dataList = [];
var pointList = [];

for(var i = 1, len = dataKeys.length; i < len; i++){
    dataList.push(totalSales.map(data => ({month: data.month, sales: data[dataKeys[i]]})));
}

for(var i = 0, len = totalSales.length; i < len; i++) {
    for(var j = 1, lenj = dataKeys.length; j < lenj; j++) {
        pointList.push({month: totalSales[i].month, sales: totalSales[i][dataKeys[j]]})
    }
}