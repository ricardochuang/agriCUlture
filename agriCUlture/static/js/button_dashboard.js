$('#post-form').on('submit', function (event) {
    event.preventDefault();
    console.log("form submitted!"); // sanity check
    create_post();
});

function create_post() {
    //    console.log("create post is working!"); // sanity check
    //    console.log($('#year').val());
    //    console.log($('#agriculture').val());
    //    console.log($('#location').val());
    //    console.log($('#weather').val());
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
            boundaryGap: false,
            scale:true,
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
                color: '#E066FF'
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
                    color: '#E066FF',
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
    var option2 = {
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
            boundaryGap: false,
            scale:true,
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
                color: '#FF4500'
            }
        },
        ]
    };
    var option3 = {
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
    var option4 = {
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
        url: '/results/map',
        dataType: 'json',
        async: false,
        data: { "year": $('#year').val() },
        success: function (ret) {
            console.log(ret)
            const array = []
            for (var i in ret) {
                array.push(ret[i])
            }
            option3.series[0].data = array;
        },
        error: function (err) {
        }
    });

    $.ajax({
        type: 'post',
        url: '/results/map_pre',
        dataType: 'json',
        async: false,
        data: { "year": $('#year').val() },
        success: function (ret) {
            console.log(ret)
            const array = []
            for (var i in ret) {
                array.push(ret[i])
            }
            option4.series[0].data = array;
        },
        error: function (err) {
        }
    });


    var para = {
        "year": $('#year').val(),
        "agriculture": $('#agriculture').val(),
        "weather": $('#weather').val()
    };
    $.ajax({
        type: 'post',
        url: '/results/',
        dataType: 'json',
        data: para,
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
            option2.xAxis.data = ret.time;
            option2.series[0].data = ret.temp_real;
            option2.series[1].data = ret.precipitation_real;
        },
        error: function (err) {
        }
    });
    var myechart = echarts.init($('.time_vs_price_line')[0]);
    myechart.setOption(option);

    var myechart = echarts.init($('.time_vs_weather_line')[0]);
    myechart.setOption(option2);

    var myechart = echarts.init($('.location_vs_price_map')[0]);
    myechart.setOption(option3);

    var myechart = echarts.init($('.location_vs_weather_map')[0]);
    myechart.setOption(option4);
};

