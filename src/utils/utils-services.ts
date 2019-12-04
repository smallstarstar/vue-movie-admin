import { RoleCode } from '@/common/enums/role';
import { TimeSheetKey } from '@/common/enums/time-sheet-key';
const timeSheetKey = require('../components/timeSheet/time-sheet.json');
import { EventStatus } from '@/common/enums/event-status';


const utilServices = {
    getColor(level: number) {
        switch (level) {
            case 1:
                return {
                    background: '#00c300'
                };
            case 2:
                return {
                    background: '#009cff'
                };
            case 3:
                return {
                    background: '#ffd800'
                };
            case 4:
                return {
                    background: '#ff7800'
                };
            case 5:
                return {
                    background: '#ff0000'
                };
            default:
                break;
        }
    },

    getRoleInfo(code: number) {
        switch (code) {
            case RoleCode.ROLE_MANAGER:
                return '管理员';
            case RoleCode.ROLE_CUSTOMER:
                return '普通员工';
            case RoleCode.ROLE_REVIEW:
                return '待审员工';
            default:
                break;
        }
    },

    // // 状态的转化
    statusChange(status: number) {
        switch (status) {
            case EventStatus.NotDisposal:
                return '未处置';
            case EventStatus.Disposal:
                return '处置中';
            case EventStatus.FinishDisposal:
                return '处置完成';
            default:
                break;
        }
    },

    // 时间轴词条的转化
    changeTimeSheetKeys(messageKey: string) {
        if (messageKey === TimeSheetKey.SAVEEVENTMESSAGE) {
            return timeSheetKey.TimeSheet.saveEventInfoMessage;
        }
        if (messageKey === TimeSheetKey.ADDDETAILINFOMESSAGE) {
            return timeSheetKey.TimeSheet.addDetailInfoMessage;
        }
    },

    // 压缩图片
    compressionImg(event: any) {
        // 选择的文件是图片
        if (event.raw.type.indexOf("image") === 0) {
            return new Promise((reslove, reject) => {
                // 压缩图片需要的一些元素和对象
                var reader = new FileReader(),
                    //创建一个img对象
                    img: any = new Image();

                reader.readAsDataURL(event.raw);
                // 文件base64化，以便获知图片原始尺寸
                reader.onload = (e: any) => {
                    img.src = e.target.result;
                };

                // base64地址图片加载完毕后执行
                img.onload = function () {
                    // 缩放图片需要的canvas（也可以在DOM中直接定义canvas标签，这样就能把压缩完的图片不转base64也能直接显示出来）
                    const canvas: any = document.createElement('canvas');
                    const context: any = canvas.getContext('2d');

                    // 图片原始尺寸
                    const originWidth = this.width;
                    const originHeight = this.height;

                    // 最大尺寸限制，可通过设置宽高来实现图片压缩程度
                    const maxWidth = 200,
                        maxHeight = 200;
                    // 目标尺寸
                    let targetWidth = originWidth,
                        targetHeight = originHeight;
                    // 图片尺寸超过300x300的限制
                    if (originWidth > maxWidth || originHeight > maxHeight) {
                        if (originWidth / originHeight > maxWidth / maxHeight) {
                            // 更宽，按照宽度限定尺寸
                            targetWidth = maxWidth;
                            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                        } else {
                            targetHeight = maxHeight;
                            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                        }
                    }
                    // canvas对图片进行缩放
                    canvas.width = targetWidth;
                    canvas.height = targetHeight;
                    // 清除画布
                    context.clearRect(0, 0, targetWidth, targetHeight);
                    // 图片压缩
                    context.drawImage(img, 0, 0, targetWidth, targetHeight);
                    /*第一个参数是创建的img对象；第二三个参数是左上角坐标，后面两个是画布区域宽高*/
                    //压缩后的图片转base64 url
                    /*canvas.toDataURL(mimeType, qualityArgument),mimeType 默认值是'image/png';
                     * qualityArgument表示导出的图片质量，只有导出为jpeg和webp格式的时候此参数才有效，默认值是0.92*/
                    const newUrl = canvas.toDataURL('image/jpeg', 0.92);//base64 格式
                    return reslove(newUrl); 
                    //也可以把压缩后的图片转blob格式用于上传
                    // canvas.toBlob((blob)=>{
                    //     console.log(blob)
                    //     //把blob作为参数传给后端
                    // }, 'image/jpeg', 0.92)
                };

            })
        }
        else {
            alert('请上传图片格式');
        }


    }
}


export default utilServices;