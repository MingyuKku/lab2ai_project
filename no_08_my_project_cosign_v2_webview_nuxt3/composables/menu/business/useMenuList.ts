export const useMenuList = () => {

    const menuList = [
        {
            href: `https://cosign/customer`,
            isNuxtRoute: false,
            label: '고객센터',
        },
        {
            href: `https://cosign/customer/notice`,
            isNuxtRoute: false,
            label: '공지사항',
        },
        {
            href: `/policy/privacy`,
            isNuxtRoute: true,
            label: '이용약관',
        },
        {
            href: `/policy/service`,
            isNuxtRoute: true,
            label: '개인정보취급방침',
        },
    ]

    return {
        menuList,
    }
}