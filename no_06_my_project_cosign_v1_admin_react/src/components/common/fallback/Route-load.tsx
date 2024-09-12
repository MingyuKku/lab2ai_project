import { Spin } from 'antd';
import SideGnb from '../side-gnb/Side-gnb';


const RouteLoad = () => {

    return (
        <div className='flex min-h-viewScreen'>
            <SideGnb />
            <div className='relative flex-1 bg-bg-black/10'>
                <Spin
                    className='absolute xy-center'
                    // tip="Loading..."
                    size='large'
                ></Spin>
            </div>
        </div>
    )
}

export default RouteLoad;
