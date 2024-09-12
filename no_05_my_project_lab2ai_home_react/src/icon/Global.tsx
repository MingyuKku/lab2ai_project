import React from 'react'

const Global = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        {...props}
    >
        <g clipPath="url(#a)" stroke="#fff" strokeWidth="1.5">
            <circle cx="10" cy="10" r="8.75"/>
            <path d="M10 18.75c.706 0 1.288-.384 1.729-.881.441-.498.805-1.176 1.095-1.949.581-1.552.926-3.645.926-5.92s-.345-4.369-.926-5.92c-.29-.773-.654-1.451-1.095-1.949-.44-.497-1.023-.881-1.729-.881-.706 0-1.288.384-1.729.881-.441.498-.805 1.176-1.095 1.949C6.595 5.63 6.25 7.725 6.25 10s.345 4.368.926 5.92c.29.773.654 1.451 1.095 1.949.44.497 1.023.881 1.729.881zM2 8h16M2 13h16"/>
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 0h20v20H0z"/>
            </clipPath>
        </defs>
    </svg>
  )
}

export default Global