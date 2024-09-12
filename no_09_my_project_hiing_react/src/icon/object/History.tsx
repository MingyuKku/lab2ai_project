import { messageMixpanel } from 'hooks/useWebviewBridge';
import React, { SVGProps } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

interface MyProps extends SVGProps<SVGSVGElement> {
    location?: string;
}

const History = (props: MyProps) => {

    const navigate = useNavigate();
    const { characterSe } = useParams();

    const onClickHistoryIcon = React.useCallback(() => {

        messageMixpanel({
            tracking_type: 'event',
            event_name: 'click_profile_history',
            param: {
                'location': props.location ?? ''
            }
        })
        
        const routeStrign = props.location ? `/character/${characterSe}/profile/history?before_location=${props.location}` : `/character/${characterSe}/profile/history`;
        navigate(routeStrign);
    }, [])

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg" 
            width="36" height="36" 
            viewBox="0 0 36 36" 
            fill="none"
            onClick={ onClickHistoryIcon }
            {...props}
        >
            <circle cx="18" cy="18" r="17.5" stroke="white"/>
            <path d="M12.01 11H13.518C13.5781 10.5835 13.7863 10.2026 14.1044 9.92714C14.4225 9.65165 14.8292 9.50001 15.25 9.5H23.25C24.112 9.5 24.9386 9.84241 25.5481 10.4519C26.1576 11.0614 26.5 11.888 26.5 12.75V20.75C26.5 21.1708 26.3483 21.5775 26.0729 21.8956C25.7974 22.2137 25.4165 22.4219 25 22.482V23.991C25.8164 23.928 26.5789 23.5592 27.1351 22.9583C27.6913 22.3575 28.0002 21.5688 28 20.75V12.75C28 12.1262 27.8771 11.5086 27.6384 10.9323C27.3997 10.356 27.0498 9.83232 26.6088 9.39124C26.1677 8.95016 25.644 8.60028 25.0677 8.36157C24.4915 8.12286 23.8738 8 23.25 8H15.25C14.4314 8.00009 13.643 8.30911 13.0423 8.86528C12.4416 9.42145 12.073 10.1838 12.01 11ZM8 15.25C8 14.388 8.34241 13.5614 8.9519 12.9519C9.5614 12.3424 10.388 12 11.25 12H20.75C21.612 12 22.4386 12.3424 23.0481 12.9519C23.6576 13.5614 24 14.388 24 15.25V24.75C24 25.1768 23.9159 25.5994 23.7526 25.9937C23.5893 26.388 23.3499 26.7463 23.0481 27.0481C22.7463 27.3499 22.388 27.5893 21.9937 27.7526C21.5994 27.9159 21.1768 28 20.75 28H11.25C10.8232 28 10.4006 27.9159 10.0063 27.7526C9.61197 27.5893 9.25369 27.3499 8.9519 27.0481C8.65011 26.7463 8.41072 26.388 8.24739 25.9937C8.08406 25.5994 8 25.1768 8 24.75V15.25ZM11.25 13.5C10.7859 13.5 10.3408 13.6844 10.0126 14.0126C9.68437 14.3408 9.5 14.7859 9.5 15.25V22.5H15.25C15.8467 22.5 16.419 22.7371 16.841 23.159C17.2629 23.581 17.5 24.1533 17.5 24.75V26.5H20.75C21.2141 26.5 21.6592 26.3156 21.9874 25.9874C22.3156 25.6592 22.5 25.2141 22.5 24.75V15.25C22.5 14.7859 22.3156 14.3408 21.9874 14.0126C21.6592 13.6844 21.2141 13.5 20.75 13.5H11.25ZM16 26.5V24.75C16 24.5511 15.921 24.3603 15.7803 24.2197C15.6397 24.079 15.4489 24 15.25 24H9.5V24.75C9.5 25.716 10.284 26.5 11.25 26.5H16Z" fill="white"/>
        </svg>
    )
}

export default History