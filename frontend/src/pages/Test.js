import React from 'react'
import ReactEcharts from 'echarts-for-react';

const Test = () => {

    const options = {
        title: {
            text: 'ECharts with React'
        },
        grid: {
          show: false
        },
        tooltip: {},
        xAxis: {
            data: ["1990","1991","1992","1993","1994","1995"]
        },
        yAxis: {},
        series: [{
            name: 'Test',
            type: 'line',
            data: [5, 20, 36, 10, 10, 20]
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

export default Test
