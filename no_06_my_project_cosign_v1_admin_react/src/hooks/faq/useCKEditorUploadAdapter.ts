import { Editor } from '@ckeditor/ckeditor5-core';
import { useFetchFaq } from './useFetchFaq';
import React from 'react';
import { FileLoader, UploadResponse } from 'ckeditor5';




export const useCKEditorUploadAdapter = () => {

    const { loadFileToServer } = useFetchFaq();

    const customUploadAdapter = React.useCallback((loader: FileLoader, setFiles?: React.Dispatch<React.SetStateAction<string[]>>) => {
        return {
            upload(): Promise<UploadResponse> {
                return new Promise((resolve, reject) => {
                    const data = new FormData();

                    loader.file.then((file) => {
                        if (!file) {
                            reject('no file');
                            return;
                        }

                        data.append('addFile', file);
                        
                        loadFileToServer(data)
                        .then(res => {
                            if (res) {
                                if (setFiles) {
                                    setFiles((prev) => ([
                                        ...prev,
                                        res
                                    ]))
                                }
                                
                                resolve({
                                    default: res
                                })
                            }
                        })
                        
                    })
                    .catch(err => reject(err))
                })
            },
            abort() {
                // 업로드 취소 처리 (선택 사항)
            }
        }
    }, [])


    return {
        customUploadAdapter
    }
}


