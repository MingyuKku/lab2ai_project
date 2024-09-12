export interface LocaleTextType {
    visual: {
        title1: string;
        title2: string;
        descripton1: string;
        descripton2: string;
        descripton3: string;
    };
    about: {
        title: string[];
        items: {
                title: string;
                mobile: string[];
                deskTop: string[];
        }[];
    };
    service: {
        title: string;
        brand: string;
        desktop: string[];
        mobile: string[];
        link: string;
    };
    portfolio: {
        items: {
            imgUrl: string;
            title: {
                deskTop: string;
                mobile: string[];
            };
            desc: string;
        }[];
    };
    history: {
        date: string;
        text: {
            title: string;
            desc?: string[];
        }[];
    }[];
    media: {
        items: {
            date: string;
            text: string;
            href: string;
        }[];
    };
    youtube: {
        id: string;
        label: string;
    }[];
    company: {
        title: string[];
        ceo: {
            title: string;
            name: string;
            image: string;
            moImage: string;
            education: string[];
            thesis: {
                title: string;
                items: string[][];
            };
        };
        idealTalent: {
            title: string;
            contents: {
                icon: string;
                label: string;
                desc: string[];
            }[];
        };
        workLife: {
            title: string;
            subTitle: string;
            contents: {
                label: string;
                items: string[];
            }[];
        };
    };
    footer: {
        company: string;
        address: string;
    }
}