import React from 'react';
import { useSelector } from 'react-redux';
import { selectMember } from '_redux/member/selector';
import { messageMixpanel, messageWebview } from 'hooks/useWebviewBridge';
import IconThickAngle from 'icon/arrow/ThickAngle';
import { getProfileRedDot, ProfileRedDot, SettingAndInfoListType } from 'services/redDot';

const RedDotCompo = React.lazy(() => import('components/common/ui-ux/RedDot'));


const settingAndInfoList: SettingAndInfoListType[] = [
    {
        label: '알림 설정',
        type: 1,
        webviewPath: '/notification_setting',
        mixpanel: 'click_alert'
    },
    {
        label: '공지사항',
        type: 2,
        webviewPath: '/notice_list',
        mixpanel: 'click_notice'
    },
    {
        label: '나의 정보',
        type: 3,
        webviewPath: '/user_information',
        mixpanel: 'click_my_info'
    },
    {
        label: '약관 및 정책',
        type: 4,
        webviewPath: '/term_and_policy_list',
        mixpanel: 'click_term'
    },
    {
        label: '의견 보내기',
        type: 5,
        webviewPath: '/send_feedback',
        mixpanel: 'click_inquiry'
    },
]

const versions = [
    '1.1.4031',
    '1.1.4032',
    '1.1.4033',
    // '1.2.4041',
]

const SettingAndInfoList = () => {
    const { se, appVer } = useSelector(selectMember);

    const [ redDotList, setRedDotList ] = React.useState<ProfileRedDot[]>([]);

    React.useEffect(() => {
        const fetchProfileRedDot = async () => {
            const res = await getProfileRedDot(se!)
            if (res) {
                setRedDotList(res);
            }
        }
        
        fetchProfileRedDot();
        
    }, [])

    const onClickInfoHandle = React.useCallback((webviewPath: string, mixpanel: string) => {
        if (!appVer) return;
        
        return () => {
            messageMixpanel({
                tracking_type: 'event',
                event_name: mixpanel,
            })
            
            messageWebview({
                type: 'push',
                path: versions.includes(appVer) ? '/home' + webviewPath : webviewPath,
            })
        }
        
    }, [appVer])

    return (
        <div>
            {
                settingAndInfoList.map((item, idx) => (
                    <div
                        key={ idx }
                        onClick={ onClickInfoHandle(item.webviewPath, item.mixpanel) }
                        className='flex items-center justify-between px-3.5 py-[20px] cursor-pointer'
                    >
                        <div className="left">
                            <div className='relative'>
                                <span className='font-pretendard text-[15px]'>{ item.label }</span>
                                {/* { 
                                    redDotList.find(dot => (dot.type_cd === item.type && dot.red_dot)) &&
                                    <React.Suspense>
                                        <RedDotCompo
                                            top={ 2 }
                                        />
                                    </React.Suspense>
                                } */}
                            </div>
                        </div>
                        <div className="right">
                            <IconThickAngle width={15} fill='#CACACA' className='rotate-180' />
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default SettingAndInfoList