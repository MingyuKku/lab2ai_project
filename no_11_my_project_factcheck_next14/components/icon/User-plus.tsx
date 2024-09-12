import React from 'react'

interface Props {
    color?: string;
}
const UserPlus: React.FC<Props> = ({ color }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
            <path d="M1.89999 21.5998C1.89993 22.1521 2.3476 22.5998 2.89988 22.5999C3.45217 22.6 3.89993 22.1523 3.89999 21.6L1.89999 21.5998ZM2.9004 17.9995L3.9004 17.9996L2.9004 17.9995ZM13.1 15.3999C13.6523 15.3999 14.1 14.9522 14.1 14.3999C14.1 13.8476 13.6523 13.3999 13.1 13.3999V15.3999ZM22.1 16.5999C22.6523 16.5999 23.1 16.1522 23.1 15.5999C23.1 15.0476 22.6523 14.5999 22.1 14.5999V16.5999ZM16.7 14.5999C16.1477 14.5999 15.7 15.0476 15.7 15.5999C15.7 16.1522 16.1477 16.5999 16.7 16.5999V14.5999ZM18.4 18.2998C18.4 18.852 18.8477 19.2998 19.4 19.2998C19.9523 19.2998 20.4 18.852 20.4 18.2998H18.4ZM20.4 12.8998C20.4 12.3475 19.9523 11.8998 19.4 11.8998C18.8477 11.8998 18.4 12.3475 18.4 12.8998H20.4ZM13.9 5.9999C13.9 7.43584 12.7359 8.5999 11.3 8.5999V10.5999C13.8405 10.5999 15.9 8.54041 15.9 5.9999H13.9ZM11.3 8.5999C9.86405 8.5999 8.69999 7.43584 8.69999 5.9999H6.69999C6.69999 8.54041 8.75948 10.5999 11.3 10.5999V8.5999ZM8.69999 5.9999C8.69999 4.56396 9.86405 3.3999 11.3 3.3999V1.3999C8.75948 1.3999 6.69999 3.45939 6.69999 5.9999H8.69999ZM11.3 3.3999C12.7359 3.3999 13.9 4.56396 13.9 5.9999H15.9C15.9 3.45939 13.8405 1.3999 11.3 1.3999V3.3999ZM3.89999 21.6L3.9004 17.9996L1.9004 17.9994L1.89999 21.5998L3.89999 21.6ZM6.5004 13.3999C3.96009 13.3999 1.90068 15.4591 1.9004 17.9994L3.9004 17.9996C3.90056 16.5638 5.06457 15.3999 6.5004 15.3999V13.3999ZM6.5004 15.3999H13.1V13.3999H6.5004V15.3999ZM22.1 14.5999H19.4V16.5999H22.1V14.5999ZM19.4 14.5999H16.7V16.5999H19.4V14.5999ZM20.4 18.2998V15.5999H18.4V18.2998H20.4ZM20.4 15.5999V12.8998H18.4V15.5999H20.4Z" fill={ color ?? 'white' } />
        </svg>
    )
}

export default UserPlus;
