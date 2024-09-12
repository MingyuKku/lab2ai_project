import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectMember } from '_redux/member/selector';
import { selectChatRoomInfo } from '_redux/chatInfo/selector';
import { selectChatFeedbackModal } from '_redux/modal/selector';
import { AppDispatch } from '_redux/store';
import { fetchChatFeedback } from '_redux/modal/thunks';
import RadioSelect, { RadioData } from 'components/common/ui-ux/RadioSelect';

const FeedbackInput = React.lazy(() => import('./FeedbackInput'));

interface Props {
    iosMobileScrollRef: React.RefObject<HTMLDivElement>;
}

const radioData: RadioData[] = [
    {
        label: '답변이 마음에 들지 않아요',
        code: 1,
    },
    {
        label: '나에게 위험한 말을 했어요',
        code: 3,
    },
    {
        label: '개인정보처럼 보이는 말을 했어요',
        code: 4,
    },
    {
        label: '직접 입력하기',
        code: 5,
    },
]

const PopupContent = ({ iosMobileScrollRef }: Props) => {
    const { se } = useSelector(selectMember);
    const dispatch = useDispatch<AppDispatch>();
    const { characterSe } = useParams();
    const { character_nm } = useSelector(selectChatRoomInfo);
    const { chatId } = useSelector(selectChatFeedbackModal);

    const feedbackUserTextName = 'feedback-text';
    const [ selectValue, setSelectValue ] = React.useState<number>(0);
    const [ error, setError ] = React.useState(false);
    
    const onChangeRadioHandle = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectValue(Number(e.target.value));
    }, [])

    const onSubmitFeedbackHandle = React.useCallback((e:React.FocusEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!se || !characterSe || !chatId || !selectValue) return;

        const target = e.target[feedbackUserTextName];

        if (target && selectValue === 5) { // 피드백 직접 입력하기 경우
            if (target.value.length < 15) {
                setError(true); return;
            }

            dispatch(fetchChatFeedback({
                member_se: se,
                character_se: Number(characterSe),
                character_nm: character_nm,
                chat_id: chatId,
                type_cd: selectValue,
                etc_ct: target.value
            }))
        } else {
            dispatch(fetchChatFeedback({
                member_se: se,
                character_se: Number(characterSe),
                character_nm: character_nm,
                chat_id: chatId,
                type_cd: selectValue,
            }))
        }
    }, [selectValue])

    return (
        <div>
            <h1 className='font-pretendard font-medium text-[18px] text-center'>{ character_nm } 피드백 하기</h1>
            <RadioSelect
                radioData={ radioData }
                selectValue={ selectValue }
                onChangeRadioHandle={ onChangeRadioHandle }
            />
            <form onSubmit={ onSubmitFeedbackHandle }>
                {
                    selectValue === 5 &&
                    <React.Suspense>
                        <FeedbackInput
                            selectValue={ selectValue }
                            name={ feedbackUserTextName }
                            error={ error }
                            iosMobileScrollRef={ iosMobileScrollRef }
                        />
                    </React.Suspense>
                }
                <button
                    type='submit'
                    className='d-button-st rounded-full w-full font-pretendard mt-[64px]'
                >피드백 보내기</button>
            </form>
        </div>
    )
}

export default PopupContent;