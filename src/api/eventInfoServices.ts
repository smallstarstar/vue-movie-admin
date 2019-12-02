import axios from 'axios';
import { EventInfoUrl } from '@/url/event-url';
import { EventInfo } from '@/models/event-info';
import configBase from '../../public/config';


const BaseUrl = configBase.baseUrl;

const eventInfoServices = {

    // 保存事务信息
    async saveEventInfo(event: EventInfo) {
        const url = BaseUrl + EventInfoUrl.saveEvent;
        return await axios.post(url, event);
    },

    // 分页获取事务信息
    async getEventInfoByPage(page: number, size: number) {
        const url = BaseUrl + EventInfoUrl.getEventInfoByPage + '?page=' + page + '&size=' + size;
        return await axios.get(url);
    },

    // 添加事件的详细的处置信息
    async addDetailInfo(detailInfo: any) {
        const url = BaseUrl + EventInfoUrl.addDetailInfo;
        return await axios.post(url, detailInfo);
    },

    // 根据事件的id获取处置者详细的信息集合
    async getListDetailInfo(eventId: string) {
        const url = BaseUrl + EventInfoUrl.getListDetailInfo + '?eventId=' + eventId;
        return await axios.get(url);
    },

    // 根据事件的id获取事件的时间轴信息
    async getTimeSheetInfoByEventId(eventId: any) {
        const url = BaseUrl + EventInfoUrl.getTimeSheetInfoByEventId + '?eventId=' + eventId;
        return await axios.get(url);
    },

    // 添加标题的信息
    async saveTitelInfo(titleInfo: any) {
        const url = BaseUrl + EventInfoUrl.saveTitle;
        return await axios.post(url, titleInfo)
    },

    // 获取标题的集合信息
    async getTitleInfoList() {
        const url = BaseUrl + EventInfoUrl.getListTitle;
        return await axios.get(url);
    },

    // 添加电影的信息
    async addMovicesInfo(movicesInfo: any) {
        const url = BaseUrl + EventInfoUrl.saveMovicesInfo;
        return await axios.post(url, movicesInfo)
    },
    // 根据电影种类获取电影信息
    async getMovicesInfoByTitleId(titleId: string) {
        const url = BaseUrl + EventInfoUrl.getMovicesInfoByTitleId + '?id=' + titleId;
        return await axios.get(url);
    },

    // 根据标题的id删除标题的名称
    async deleteTitleById(id: string) {
        const url = BaseUrl + EventInfoUrl.deleteTitleById + '?id=' + id;
        return await axios.delete(url);
    },
    // 根据标题的id删除标题的名称
    async deleteMovicesInfoById(id: string) {
        const url = BaseUrl + EventInfoUrl.deleteMovicesInfoById + '?id=' + id;
        return await axios.delete(url);
    },

}

export default eventInfoServices;