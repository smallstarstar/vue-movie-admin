import axios from 'axios';
import loginUrl from '@/url/login-url';
import configBase from '../../public/config';
import { UserRegisterInfo } from '@/models/user-register-info';
import { PageInfo } from '@/models/page-info';


const BaseUrl = configBase.baseUrl;
const userLoginServices = {

    // 用户登录
    async userLoginSystem(userInfo: any) {
        const url = BaseUrl + loginUrl.userlogin;
        return await axios.post(url, userInfo);
    },

    // 用户注册
    async UserRegisterInfo(userRegister: UserRegisterInfo) {
        const url = BaseUrl + loginUrl.userRegiser;
        return await axios.post(url, userRegister);
    },

    // 分页获取用户信息
    async getUserInfoByPageAndSize(pageInfo: PageInfo) {
        const url = BaseUrl + loginUrl.getUserInfoByPageAndSize;
        return await axios.post(url, pageInfo);
    },

    async deleteUserInfoByUserId(id: string, roleId: any) {
        const url = BaseUrl + loginUrl.deleteUserInfoByUserId + '?id=' + id + '&roleId=' + roleId;
        return await axios.delete(url);
    }
}

export default userLoginServices;
