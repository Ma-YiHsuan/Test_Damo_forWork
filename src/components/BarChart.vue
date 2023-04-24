<script setup>
import { ref, onMounted, computed } from 'vue';
import { apiTaskReminders } from '@/utils/api.js';
import Chart from 'chart.js/auto';

const Bar = ref(null);
const props = defineProps({
    type: {
        type: String,
        required: true,
    },
});

const reminderData = {
    comId: 'company',
    depId: 'dep00000001',
    startDate: '2022-10-01',
    endDate: '2023-03-01',
    range: 15,
};

// new Chart
onMounted(async () => {
    const memList = ref([]);
    const depList = ref([]);
    try {
        const res = await apiTaskReminders(JSON.stringify(reminderData));
        if (res.data.msg === 'success') {
            if ('remindersInfo' in res.data.data) {
                memList.value = res.data.data.remindersInfo.memList;
                depList.value = res.data.data.remindersInfo.depList;
                memList.value.sort((a, b) => {
                    return b.number - a.number;
                });
                depList.value.sort((a, b) => {
                    return b.number - a.number;
                });
            }
        } else {
            console.log('code:: ', res.code);
            console.log('msg:: ', res.msg);
        }
    } catch (err) {
        console.error(err);
    }
    const nameLabels = computed(() => {
        if (props.type === 'MEM') {
            return memList.value.map((mem) => mem.name);
        } else if (props.type === 'DEP') {
            return depList.value.map((dep) => dep.name);
        }
    });
    const numData = computed(() => {
        if (props.type === 'MEM') {
            return memList.value.map((mem) => mem.number);
        } else if (props.type === 'DEP') {
            return depList.value.map((dep) => dep.number);
        }
    });
    const data = {
        labels: nameLabels.value,
        datasets: [
            {
                data: numData.value,
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

            chart.data.datasets[0].data.forEach((dataPoint, index) => {
                ctx.fillStyle = '#757575';
                ctx.textAlign = 'center';
                ctx.font = '12px sans-serif';
                ctx.fillText(dataPoint, x.getPixelForValue(index), chart.getDatasetMeta(0).data[index].y - 5);
            });
        },
    };
    const ticksOfRank = {
        id: 'ticksOfRank',
        afterDraw: (chart) => {
            const {
                ctx,
                scales: { x, y },
            } = chart;
            chart.data.labels.forEach((label, index) => {
                ctx.fillStyle = '#6E5FAF';
                ctx.textAlign = 'center';
                ctx.font = 'bold 14px sans-serif';
                ctx.fillText(`No.${index + 1}`, x.getPixelForValue(index), y.bottom + 20);
            });
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
                    ticks: {
                        color: '#757575',
                        padding: 10,
                        font: {
                            size: 14,
                        },
                    },
                    grace: 4,
                },
                x: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        color: '#757575',
                        padding: 20,
                        font: {
                            weight: 400,
                            size: 14,
                        },
                        callback: function (value) {
                            const name = this.getLabelForValue(value);
                            if (name.length > 4) {
                                return name.slice(0, 4) + '...';
                            } else {
                                return name;
                            }
                        },
                    },
                },
            },
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    yAlign: 'bottom',
                    displayColors: false,
                    titleMarginBottom: 0,
                    cornerRadius: 0,
                    callbacks: {
                        label: function (context) {
                            return '';
                        },
                    },
                },
            },
        },
        plugins: [topLabels, ticksOfRank],
    };
    new Chart(Bar.value, config);
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
