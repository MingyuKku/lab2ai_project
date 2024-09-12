import React from 'react';
import Select from 'components/common/select/Select';
import { SelectValue } from 'components/common/select/_types';
import { MemberFetchPathParamType } from 'hooks/member/_types';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';


interface Props {
    changeFetchKey: React.Dispatch<React.SetStateAction<{
        key: MemberFetchPathParamType;
        keyword: string;
    } | undefined>>;
}
const SearchBar: React.FC<Props> = ({ changeFetchKey }) => {

    const navigate = useNavigate();

    const SELECT_VALUES: SelectValue<MemberFetchPathParamType>[] = [
        {
            key: 'email',
            label: '이메일',
        },
        {
            key: 'nickname',
            label: '닉네임',
        },
        {
            key: 'name',
            label: '이름',
        },
        {
            key: 'cellphone',
            label: '핸드폰',
        },
    ]

    // const [ selectValueIndex, setSelectValueIndex ] = React.useState(-1);
    const [ selected, setSelectItem ] = React.useState<SelectValue<MemberFetchPathParamType>>();
    


    const onFocusForm = React.useCallback((e: React.FocusEvent<HTMLFormElement>) => {
        e.currentTarget.classList.add('shadow-border-1');
    }, [])

    const onBlurForm = React.useCallback((e: React.FocusEvent<HTMLFormElement>) => {
        e.currentTarget.classList.remove('shadow-border-1');
    }, [])



    const onSubmitSearch = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // if (selectValueIndex < 0) return alert(`검색 분류를 선택하세요.`);
        if (!selected || !selected.key) return alert(`검색 분류를 선택하세요.`);

        const formData = new FormData(e.currentTarget);
        const inputValue = formData.get('keyword') as string;

        navigate('/member', { replace: true }); // 페이지 초기화를 위해

        changeFetchKey({
            key: selected.key,
            keyword: inputValue
        });


    }, [selected])


    return (
        <form
            onFocus={ onFocusForm }
            onBlur={ onBlurForm }
            onSubmit={ onSubmitSearch }
            className='flex items-center w-full max-w-[500px] p-2 border-2 border-position-short rounded-md transition-border-shadow'
        >
            <div className="left px-2">
                <Select<MemberFetchPathParamType>
                    placeHolder='검색분류'
                    values={ SELECT_VALUES }
                    selectedItem={ selected }
                    changeSelect={ setSelectItem }
                />
            </div>
            <input
                type="text"
                name='keyword'
                placeholder='검색 키워드 분류를 선택하시고 검색해 주세요.'
                className='none-st w-full text-body-3r placeholder:text-font-dark-03'
            />
            <div className="right px-2">
                <button type='submit'>
                    <SearchOutlined className='text-position-short text-[24px]' />
                </button>
            </div>
        </form>
    )
}

export default SearchBar;
