//set up
(function () {
    // 1、get size before load the website
    var setFont = function () {
        var html = document.documentElement;// get html
        // get width
        var width = html.clientWidth;

        // control width
        if (width < 1024) width = 1024
        if (width > 1920) width = 1920
        // set html's base
        var fontSize = width / 80 + 'px';
        // send base to gtml
        html.style.fontSize = fontSize;
    }
    setFont();
    // 2、when website changed
    window.onresize = function () {
        setFont();
    }
})();


// before loading
window.onload = (function () {
    //get Time
    setInterval(function () {
        var date = new Date();
        var year = date.getFullYear();
        var mon_no = date.getMonth();
        var day = date.getDate();
        var date_no = date.getDay();
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        var date = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        if (day >= 0 && day <= 9) {
            day = "0" + day;
        }
        if (h >= 0 && h <= 9) {
            h = "0" + h;
        }
        if (m >= 0 && m <= 9) {
            m = "0" + m;
        }
        if (s >= 0 && s <= 9) {
            s = "0" + s;
        }
        var d = document.getElementById('showTime');
        var dateShow = month[mon_no] + '/' + day + '/' + year + ' ' + date[date_no] + ' ' + h + ':' + m + ':' + s;
        d.innerHTML = dateShow;
    }
        , 1000)
    //set default date value as today
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + month + "-" + day;
    todayDoc = document.getElementById('date')
    todayDoc.value = today;
    todayDoc.setAttribute("max", today);
})();



//time_vs_price
(function () {
    var option = {
        //hover to show detail
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            // category
            type: 'category',
            // x-axis
            data: ['0h', '2h', '4h', '6h', '8h', '10h', '12h', '14h', '16h', '18h', '20h', '22h'],
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#4c9bfd'
            },
            axisLine: {
                show: false
            },
            boundaryGap: false
        },
        yAxis: {
            type: 'value',
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#4c9bfd'
            },
            axisLine: {
                show: false
            },
            boundaryGap: false
        },

        legend: {
            textStyle: {
                color: '#4c9bfd'

            },
            right: '10%'
        },

        grid: {
            show: true,
            top: '20%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            borderColor: '#012f4a',
            containLabel: true
        },
        series: [{
            name: 'Corn',
            // data
            data: [24, 40, 101, 134, 90, 230, 210, "-", "-", "-", "-", "-"],
            type: 'line',
            smooth: true,
            itemStyle: {
                color: '#00f2f1'
            }
        },
        {
            name: 'Corn_Predict',
            // data
            data: ["-", "-", "-", "-", "-", "-", 210, 230, 120, 230, 210, 120],
            type: 'line',
            smooth: true,
            itemStyle: {
                normal: {
                    color: '#00f2f1',
                    lineStyle: {
                        width: 2,
                        type: 'dotted'
                    }
                }
            }

        },
        {
            name: 'Wheat',
            data: [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
            type: 'line',
            smooth: true,
            itemStyle: {
                color: '#ed3f35'
            }
        },
        {
            name: 'Rice',
            // data
            data: [12, 17, 34, 28, 16, 11, 6, 19, 15, 23, 19, 40],
            type: 'line',
            smooth: true,
            itemStyle: {
                color: '##FFFAFA'
            }
        }]
    };
    var myechart = echarts.init($('.time_vs_price_line')[0]);
    myechart.setOption(option);
})();


//time_vs_weather_line
(function () {
    var option = {
        //hover to show detail
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            // category
            type: 'category',
            // x-axis
            data: ['0h', '2h', '4h', '6h', '8h', '10h', '12h', '14h', '16h', '18h', '20h', '22h'],
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#4c9bfd'
            },
            axisLine: {
                show: false
            },
            boundaryGap: false
        },
        yAxis: {
            type: 'value',
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#4c9bfd'
            },
            axisLine: {
                show: false
            },
            boundaryGap: false
        },

        legend: {
            textStyle: {
                color: '#4c9bfd'

            },
            right: '10%'
        },

        grid: {
            show: true,
            top: '20%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            borderColor: '#012f4a',
            containLabel: true
        },
        series: [{
            name: 'Temperature',
            // data
            data: [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
            type: 'line',
            smooth: true,
            itemStyle: {
                color: '#00f2f1'
            }
        },
        {
            name: 'Atmospheric pressure',
            // data
            data: [26, 18, 81, 74, 97, 60, 100, 201, 210, 170, 140, 160],
            type: 'line',
            smooth: true,
            itemStyle: {
                color: '#00f2f1'
            }
        },
        {
            name: 'Air Quality',
            data: [45, 84, 91, 74, 160, 250, 140, 231, 278, 322, 160, 94],
            type: 'line',
            smooth: true,
            itemStyle: {
                color: '#ed3f35'
            }
        },
        {
            name: 'Moisture',
            data: [10, 15, 32, 34, 38, 42, 46, 21, 14, 13, 17, 20],
            type: 'line',
            smooth: true,
            itemStyle: {
                color: '#ed3f35'
            }
        },
        {
            name: 'Precipitation',
            // data
            data: [12, 17, 34, 28, 16, 11, 6, 19, 15, 23, 19, 40],
            type: 'line',
            smooth: true,
            itemStyle: {
                color: '##FFFAFA'
            }
        }]
    };
    var myechart = echarts.init($('.time_vs_weather_line')[0]);
    myechart.setOption(option);
})();


//location_vs_price_map
$.get('map', function (usaJson) {
    var option;
    var myChart = echarts.init($('.location_vs_price_map')[0]);
    echarts.registerMap('USA', usaJson, {
        Alaska: {
            left: -131,
            top: 25,
            width: 15
        },
        Hawaii: {
            left: -110,
            top: 28,
            width: 5
        },
        'Puerto Rico': {
            left: -76,
            top: 26,
            width: 2
        }
    });
    option = {
        title: {
            // text: 'USA Population Estimates (2012)',
            // subtext: 'Data from www.census.gov',
            // sublink: 'http://www.census.gov/popest/data/datasets.html',
            left: 'right'
        },
        tooltip: {
            trigger: 'item',
            showDelay: 0,
            transitionDuration: 0.2
        },
        visualMap: {
            left: 'right',
            min: 500000,
            max: 38000000,
            inRange: {
                color: [
                    '#313695',
                    '#4575b4',
                    '#74add1',
                    '#abd9e9',
                    '#e0f3f8',
                    '#ffffbf',
                    '#fee090',
                    '#fdae61',
                    '#f46d43',
                    '#d73027',
                    '#a50026'
                ]
            },
            text: ['High', 'Low'],
            calculable: true
        },
        toolbox: {
            show: true,
            //orient: 'vertical',
            left: 'left',
            top: 'top',
            feature: {
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {}
            }
        },
        series: [
            {
                name: 'USA PopEstimates',
                type: 'map',
                roam: true,
                map: 'USA',
                emphasis: {
                    label: {
                        show: true
                    }
                },
                data: [
                    { name: 'Alabama', value: 4822023 },
                    { name: 'Alaska', value: 731449 },
                    { name: 'Arizona', value: 6553255 },
                    { name: 'Arkansas', value: 2949131 },
                    { name: 'California', value: 38041430 },
                    { name: 'Colorado', value: 5187582 },
                    { name: 'Connecticut', value: 3590347 },
                    { name: 'Delaware', value: 917092 },
                    { name: 'District of Columbia', value: 632323 },
                    { name: 'Florida', value: 19317568 },
                    { name: 'Georgia', value: 9919945 },
                    { name: 'Hawaii', value: 1392313 },
                    { name: 'Idaho', value: 1595728 },
                    { name: 'Illinois', value: 12875255 },
                    { name: 'Indiana', value: 6537334 },
                    { name: 'Iowa', value: 3074186 },
                    { name: 'Kansas', value: 2885905 },
                    { name: 'Kentucky', value: 4380415 },
                    { name: 'Louisiana', value: 4601893 },
                    { name: 'Maine', value: 1329192 },
                    { name: 'Maryland', value: 5884563 },
                    { name: 'Massachusetts', value: 6646144 },
                    { name: 'Michigan', value: 9883360 },
                    { name: 'Minnesota', value: 5379139 },
                    { name: 'Mississippi', value: 2984926 },
                    { name: 'Missouri', value: 6021988 },
                    { name: 'Montana', value: 1005141 },
                    { name: 'Nebraska', value: 1855525 },
                    { name: 'Nevada', value: 2758931 },
                    { name: 'New Hampshire', value: 1320718 },
                    { name: 'New Jersey', value: 8864590 },
                    { name: 'New Mexico', value: 2085538 },
                    { name: 'New York', value: 19570261 },
                    { name: 'North Carolina', value: 9752073 },
                    { name: 'North Dakota', value: 699628 },
                    { name: 'Ohio', value: 11544225 },
                    { name: 'Oklahoma', value: 3814820 },
                    { name: 'Oregon', value: 3899353 },
                    { name: 'Pennsylvania', value: 12763536 },
                    { name: 'Rhode Island', value: 1050292 },
                    { name: 'South Carolina', value: 4723723 },
                    { name: 'South Dakota', value: 833354 },
                    { name: 'Tennessee', value: 6456243 },
                    { name: 'Texas', value: 26059203 },
                    { name: 'Utah', value: 2855287 },
                    { name: 'Vermont', value: 626011 },
                    { name: 'Virginia', value: 8185867 },
                    { name: 'Washington', value: 6897012 },
                    { name: 'West Virginia', value: 1855413 },
                    { name: 'Wisconsin', value: 5726398 },
                    { name: 'Wyoming', value: 576412 },
                    { name: 'Puerto Rico', value: 3667084 }
                ]
            }
        ]
    };
    myChart.setOption(option);
})

//location_vs_weather_map
$.get('map', function (usaJson) {
    var option;
    var myChart = echarts.init($('.location_vs_weather_map')[0]);
    echarts.registerMap('USA', usaJson, {
        Alaska: {
            left: -131,
            top: 25,
            width: 15
        },
        Hawaii: {
            left: -110,
            top: 28,
            width: 5
        },
        'Puerto Rico': {
            left: -76,
            top: 26,
            width: 2
        }
    });
    option = {
        title: {
            // text: 'USA Population Estimates (2012)',
            // subtext: 'Data from www.census.gov',
            // sublink: 'http://www.census.gov/popest/data/datasets.html',
            left: 'right'
        },
        tooltip: {
            trigger: 'item',
            showDelay: 0,
            transitionDuration: 0.2
        },
        visualMap: {
            left: 'right',
            min: 500000,
            max: 38000000,
            inRange: {
                color: [
                    '#313695',
                    '#4575b4',
                    '#74add1',
                    '#abd9e9',
                    '#e0f3f8',
                    '#ffffbf',
                    '#fee090',
                    '#fdae61',
                    '#f46d43',
                    '#d73027',
                    '#a50026'
                ]
            },
            text: ['High', 'Low'],
            calculable: true
        },
        toolbox: {
            show: true,
            //orient: 'vertical',
            left: 'left',
            top: 'top',
            feature: {
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {}
            }
        },
        series: [
            {
                name: 'USA PopEstimates',
                type: 'map',
                roam: true,
                map: 'USA',
                emphasis: {
                    label: {
                        show: true
                    }
                },
                data: [
                    { name: 'Alabama', value: 4822023 },
                    { name: 'Alaska', value: 731449 },
                    { name: 'Arizona', value: 6553255 },
                    { name: 'Arkansas', value: 2949131 },
                    { name: 'California', value: 38041430 },
                    { name: 'Colorado', value: 5187582 },
                    { name: 'Connecticut', value: 3590347 },
                    { name: 'Delaware', value: 917092 },
                    { name: 'District of Columbia', value: 632323 },
                    { name: 'Florida', value: 19317568 },
                    { name: 'Georgia', value: 9919945 },
                    { name: 'Hawaii', value: 1392313 },
                    { name: 'Idaho', value: 1595728 },
                    { name: 'Illinois', value: 12875255 },
                    { name: 'Indiana', value: 6537334 },
                    { name: 'Iowa', value: 3074186 },
                    { name: 'Kansas', value: 2885905 },
                    { name: 'Kentucky', value: 4380415 },
                    { name: 'Louisiana', value: 4601893 },
                    { name: 'Maine', value: 1329192 },
                    { name: 'Maryland', value: 5884563 },
                    { name: 'Massachusetts', value: 6646144 },
                    { name: 'Michigan', value: 9883360 },
                    { name: 'Minnesota', value: 5379139 },
                    { name: 'Mississippi', value: 2984926 },
                    { name: 'Missouri', value: 6021988 },
                    { name: 'Montana', value: 1005141 },
                    { name: 'Nebraska', value: 1855525 },
                    { name: 'Nevada', value: 2758931 },
                    { name: 'New Hampshire', value: 1320718 },
                    { name: 'New Jersey', value: 8864590 },
                    { name: 'New Mexico', value: 2085538 },
                    { name: 'New York', value: 19570261 },
                    { name: 'North Carolina', value: 9752073 },
                    { name: 'North Dakota', value: 699628 },
                    { name: 'Ohio', value: 11544225 },
                    { name: 'Oklahoma', value: 3814820 },
                    { name: 'Oregon', value: 3899353 },
                    { name: 'Pennsylvania', value: 12763536 },
                    { name: 'Rhode Island', value: 1050292 },
                    { name: 'South Carolina', value: 4723723 },
                    { name: 'South Dakota', value: 833354 },
                    { name: 'Tennessee', value: 6456243 },
                    { name: 'Texas', value: 26059203 },
                    { name: 'Utah', value: 2855287 },
                    { name: 'Vermont', value: 626011 },
                    { name: 'Virginia', value: 8185867 },
                    { name: 'Washington', value: 6897012 },
                    { name: 'West Virginia', value: 1855413 },
                    { name: 'Wisconsin', value: 5726398 },
                    { name: 'Wyoming', value: 576412 },
                    { name: 'Puerto Rico', value: 3667084 }
                ]
            }
        ]
    };
    myChart.setOption(option);
})




