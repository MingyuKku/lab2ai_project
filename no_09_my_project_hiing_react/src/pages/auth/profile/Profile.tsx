import React from 'react';
import Header from 'components/common/header/Header';
import VisualInfo from 'components/profile/VisualInfo';
import SettingAndInfoList from 'components/profile/SettingAndInfoList';
import { messageMixpanel } from 'hooks/useWebviewBridge';

const Profile = () => {

    React.useEffect(() => {
        messageMixpanel({
            tracking_type: 'event',
            event_name: 'view_profile',
        })
    }, [])

    return (
        <div className='user-profile-pages pt-basic-header bg-white h-full'>
            <Header />
            <div className="content">
                <VisualInfo />
                <SettingAndInfoList />
            </div>
        </div>
    )
}

export default Profile