import ReactECharts from 'echarts-for-react';
import {EChartsOption} from "echarts";

export const PieMainPage = (props: {
    data: { value: number, name: string, color?: string }[],
    color?: string,
    subtext?: string,
    chartName: string,
}) => {
    const option: EChartsOption = {
        title: {
            text: `граждан: ` + props.data.reduce((partialSum, it) => partialSum + it.value, 0).toString(),
            subtext: props.subtext,
            left: 'center',
            top: 'center'
        },
        ...props.color && {
            color: props.color
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/><b>{b}</b> : {c} ({d}%)'
        },
        xAxis: {show: false},
        yAxis: {show: false},
        series: [{
            name: props.chartName,
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2,
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 50,
            },
            label: {
                overflow: 'truncate',
                width: 120,
            },
            labelLayout: {},
            labelLine: {
                showAbove: true,
            },
            data: props.data.filter(it => it.value !== 0)
        }]
    };

    return (
        <ReactECharts
            option={option}
            style={{height: 400, width: '60%', display: 'inline-block'}}
        />
    );
};

