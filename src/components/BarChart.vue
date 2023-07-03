<script setup>
import { ref, onMounted, computed, onBeforeMount } from 'vue';
import { apiTaskReminders } from '@/utils/api.js';
import Chart from 'chart.js/auto';
console.log('::child setup');
const Bar = ref(null);
const tooltipBox = ref(null);
const props = defineProps({
    type: {
        type: String,
        required: true,
    },
    reminderData: {
        type: Object,
        required: true,
    },
});
const memList = ref([]);
const depList = ref([]);

// async function getReminders() {
//     try {
//         const res = await apiTaskReminders(JSON.stringify(props.reminderData));
//         if (res.data.msg === 'success') {
//             if ('remindersInfo' in res.data.data) {
//                 console.log('::child api');
//                 memList.value = res.data.data.remindersInfo.memList;
//                 depList.value = res.data.data.remindersInfo.depList;
//                 memList.value.sort((a, b) => {
//                     return b.number - a.number;
//                 });
//                 depList.value.sort((a, b) => {
//                     return b.number - a.number;
//                 });
//             }
//         } else {
//             console.log('code:: ', res.code);
//             console.log('msg:: ', res.msg);
//         }
//     } catch (err) {
//         console.error(err);
//     }
// }

// onBeforeMount(() => {
//     console.log('::child BeforeMount');
// });

// new Chart
onMounted(async () => {
    // await getReminders();
    console.log('::child mounted');
    // const nameLabels = computed(() => {
    //     if (props.type === 'MEM') {
    //         return memList.value.map((mem) => mem.name);
    //     } else if (props.type === 'DEP') {
    //         return depList.value.map((dep) => dep.name);
    //     }
    //     return [];
    // });
    // const numData = computed(() => {
    //     if (props.type === 'MEM') {
    //         return memList.value.map((mem) => mem.number);
    //     } else if (props.type === 'DEP') {
    //         return depList.value.map((dep) => dep.number);
    //     }
    //     return [];
    // });
    //Chart data
    const data = {
        labels: ['方總裁', '邢素蘭', '梁誌勇', '鐘鯨禮', '李燕萍', '春嬌', '劉文聰ver劉文聰'],
        datasets: [
            {
                data: [265, 169, 130, 91, 89, 55, 40],
                backgroundColor: 'rgba(241, 239, 247, 0.8)',
                borderColor: 'rgba(168, 159, 207, 1)',
                borderWidth: 1,
            },
        ],
    };
    //數值顯示在 Bar 上方
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
    //名字上方顯示紫色的排名
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
    // chart config
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
                    enabled: false,
                },
            },
            // onResize: (chart) => {
            //     if (chart.scales.x) {
            //         const ticksHeight = chart.scales.x.height - 10 + 'px';
            //         const ticksWidth = chart.scales.x.width + 'px';
            //         const ticksLeft = chart.scales.x.left + 'px';
            //         tooltipBox.value.style.setProperty('--height', ticksHeight);
            //         tooltipBox.value.style.setProperty('--width', ticksWidth);
            //         tooltipBox.value.style.setProperty('--left', ticksLeft);
            //         tooltipBox.value.style.setProperty('--amount', numData.value.length);
            //     }
            // },
        },
        plugins: [topLabels, ticksOfRank],
    };
    const BarChart = new Chart(Bar.value, config);
    // BarChart.config.options.onResize(BarChart);
});
</script>

<template>
    <!-- Bar Chart -->
    <div class="bar-wrapper">
        <!-- <div class="tooltip-box" ref="tooltipBox">
            <div v-show="props.type === 'MEM'" v-for="(item, index) of memList" :key="item.id" class="tooltip-item" :content="item.name" v-tippy></div>
            <div v-show="props.type === 'DEP'" v-for="(item, index) of depList" :key="item.id" class="tooltip-item" :content="item.name" v-tippy></div>
        </div> -->
        <div class="chart-view">
            <canvas ref="Bar"></canvas>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.bar-wrapper {
    position: relative;
    .tooltip-box {
        position: absolute;
        height: var(--height);
        width: var(--width);
        left: var(--left);
        bottom: 6px;
        .tooltip-item {
            display: inline-block;
            height: var(--height);
            width: calc(var(--width) / var(--amount));
            // background-color: teal;
            // opacity: 0.3;
        }
    }
    .chart-view {
        width: 100%;
        height: 484px;
    }
}
</style>
