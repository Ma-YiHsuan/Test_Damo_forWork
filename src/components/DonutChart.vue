<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

const Donut = ref(null);
// const config = ref({});
// const data = ref({});
const data = {
    labels: ['process01', 'process02', 'process03', 'process04', 'process05'],
    datasets: [
        {
            data: [108, 147, 116, 83, 94],
            backgroundColor: ['#E3B85B', '#67B0C0', '#5FAF6E', '#1A73E8', '#E44D55'],
            hoverOffset: 4,
        },
    ],
};
const config = {
    type: 'doughnut',
    data: data,
};
onMounted(() => {
    new Chart(Donut.value, config);
});
</script>

<template>
    <!-- Donut Chart -->
    <div>
        <canvas ref="Donut"></canvas>
    </div>
</template>

<style lang="scss" scoped></style>
