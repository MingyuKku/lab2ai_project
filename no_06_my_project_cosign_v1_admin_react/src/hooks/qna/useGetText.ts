import { GetDeviceInfoParam } from "./_types"

export const useGetText = () => {
    
    const deviceInfo = ({ platformType, appVersion, deviceModel, osVersionType, browserType }: GetDeviceInfoParam) => {
        return `
            ${platformType ? `플랫폼: ${platformType} / `:''}
            ${appVersion ? `코싸인 앱 버전: ${appVersion} / `:''}
            ${deviceModel ? `디바이스 모델: ${deviceModel} / `:''}
            ${osVersionType ? `OS 버전: ${osVersionType} / `:''} 
            ${browserType ? `브라우저 종류: ${browserType}`:''}
        `
    }
    

    return {
        deviceInfo,
    }
}