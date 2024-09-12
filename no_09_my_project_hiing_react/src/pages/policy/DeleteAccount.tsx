import React from 'react'

const data = {
    title: `Hiing(하잉) 앱 계정 및 데이터 삭제 안내`,
    content: [
        {
            desc: `홈화면에서 ‘프로필’영역 터치 후 ‘나의 정보’를 확인해주세요.`,
            image: [
                `https://d25qtvpmz7kl1a.cloudfront.net/tutorial/img-withdrawal-01.png`,
                `https://d25qtvpmz7kl1a.cloudfront.net/tutorial/img-withdrawal-02.png`
            ]
        },
        {
            desc: `하단에 탈퇴 버튼 터치 후 ‘회원 탈퇴’를 진행해주세요.`,
            image: [
                `https://d25qtvpmz7kl1a.cloudfront.net/tutorial/img-withdrawal-03.png`,
                `https://d25qtvpmz7kl1a.cloudfront.net/tutorial/img-withdrawal-04.png`,
                `https://d25qtvpmz7kl1a.cloudfront.net/tutorial/img-withdrawal-05.png`,
            ]
        },
        {
            desc: `아래 화면이 나오면 회원 탈퇴가 완료되며, 계정이력 및 정보는 개인정보처리방침에 따라 처리됩니다.`,
            image: [
                `https://d25qtvpmz7kl1a.cloudfront.net/tutorial/img-withdrawal-06.png`,
                `https://d25qtvpmz7kl1a.cloudfront.net/tutorial/img-withdrawal-07.png`,
            ]
        },
    ],
    info: {
        title: `삭제되거나 보간되는 데이터 유형 및 추가 보관기간 안내`,
        desc: [
            `① 회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.`,
            `② 개인정보 처리 및 보유 기간은 다음과 같습니다.`
        ],
        articles: [
            {
                label: `1. 회사 내부 방침에 의한 정보 보유 사유`,
                ul: [
                    {
                        subLabel: `부정 이용기록`,
                        p: [
                            {
                                text: `보존 사유: 부정 이용 방지를 위한 개인정보 보유`,
                            },
                            {
                                text: `보존기간 : 1년`,
                                isBold: true
                            },
                        ]
                    },
                    {
                        subLabel: `서비스 이용기록`,
                        p: [
                            {
                                text: `보존 사유: 사용자 경험 향상 및 서비스 성능 고도화 연구를 위한 한시적 보유`,
                            },
                            {
                                text: `보존기간 : 연구 목적 달성 시까지`,
                                isBold: true
                            },
                        ]
                    },
                    {
                        subLabel: `비식별처리된 서비스 이용기록`,
                        p: [
                            {
                                text: `보존사유: 인공지능 대화 알고리즘 개선을 위한 가명정보 보유`,
                            },
                            {
                                text: `보존기간 : 5년`,
                                isBold: true
                            },
                        ]
                    }
                ]
            }
        ],
        connect: {
            label: `*추가 문의 및 담당자 연락처`,
            p: [
                `이    름  :  최수임`,
                `직    책  :  주식회사 비글즈 - 기획`,
                `연락처  :  010-7794-4689`
            ]
        }
    }
}

const DeleteAccount = () => {
    return (
        <div className='delete-account-page bg-white py-2 px-3.5'>
            <div>
                <h1 className='text-[18px] font-bold mb-5'>{ data.title }</h1>
            </div>
            <div className='mb-10'>
                {
                    data.content.map((content,idx) => (
                        <div key={ idx } className='mb-8 last:mb-0'>
                            <div className='text-[15px] flex mb-6'>
                                <span className='mr-1'>{ idx + 1 }.</span>
                                <p>{ content.desc }</p>
                            </div>
                            <div className="image-wrap flex flex-col items-center">
                                {
                                    content.image.map((img,i) => (
                                        <div key={ i } className="image-wrap max-w-[204px] mb-1">
                                            <img
                                                src={ img }
                                                alt={`img-${i}`}
                                                loading='lazy'
                                                width={200}
                                                height={340}
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            <div>
                <div className="title mb-7">
                    <h2 className='text-[18px] font-bold mb-4'>{ data.info.title }</h2>
                    {
                        data.info.desc.map((desc, idx) => (
                            <p key={ idx } className='text-[15px]'>{ desc }</p>
                        ))
                    }
                </div>
                <div className='mb-7'>
                    {
                        data.info.articles.map((article,idx) => (
                            <div key={ idx }>
                                <h2 className='text-[15px] font-bold mb-4'>{ article.label }</h2>
                                <ul>
                                    {
                                        article.ul.map((ul, i) => (
                                            <li key={ i } className='mb-2.5'>
                                                <h4 className='text-[15px]'>{ ul.subLabel }</h4>
                                                <div>
                                                    {
                                                        ul.p.map((p, ii) => (
                                                            <p key={ii} className={`text-[15px] ${p.isBold ? 'font-bold' : ''}`}>{ p.text }</p>
                                                        ))
                                                    }
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        ))
                    }
                </div>
                <div className='text-[15px]'>
                    <h3 className='mb-4'>{ data.info.connect.label }</h3>
                    <div>
                        {
                            data.info.connect.p.map((p, idx) => (
                                <p key={ idx }>{ p }</p>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteAccount;