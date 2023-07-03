import axios from 'axios';
const baseHost = 'http://192.168.6.69:3000'; // Mockoon
const headersConfig = {
    'Content-Type': 'application/json',
};

const taskRequest = axios.create({
    baseURL: `${baseHost}/api/task/`,
    headers: headersConfig,
});

//取得被稽催的人員和部門 (mock)
export const apiTaskReminders = (payload) => taskRequest.post('reminders', payload);
//取得被稽催的對象的稽催流程與其次數 (mock)
export const apiRemindersProcess = (payload) => taskRequest.post('reminders/prosses', payload);
