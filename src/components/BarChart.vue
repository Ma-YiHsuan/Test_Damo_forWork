<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import * as echarts from 'echarts';
import 'echarts-gl';

const BarChart = ref(null);
const BarOpacity = ref({});
const resizeHandler = (chart) => {
    window.addEventListener('resize', function () {
        chart.resize();
    });
};

// const data = [265, 169, 130, 91, 89, 55, 40];
const data = [
    [1, 265, 0],
    [2, 169, 0],
    [3, 130, 0],
    [4, 91, 0],
    [5, 89, 0],
    [6, 55, 0],
    [7, 40, 0],
];
const label = ['方總裁', '邢素蘭', '梁誌勇', '鐘鯨禮', '李燕萍', '春嬌', '劉文聰ver劉文聰'];

BarOpacity.value = {
    xAxis3D: {
        type: 'category',
        data: label,
    },
    yAxis3D: {
        show: false,
    },
    zAxis3D: {
        type: 'value',
    },
    grid3D: {
        show: false,
    },
    series: [
        {
            type: 'bar3D',
            color: ['#C3B9FF'],
            bevelSmoothness: 5,
            data: data.map((item) => {
                return {
                    value: [item[0], item[1], item[2]],
                };
            }),
        },
    ],
};

onMounted(() => {
    console.log(BarChart.value);
    const myChart = echarts.init(BarChart.value);
    // window.addEventListener('resize', resizeHandler(myChart));
    myChart.setOption(BarOpacity.value);
});
// onUnmounted(() => window.removeEventListener('resize', resizeHandler))
</script>

<template>
    <!-- Bar Chart -->
    <div class="bar-wrapper">
        <div class="chart-view" ref="BarChart"></div>
    </div>
</template>

<style lang="scss" scoped>
.bar-wrapper {
    width: 100%;
    padding: 20px;
    .chart-view {
        height: 600px;
        width: 100%;
    }
}
</style>
