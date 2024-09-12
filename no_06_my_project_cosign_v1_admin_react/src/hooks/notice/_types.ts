import { CommonListRes } from "hooks/faq/_types";

export interface NoticeListRes extends CommonListRes {
    content: NoticeListItem[];
}

interface NoticeListItem {
    createdAt: string;
    id: number;
    title: string;
    updatedAt: string;
}


export interface NoticeDetailRes {
    content: string | null;
    createdAt: string;
    deleteCk: boolean;
    id: number;
    // noticeFileData: FileData[];
    noticeFileData: FileInstance[];
    title: string;
    updatedAt: string;
}

export interface FileData {
    createdAt: string;
    deleteCk: boolean;
    fileLink: string;
    fileName: string;
    fileSize: number | null;
    id: number;
    number: number;
    updatedAt: string;
}


export interface FileInstance extends FileData, File {
    isUpdate?: boolean;
};