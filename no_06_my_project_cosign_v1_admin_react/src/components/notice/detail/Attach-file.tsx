import React from 'react';
import { FileData } from 'hooks/notice/_types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store/_types';
import { toggleModal } from 'store/modal/slice';

const ModalImage = React.lazy(() => import('components/common/modal/Image'));


interface Props {
    data: FileData[];
}


const AttachFile: React.FC<Props> = ({ data }) => {

    const dispatch = useDispatch<AppDispatch>();
    const [ openImageSrc, setOpenImageSrc ] = React.useState<string | null>(null);

    const onClickOpenImage = React.useCallback((link: string | null) => () => {
        dispatch(toggleModal(true));
        setOpenImageSrc(link);
    }, [])

    return (
        <React.Fragment>
            {
                openImageSrc &&
                <React.Suspense><ModalImage src={ openImageSrc } setSrc={ setOpenImageSrc } /></React.Suspense>
            }
            <div className='flex items-center min-h-12 border-b border-border-gray-03'>
            <div className='text-center shrink-0 w-1/5 min-w-[90px] text-body-2r text-font-dark-02'>첨부 파일</div>
            <div className='px-3 py-2'>
                {
                    data.map((item, idx) => (
                        <p key={ idx } onClick={ onClickOpenImage(item.fileLink) } className='cursor-pointer underline text-body-3r text-font-dark-02 hover:text-font-dark-01 mb-2 last:mb-0'>{ item.fileName }</p>
                    ))
                }
            </div>
        </div>
        </React.Fragment>
    )
}

export default AttachFile;
