$('#post-form').on('submit', function(event){
    event.preventDefault();
    console.log("form submitted!"); // sanity check
    create_post();
});

function create_post() {
    console.log("create post is working!"); // sanity check
    console.log($('#year').val());
    console.log($('#agriculture').val());
    console.log($('#location').val());
    console.log($('#weather').val());
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
    var para = {
                "year": $('#year').val(),
                "agriculture" : $('#agriculture').val(),
                "location" : $('#location').val(),
                "weather" : $('#weather').val()
               };
    $.ajax({
        type : 'post',
        url : '/results/',
        dataType : 'json',
//            data: JSON.stringify(para),
        data: para,
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
};

