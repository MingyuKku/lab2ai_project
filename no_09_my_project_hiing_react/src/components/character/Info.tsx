import React from 'react'
// import { Link } from 'react-router-dom';
import { CharacterInfoClass } from 'services/character';

interface Props {
    item: CharacterInfoClass;
}

const Info = ({
    item
}: Props) => {

    const colorStyle = React.useMemo(() => ({
        'color': item.character_info_color1
    }), [])

    const bgColorStyle = React.useMemo(() => ({
        'backgroundColor': item.character_info_color2
    }), [])

    return (
        <div className='-mt-[6%]'>
            <div
                className={`title text-center`}
                style={ colorStyle }
            >
                <h1 className='text-[32px] font-bold mb-1'>{ item.character_nm }</h1>
                {
                    item.character_info_ct.map((ct, idx) => (
                        <p key={ idx } className='text-[15px] font-semibold'>{ ct }</p>
                    ))
                }
            </div>
            <div className='flex items-center justify-center pt-[50px] pb-[64px]'>
                <div className="info">
                    <div className="meti flex items-start mb-3">
                        <div className='w-[108px]'>
                            <h2
                                className={`inline-block leading-none py-1.5 px-2.5 rounded-full text-white`}
                                style= { bgColorStyle }
                            >MBTI</h2>
                        </div>
                        <p className='text-[15px] text-gray-02'>{ item.character_info_mbti }</p>
                    </div>
                    <div className='favorite flex items-start mb-3'>
                        <div className='w-[108px]'>
                            <h2
                                className={`inline-block leading-none py-1.5 px-2.5 rounded-full text-white`}
                                style= { bgColorStyle }
                            >좋아하는 거</h2>
                        </div>
                        <div>
                            {
                                item.character_info_favorite.map((text, idx) => (
                                    <p key={ idx } className='text-[13px] text-gray-02'>{ text }</p>
                                ))
                            }
                        </div>
                    </div>
                    <div className='personality flex items-start'>
                        <div className='w-[108px]'>
                            <h2
                                className={`inline-block leading-none py-1.5 px-2.5 rounded-full text-white`}
                                style= { bgColorStyle }
                            >성격 및 성향</h2>
                        </div>
                        <div>
                            {
                                item.character_info_personality.map((text, idx) => (
                                    <p key={ idx } className='text-[13px] text-gray-02'>{ text }</p>
                                ))
                            }
                        </div>
                    </div>
                    {/* <Link to={`/character/${item.character_se}/comic_strip`} className='flex justify-center items-center border-[1px] border-[#FF763B] rounded-full h-9'>
                        <div className='font-pretendard font-medium text-[15px] text-primary-01'>{ item.character_nm } 네컷만화 보기</div>
                    </Link> */}
                </div>
            </div>
        </div>
    )
}

export default Info