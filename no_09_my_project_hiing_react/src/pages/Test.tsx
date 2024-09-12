import { selectMember } from '_redux/member/selector';
import Header from 'components/common/header/Header'
import React from 'react'
import { useSelector } from 'react-redux';
import { CharactersClass, getCharacterList } from 'services/character';



const Test = () => {
    const { se } = useSelector(selectMember);
    const [ isPending, startTransition ] = React.useTransition();
    const [ state, setState ] = React.useState<CharactersClass[]>([]);

    React.useEffect(() => {
        async function fetchCharacters() {
            const res = await getCharacterList(122, 1, 5);
            // console.log('캐릭터 리스트', res)
            if (res) {
                startTransition(() => {
                    setState(res);
                })
                // setState(res);
            }
        }

        fetchCharacters();
    }, [])

    return (
        <div className='wrap h-auto bg-white pt-basic-header'>
            <h1>실험</h1>
            {
                isPending &&
                <div>로딩중...</div>
            }
            {
                !isPending &&
                <div>
                    {
                        state.map((item, idx) => (
                            <div key={ idx }>
                                <p>{ item.character_ct }</p>
                                <img src={ item.background_lk } alt="" />
                                <img src={ item.profile_thumbnail_lk } alt="" />
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default Test;