import { useNavigate } from 'react-router-dom';
import { tokenAxios } from '_fetch/token';
import { setRefreshCountStorage, setRefreshStringDataStorage } from 'services/token';
import { encryptData } from 'utils';

const SignIn = () => {

    const navigate = useNavigate();

    const onClickGetToken = async () => {
        try {

            const phoneNo = await encryptData('01042487200') ?? 'dcdrfjBDqaQDlIkoJ58VRg==';
            const deviceId = await encryptData('112') ?? 'nzKuXKBBV8oBtvtFOJ/2GQ==';

            const { data } = await tokenAxios().post('login/phone', {
                phone_no: phoneNo, // 내 핸드폰 암호화
                device_id: deviceId, // 임시 디바이스 번호 112 암호화
                authentication_data: 'abcd' + '1' // 임시
            })
    
            if (data) {
                const token = data.api_access_token;
                if (token) {
                    // 여기에 로컬 스토리지 셋팅
                    setRefreshStringDataStorage('abcd');
                    setRefreshCountStorage('1');
                    navigate('/', {
                        replace: true
                    })
                }
            }

        } catch (err) {
            console.log(err)
        }
        
    }

    return (
        <div>
            <br/>
            <br/>
            <br/>
            <button onClick={ onClickGetToken } className='bg-amber-100'>디바이스용 토큰 생성!</button>
        </div>
    )
}

export default SignIn