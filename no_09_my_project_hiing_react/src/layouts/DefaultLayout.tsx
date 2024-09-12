import { Outlet } from 'react-router-dom';
import { isDesktop } from 'react-device-detect';

const Default = () => {

    return (
        <div className='layout default-app-layout'>
            <main className={`mx-auto ${isDesktop ? 'w-desktop' : 'max-w-desktop w-full'}`}>
                <Outlet />
            </main>
        </div>
    )
}

export default Default;