import axios from 'axios';
import loginUrl from '@/url/login-url';
import configBase from '../../public/config';
import { UserRegisterInfo } from '@/models/user-register-info';


const BaseUrl = configBase.baseUrl;
const userLoginServices = {

    // 用户登录
    async userLoginSystem(userInfo: any) {
        const url = BaseUrl + loginUrl.userlogin;
        return await axios.post(url, userInfo);
    },

    // 用户注册
    async UserRegisterInfo(userRegister: UserRegisterInfo) {
        const url = BaseUrl +loginUrl.userRegiser;
        return await axios.post(url, userRegister);
    }
}

export default userLoginServices;
