<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import { apiRemindersProcess } from '@/utils/api.js';
import DonutChart from '@/components/DonutChart.vue';
import BarChart from './components/BarChart.vue';
console.log('::parent setup');
const reminderProcessData = ref({});
reminderProcessData.value = {
    comId: '',
    depId: '',
    startDate: '2022-10-01',
    endDate: '2023-03-01',
    range: 10,
    targetId: 'DEP00000001',
};
const reminderData = {
    comId: 'company',
    depId: 'dep00000001',
    startDate: '2022-10-01',
    endDate: '2023-03-01',
    range: 15,
};
const activeKey = ref('1');

const procReminderList = ref([]);
const procReminderLabels = ref([]);
apiRemindersProcess(JSON.stringify(reminderProcessData.value))
    .then((res) => {
        if (res.data.msg === 'success') {
            console.log('::parent api then');
            const processList = res.data.data.processList;
            if (processList.length !== 0) {
                processList.sort((a, b) => {
                    return b.number - a.number;
                });
                procReminderList.value = processList.map((proc) => proc.number);
                procReminderLabels.value = processList.map((proc) => proc.rootProcessName);
            }
        } else {
            console.log('code:: ', res.code);
            console.log('msg:: ', res.msg);
        }
    })
    .catch((err) => console.error(err));

onBeforeMount(() => {
    console.log('::parent BeforeMount');
});
onMounted(() => {
    console.log('::parent Mounted');
});
</script>

<template>
    <div class="main-wrapper">
        <div class="wrapper">
            <DonutChart :list="procReminderList" :labels="procReminderLabels" />
        </div>
        <div class="wrapper">
            <BarChart :type="'MEM'" :reminder-data="reminderData" />
            <!-- <f-tabs v-model:activeKey="activeKey">
                <f-tab-pane key="1" tab="人員催辦排名">
                    <BarChart :type="'MEM'" :reminder-data="reminderData" />
                </f-tab-pane>
                <f-tab-pane key="2" tab="部門催辦排名">
                    <BarChart :type="'DEP'" :reminder-data="reminderData" />
                </f-tab-pane>
            </f-tabs> -->
        </div>
    </div>
</template>

<style lang="scss">
.main-wrapper {
    background-color: #f6f7fb;
    padding: 24px;
    height: 100vh;
    .wrapper {
        background-color: #fff;
        border-radius: 32px;
        box-shadow: 80px 120px 100px rgba(99, 86, 158, 0.05);
        padding: 24px;
        margin-bottom: 24px;
    }
}
</style>
