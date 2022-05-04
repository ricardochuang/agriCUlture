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
                    if (params[i].data != '-' && params[i].data != params[(i + 1) % params.length].data) {
                        res += `<div style="color: #fff;font-size: 14px; padding:0 12px;line-height: 24px">
                                 <span style="display:inline-block;margin-right:5px;border-radius:2px;width:10px;height:10px;background-color:${[params[i].color,]};"></span>
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
            name: 'Milk',
            // data
            data: null,
            type: 'line',
            smooth: true,
            itemStyle: {
                color: '#FFFAFA'
            }
        },
        {
            name: 'Milk Predict',
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
        {
            name: 'Cattle',
            // data
            data: null,
            type: 'line',
            smooth: true,
            itemStyle: {
                color: '#2E8B57'
            }
        },
        {
            name: 'Cattle Predict',
            // data
            data: null,
            type: 'line',
            smooth: true,
            itemStyle: {
                normal: {
                    color: '#2E8B57',
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
        type: 'post',
        url: '/ajax/json/',
        dataType: 'json',
        async: false,
        success: function (ret) {
            console.log(ret)
            option.xAxis.data = ret.time;
            option.series[0].data = ret.corn_real;
            option.series[1].data = ret.corn_pred;
            option.series[2].data = ret.wheat_real;
            option.series[3].data = ret.wheat_pred;
            option.series[4].data = ret.milk_real;
            option.series[5].data = ret.milk_pred;
            option.series[6].data = ret.cattle_real;
            option.series[7].data = ret.cattle_pred;
        },
        error: function (err) {
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
                    if (params[i].data != '-' && params[i].data != params[(i + 1) % params.length].data) {
                        res += `<div style="color: #fff;font-size: 14px; padding:0 12px;line-height: 24px">
                                         <span style="display:inline-block;margin-right:5px;border-radius:2px;width:10px;height:10px;background-color:${[params[i].color,]};"></span>
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
            name: 'Precipitation',
            // data
            data: null,
            type: 'line',
            smooth: true,
            itemStyle: {
                color: '#FFFAFA'
            }
        }
        ]
    };
    $.ajax({
        type: 'post',
        url: '/ajax/json/',
        dataType: 'json',
        async: false,
        success: function (ret) {
            //                console.log(ret)
            option.xAxis.data = ret.time;
            option.series[0].data = ret.temp_real;
            option.series[1].data = ret.precipitation_real;
        },
        error: function (err) {
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
            left: 'right'
        },
        tooltip: {
            trigger: 'item',
            showDelay: 0,
            transitionDuration: 0.2
        },
        visualMap: {
            left: 'right',
            min: -10,
            max: 30,
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
                name: 'Average Temperature',
                type: 'map',
                roam: true,
                map: 'USA',
                emphasis: {
                    label: {
                        show: true
                    }
                },
                data: null
            }
        ]
    };
    $.ajax({
        type: 'post',
        url: '/ajax/map/tem',
        dataType: 'json',
        async: false,
        success: function (ret) {
            // console.log(ret)
            const array = []
            for (var i in ret) {
                array.push(ret[i])
            }
            // console.log(array)
            option.series[0].data = array;
        },
        error: function (err) {
        }
    });
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
            left: 'right'
        },
        tooltip: {
            trigger: 'item',
            showDelay: 0,
            transitionDuration: 0.2
        },
        visualMap: {
            left: 'right',
            min: 0,
            max: 2000,
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
                name: 'Average Precipatation',
                type: 'map',
                roam: true,
                map: 'USA',
                emphasis: {
                    label: {
                        show: true
                    }
                },
                data: null
            }
        ]
    };
    $.ajax({
        type: 'post',
        url: '/ajax/map/pre',
        dataType: 'json',
        async: false,
        success: function (ret) {
            // console.log(ret)
            const array = []
            for (var i in ret) {
                array.push(ret[i])
            }
            // console.log(array)
            option.series[0].data = array;
        },
        error: function (err) {
        }
    });
    myChart.setOption(option);
})




