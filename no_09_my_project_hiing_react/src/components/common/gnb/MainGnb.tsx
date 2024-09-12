import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectMember } from '_redux/member/selector';
import IconHome from 'icon/gnb/Home';
import IconChat from 'icon/gnb/Chat';
import IconProfile from 'icon/gnb/Profile';
import { getGnbRedDot, GnbRedDot } from 'services/redDot';
import { messageMixpanel } from 'hooks/useWebviewBridge';

const RedDotCompo = React.lazy(() => import('components/common/ui-ux/RedDot'));

interface GnbProps {
    id: string;
    label: string;
    to: string;
    type: number;
}

const gnbList: GnbProps[] = [
    {
        id: 'home',
        label: '홈',
        to: '/',
        type: 0,
    },
    {
        id: 'chat',
        label: '채팅',
        to: '/rooms',
        type: 1,
    },
    {
        id: 'profile',
        label: '프로필',
        to: '/profile',
        type: 0, // 없애기 위해 0
    }
]


const MainGnb = () => {
    const location = useLocation();
    const { se } = useSelector(selectMember);
    const [ , startTransition ] = React.useTransition();
    const [ gnbRedDots, setGnbRedDots ] = React.useState<GnbRedDot[]>([])

    React.useEffect(() => {
        const fetchGnbRedDot = async () => {
            const res = await getGnbRedDot(se!)
            if (res) {
                setGnbRedDots(res);
            }
        }

        startTransition(() => {
            fetchGnbRedDot();
        })
        
    }, [location])

    const getComponent = React.useCallback((id: string, isActive: boolean) => {
        if (id === 'home') return <IconHome active={ isActive } />
        else if (id === 'chat') return <IconChat active={ isActive } />
        else if (id === 'profile') return <IconProfile active={ isActive } />
        else return <React.Fragment />
    }, [])

    const drawRedot = React.useCallback((type: number) => {
        gnbRedDots.find(dot => (dot.type_cd === type && dot.red_dot)) 
    }, [])

    const onClickLinkHandle = React.useCallback((id: string) => {
        return () => {
            const getEventName = (id: string) => {
                if (id === 'home') return 'click_home';
                if (id === 'chat') return 'click_chat';
                if (id === 'profile') return 'click_profile';
                return '';
            }

            messageMixpanel({
                tracking_type: 'event',
                event_name: getEventName(id),
            });
        }
    }, [])


    return (
        <div className='main-bottom-gnb fixed bottom-0 z-40 max-w-desktop w-full bg-white h-gnb-bottom-header border-t-[1px] border-gray-05'>
            <div className="inner h-full flex items-center justify-around">
                {
                    gnbList.map((gnb, idx) => (
                        <Link
                            key={ idx }
                            to={ gnb.to }
                            onClick={ onClickLinkHandle(gnb.id) }
                            className='relative flex items-center justify-center flex-col h-full px-4 cursor-pointer'
                        >
                            { getComponent(gnb.id, location.pathname === gnb.to) }
                            <p
                                className={`
                                    font-pretendard text-[12px] font-semibold
                                    ${ location.pathname === gnb.to ? 'text-primary-01' : 'text-gray-400' }
                                `}
                            >{ gnb.label }</p>
                            {
                                gnbRedDots.find(dot => (dot.type_cd === gnb.type && dot.red_dot)) &&
                                <React.Suspense>
                                    <RedDotCompo
                                        size={ 8 }
                                        top={ 6 }
                                        right={ 16 }
                                    />
                                </React.Suspense>
                            }
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default React.memo(MainGnb);