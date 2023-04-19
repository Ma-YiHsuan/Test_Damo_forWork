<script setup>
import DonutChart from '@/components/DonutChart.vue';
</script>

<template>
    <div class="main-wrapper">
        <div class="wrapper">
            <DonutChart />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main-wrapper {
    background-color: #f6f7fb;
    padding: 24px;
    height: 100vh;
    .wrapper {
        background-color: #fff;
        border-radius: 32px;
        box-shadow: 80px 120px 100px rgba(99, 86, 158, 0.05);
    }
}
</style>
