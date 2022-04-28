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
//    //set default date value as today
//    var now = new Date();
//    var day = ("0" + now.getDate()).slice(-2);
//    var month = ("0" + (now.getMonth() + 1)).slice(-2);
//    var today = now.getFullYear() + "-" + month + "-" + day;
//    todayDoc = document.getElementById('date')
//    todayDoc.value = today;
//    todayDoc.setAttribute("max", today);
})();



//time_vs_price
(function () {
    var option = {
        //hover to show detail
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                        var res =
                          "<div style='margin-bottom:5px;padding:0 12px;width:100%;height:24px;line-height:24px;border-radius:3px;'><p>" +
                          params[0].name +
                          " </p></div>";
                        for (var i = 0; i < params.length; i++) {
                          if (params[i].data != '-' && params[i].data != params[(i + 1) % params.length].data){
                             res += `<div style="color: #fff;font-size: 14px; padding:0 12px;line-height: 24px">
                                 <span style="display:inline-block;margin-right:5px;border-radius:2px;width:10px;height:10px;background-color:${[ params[i].color,]};"></span>
                                 ${params[i].seriesName}
                                 ${params[i].data} USD
                               </div>`;
                          }

                          }
                        return res;
                        }
            },
        xAxis: {
            // category
            type: 'category',
            // x-axis
            data: null,
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
            data: null,
            type: 'line',
            smooth: true,
            itemStyle: {
                color: '#00f2f1'
            }
        },
        {
            name: 'Corn Predict',
            // data
            data: null,
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
            data: null,
            type: 'line',
            smooth: true,
            itemStyle: {
                color: '#ed3f35'
            }
        },
        {
            name: 'Wheat Predict',
            // data
            data: null,
            type: 'line',
            smooth: true,
            itemStyle: {
                normal: {
                    color: '#ed3f35',
                    lineStyle: {
                        width: 2,
                        type: 'dotted'
                    }
                }
            }

        },
        {
            name: 'Rice',
            // data
            data: null,
            type: 'line',
            smooth: true,
            itemStyle: {
                color: '#FFFAFA'
            }
        },
         {
            name: 'Rice Predict',
            // data
            data: null,
            type: 'line',
            smooth: true,
            itemStyle: {
                normal: {
                    color: '#FFFAFA',
                    lineStyle: {
                        width: 2,
                        type: 'dotted'
                    }
                }
            }

                },
        ]
    };
    $.ajax({
        type : 'post',
        url : '/ajax/json/',
        dataType : 'json',
        async:false,
        success : function(ret) {
//            console.log(ret)
            option.xAxis.data = ret.time;
            option.series[0].data = ret.corn_real;
            option.series[1].data = ret.corn_pred;
            option.series[2].data = ret.wheat_real;
            option.series[3].data = ret.wheat_pred;
            option.series[4].data = ret.rice_real;
            option.series[5].data = ret.rice_pred;
        },
        error : function(err) {
        }
    });
    var myechart = echarts.init($('.time_vs_price_line')[0]);
    myechart.setOption(option);
})();

//time_vs_weather_line
(function () {
    var option = {
        //hover to show detail
        tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                                var unit = ['°C', '°C', 'kPa', 'kPa', 'ppm', 'ppm', '%', '%', 'mm', 'mm']
                                var res =
                                  "<div style='margin-bottom:5px;padding:0 12px;width:100%;height:24px;line-height:24px;border-radius:3px;'><p>" +
                                  params[0].name +
                                  " </p></div>";
                                for (var i = 0; i < params.length; i++) {
                                  if (params[i].data != '-' && params[i].data != params[(i + 1) % params.length].data){
                                     res += `<div style="color: #fff;font-size: 14px; padding:0 12px;line-height: 24px">
                                         <span style="display:inline-block;margin-right:5px;border-radius:2px;width:10px;height:10px;background-color:${[ params[i].color,]};"></span>
                                         ${params[i].seriesName}
                                         ${params[i].data} ${unit[i]}
                                       </div>`;
                                  }

                                  }
                                return res;
                                }
                    },
        xAxis: {
            // category
            type: 'category',
            // x-axis
            data: null,
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
            data: null,
            type: 'line',
            smooth: true,
            itemStyle: {
                color: '#00f2f1'
            }
        },
        {
            name: 'Temperature Predict',
            // data
            data: null,
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
            name: 'Atmospheric pressure',
            // data
            data: null,
            type: 'line',
            smooth: true,
            itemStyle: {
                color: '#7CFC00'
            }
        },

        {
            name: 'Atmospheric pressure Predict',
            // data
            data: null,
            type: 'line',
            smooth: true,
            itemStyle: {
                normal: {
                    color: '#7CFC00',
                    lineStyle: {
                        width: 2,
                        type: 'dotted'
                    }
                }
            }

        },

        {
            name: 'Air Quality',
            data: null,
            type: 'line',
            smooth: true,
            itemStyle: {
                color: '#ed3f35'
            }
        },

        {
            name: 'Air Quality Predict',
            // data
            data: null,
            type: 'line',
            smooth: true,
            itemStyle: {
                normal: {
                    color: '#ed3f35',
                    lineStyle: {
                        width: 2,
                        type: 'dotted'
                    }
                }
            }

        },

        {
            name: 'Moisture',
            data: null,
            type: 'line',
            smooth: true,
            itemStyle: {
                color: '#FFFF00'
            }
        },

        {
            name: 'Moisture Predict',
            // data
            data: null,
            type: 'line',
            smooth: true,
            itemStyle: {
                normal: {
                    color: '#FFFF00',
                    lineStyle: {
                        width: 2,
                        type: 'dotted'
                    }
                }
            }

        },

        {
            name: 'Precipitation',
            // data
            data: null,
            type: 'line',
            smooth: true,
            itemStyle: {
                color: '#FFFAFA'
            }
        },
        {
            name: 'Precipitation Predict',
            // data
            data: null,
            type: 'line',
            smooth: true,
            itemStyle: {
                normal: {
                    color: '#FFFAFA',
                    lineStyle: {
                        width: 2,
                        type: 'dotted'
                    }
                }
            }

        },
        ]
    };
    $.ajax({
            type : 'post',
            url : '/ajax/json/',
            dataType : 'json',
            async:false,
            success : function(ret) {
//                console.log(ret)
                option.xAxis.data = ret.time;
                option.series[0].data = ret.temp_real;
                option.series[1].data = ret.temp_pred;
                option.series[2].data = ret.atmospheric_real;
                option.series[3].data = ret.atmospheric_pred;
                option.series[4].data = ret.airQuality_real;
                option.series[5].data = ret.airQuality_pred;
                option.series[6].data = ret.moisture_real;
                option.series[7].data = ret.moisture_pred;
                option.series[8].data = ret.precipitation_real;
                option.series[9].data = ret.precipitation_pred;
            },
            error : function(err) {
            }
        });
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




