<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';
import { createTypeAnnotationBasedOnTypeof } from '@babel/types';

const Donut = ref(null);
// const config = ref({});
// const data = ref({});
const data = {
    labels: ['process01', 'process02', 'process03', 'process04', 'process05'],
    datasets: [
        {
            data: [108, 147, 116, 83, 94],
            backgroundColor: ['#E3B85B', '#67B0C0', '#5FAF6E', '#1A73E8', '#E44D55'],
            cutout: '60%',
            borderWidth: 5,
            hoverOffset: 4,
        },
    ],
};
const shadow = {
    id: 'customCanvasShadow',
    beforeDraw: (chart) => {
        const { ctx } = chart;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 10;
        ctx.shadowBlur = 16;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    },
};
const donutOutLabelsLine = {
    id: 'donutOutLabelsLine',
    afterDraw: (chart) => {
        const {
            ctx,
            chartArea: { top, bottom, left, right, width, height },
        } = chart;

        chart.data.datasets.forEach((dataset, i) => {
            chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
                const { x, y } = datapoint.getCenterPoint();

                ctx.fillStyle = 'black';
                ctx.fillRect(x, y, 5, 5);
            });
        });
    },
};
const config = {
    type: 'doughnut',
    data: data,
    options: {
        maintainAspectRatio: false,
        layout: {
            padding: 20,
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    },
    plugins: [shadow, donutOutLabelsLine],
};
onMounted(() => {
    new Chart(Donut.value, config);
});
</script>

<template>
    <!-- Donut Chart -->
    <div class="chart-view">
        <canvas ref="Donut"></canvas>
    </div>
</template>

<style lang="scss" scoped>
.chart-view {
    max-width: 800px;
    height: 300px;
}
</style>
