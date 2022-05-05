//set up
(function () {
    // 1. get size before load the website
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



//time_vs_price
(function () {
    // var run_times = 0;
    //get Time
    var interval = setInterval(function () {

        // run_times += 1;
        // if(run_times === 10){
        //     clearInterval(interval);
        // }
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
                                            var unit = ['°C', 'mm']
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
                                name: 'Precipitation',
                                // data
                                data: null,
                                type: 'line',
                                smooth: true,
                                itemStyle: {
                                    color: '#FF4500'
                                }
                            }
                            ]
                };
            $.ajax({
                type : 'post',
                url : '/ajax/json/stream/',
                dataType : 'json',
                async:false,
                success : function(ret) {
//                    console.log(ret)
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
                error : function(err) {
                }
            });
            var myechart = echarts.init($('.time_vs_price_line')[0]);
            myechart.setOption(option);

            var myechart = echarts.init($('.time_vs_weather_line')[0]);
            myechart.setOption(option2);
        })();
    }
        , 2000)
})();





