import { SVGProps } from 'react'

const MsgTail = (props:SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16" height="15"
            viewBox="0 0 16 15"
            // fill="none"
            {...props}
        >
            <path d="M6.45601 13.6719C7.23124 8.31941 6.22861 3.8046 0.0458984 0.770508H16.0002C16.0002 5.76344 13.1907 10.4772 8.04479 14.6548C7.3353 15.2307 6.32502 14.5764 6.45601 13.6719Z" />
        </svg>
    )
}

export default MsgTail