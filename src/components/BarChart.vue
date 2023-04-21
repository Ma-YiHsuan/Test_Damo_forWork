<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';
const Bar = ref(null);
const data = {
    labels: ['方總裁', '邢素蘭', '梁誌勇', '颯彌亞·伊沐洛·巴瑟蘭', '李燕萍', '褚冥漾', '劉文聰'],
    datasets: [
        {
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: 'rgba(241, 239, 247, 0.8)',
            borderColor: 'rgba(168, 159, 207, 1)',
            borderWidth: 1,
        },
    ],
};
const topLabels = {
    id: 'topLabels',
    afterDatasetsDraw: (chart) => {
        const {
            ctx,
            scales: { x, y },
        } = chart;
        ctx.fillStyle = '#757575';
        ctx.textAlign = 'center';
        ctx.fillText('65', x.getPixelForValue(0), chart.getDatasetMeta(0).data[0].y - 5);
    },
};
const config = {
    type: 'bar',
    data: data,
    options: {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    },
    plugins: [topLabels],
};

onMounted(() => {
    const BarChart = new Chart(Bar.value, config);
});
</script>

<template>
    <!-- Bar Chart -->
    <div class="chart-view">
        <canvas ref="Bar"></canvas>
    </div>
</template>

<style lang="scss" scoped>
.chart-view {
    width: 100%;
    height: 484px;
}
</style>
