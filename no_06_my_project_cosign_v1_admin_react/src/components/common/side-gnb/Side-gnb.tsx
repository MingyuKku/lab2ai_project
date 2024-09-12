import Bi from './Bi';
import { NavLink } from 'react-router-dom';
import { NAV_LIST } from 'constants/side-nav-list';


const SideGnb = () => {

    const isActiveNavClassName = (isActive: boolean) => {
        const baseClasses = 'flex items-center justify-start px-6 text-h4 h-14';
        const activeClasses = 'text-font-white font-medium bg-position-short';
        const inactiveClasses = 'text-font-dark-03 font-normal hover:bg-bg-dark-03 hover:bg-opacity-20 hover:text-font-dark-04';
        return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
    }

    return (
        <div className='min-h-viewScreen bg-bg-dark-04 w-full max-w-[230px] min-w-[160px]'>
            <div className="bi-image flex items-center justify-center h-[100px]">
                <Bi />
            </div>
            <ul>
                {
                    NAV_LIST.map((item,idx) => (
                        <li
                            key={idx}
                        >
                            <NavLink
                                to={ item.path ?? '/' }
                                className={ ({isActive}) => isActiveNavClassName(isActive) }
                            >
                                <h1 className=''>{ item.name }</h1>
                            </NavLink>

                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default SideGnb;
