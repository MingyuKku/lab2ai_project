export const useMenuList = () => {

    const menuList = [
        {
            href: `/customer/faq`,
            label: '고객센터',
        },
        {
            href: `/customer/notice`,
            label: '공지사항',
        },
        {
            // onClick: () => {
            //     console.log('오픈 이용약관 팝업!')
            // },
            href: `/policy/service`,
            label: '이용약관',
        },
        {
            // onClick: () => {
            //     console.log('오픈 개인정보 팝업!')
            // },
            href: `/policy/privacy`,
            label: '개인정보취급방침',
        },
    ]

    return {
        menuList,
    }
}