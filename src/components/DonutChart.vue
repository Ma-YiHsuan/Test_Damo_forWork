<script setup>
import { ref, onMounted, toRefs, onBeforeMount, watch } from 'vue';
import Chart from 'chart.js/auto';
console.log('::child setup');
const Donut = ref(null);
const props = defineProps({
    list: {
        type: Array,
        required: true,
    },
    labels: {
        type: Array,
        required: true,
    },
});
const { labels, list } = toRefs(props);
const data = {
    labels: labels.value,
    datasets: [
        {
            data: list.value,
            backgroundColor: ['#E3B85B', '#67B0C0', '#5FAF6E', '#1A73E8', '#E44D55'],
            cutout: '60%',
            borderWidth: 3,
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
        ctx.shadowColor = 'rgba(92, 100, 102, 0.2)';
    },
};
const donutOutLabelsLine = {
    id: 'donutOutLabelsLine',
    beforeDraw: (chart) => {
        const {
            ctx,
            chartArea: { top, bottom, left, right, width, height },
        } = chart;

        chart.data.datasets.forEach((dataset, i) => {
            chart.getDatasetMeta(i).data.forEach((dataPoint, index) => {
                const { x, y } = dataPoint.getCenterPoint();
                // draw line
                const halfWidth = width / 2;
                const halfHeight = height / 2;
                const xLine = x >= halfWidth ? x + 35 : x - 35;
                const yLine = y >= halfHeight ? y + 35 : y - 35;
                const extraLine = x >= halfWidth ? 120 : -120;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(xLine, yLine);
                ctx.lineTo(xLine + extraLine, yLine);
                ctx.strokeStyle = dataset.backgroundColor[index];
                ctx.stroke();
                //text
                const textWidth = ctx.measureText(dataset.data[index] + '次').width;
                const xPosition = x >= halfWidth ? xLine + extraLine - textWidth : xLine + extraLine;
                ctx.font = 'bold 16px sans-serif';
                ctx.fillStyle = '#5C6466';
                ctx.fillText(dataset.data[index] + '次', xPosition, yLine - 5);
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
            padding: 25,
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
    },
    plugins: [shadow, donutOutLabelsLine],
};
onBeforeMount(() => {
    console.log('::child BeforeMount');
});
onMounted(() => {
    console.log('::child Mounted');
    const DonutChart = new Chart(Donut.value, config);
    watch(labels, (newValue) => {
        data.labels = newValue;
        console.log(DonutChart.data);
        DonutChart.update();
    });
    watch(list, (newValue) => {
        data.datasets[0].data = newValue;
        console.log('::child watch');
        DonutChart.update();
    });
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
