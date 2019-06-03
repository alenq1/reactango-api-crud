import React from 'react'
import ReactEcharts from 'echarts-for-react';

const LineChart = (props) => {

    const options = {
        title: {
            text: props.textchart
        },
        grid: {
          show: false
        },
        tooltip: {},
        xAxis: {
            data: props.xdata
        },
        yAxis: {},
        series: [{
            name: 'Test',
            type: props.typechart,
            data: props.ydata
        }]
    };

    return (
        
            
            <ReactEcharts
                option={options}
                notMerge={true}
                lazyUpdate={true}
                theme={"theme_name"}
              />
        
    )
}

export default LineChart
