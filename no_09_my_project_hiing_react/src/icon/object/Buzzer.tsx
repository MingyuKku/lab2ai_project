import { SVGProps } from 'react'

const Buzzer = (props:SVGProps<SVGSVGElement>) => {
  return (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="#CACACA"
        {...props}
    >
        <path d="M2.24 13.04c0-.53.43-.96.96-.96h9.6c.53 0 .96.43.96.96v.96H2.24v-.96Z"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M12.8 11.6V6.8c0-2.65-2.15-4.8-4.8-4.8s-4.8 2.15-4.8 4.8v4.8h9.6Zm-5.52-6.28c0-.4.32-.72.72-.72.4 0 .72.32.72.72v3.4H7.28v-3.4Zm1.44 3.88H7.28v.96h1.44v-.96Z"/>
    </svg>
  )
}

export default Buzzer;