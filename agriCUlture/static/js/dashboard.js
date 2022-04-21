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
window.onload = (function(){
    //get Time
    setInterval(function(){
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
        var dateShow = month[mon_no]+'/' + day + '/' + year + ' ' + date[date_no] + ' ' + h + ':' + m+':' + s;
        d.innerHTML =  dateShow;
        }
    ,1000)
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
            data: [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
            type: 'line',
            smooth: true,
            itemStyle: {
                color: '#00f2f1'
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



