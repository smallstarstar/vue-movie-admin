import axios from 'axios';
import { EventInfoUrl } from '@/url/event-url';
import { EventInfo } from '@/models/event-info';
import configBase from '../../public/config';
import { PageInfo } from '@/models/page-info';


const BaseUrl = configBase.baseUrl;

const eventInfoServices = {

    // 保存事务信息
    async saveEventInfo(event: EventInfo) {
        const url = BaseUrl + EventInfoUrl.saveEvent;
        return await axios.post(url, event);
    },

    // 分页获取事务信息
    async getEventInfoByPage(pageInfo: PageInfo) {
        const url = BaseUrl + EventInfoUrl.getEventInfoByPage;
        return await axios.post(url, pageInfo);
    },

    // 添加事件的详细的处置信息
    async addDetailInfo(detailInfo: any) {
        const url = BaseUrl + EventInfoUrl.addDetailInfo;
        return await axios.post(url, detailInfo);
    },

    // 根据事件的id获取处置者详细的信息集合
    async getListDetailInfo(eventId: string) {
        const url = BaseUrl + EventInfoUrl.getListDetailInfo + '?id=' + eventId;
        return await axios.get(url);
    },

    // 根据事件的id获取事件的时间轴信息
    async getTimeSheetInfoByEventId(eventId: any) {
        const url = BaseUrl + EventInfoUrl.getTimeSheetInfoByEventId + '?id=' + eventId;
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
    // 根据电影种类获取电影信息(包含分页)
    async getMovicesByTitleIdAndPageAndSize(pageInfo: any) {
        const url = BaseUrl + EventInfoUrl.getMovicesByTitleIdAndPageAndSize;
        return await axios.post(url, pageInfo);
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

    // 更新用户角色信息
    async upDataUserRole(changeInfo: any) {
        const url = BaseUrl + EventInfoUrl.upDataUserRole;
        return await axios.put(url, changeInfo);
    },

    // 驳回事务信息
    async backEventInfo(evneInfo: any) {
        const url = BaseUrl + EventInfoUrl.backEventInfo;
        return await axios.put(url, evneInfo)
    }

}

export default eventInfoServices;