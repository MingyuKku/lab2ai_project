import { FactValuesType, Facts } from "@/constants/_types";

const DocList = ["url", "file", "text"] as const;

export type DocType = typeof DocList[number];



export interface HistoryDocumentJsonData {
    docsBottomDetailsInfos: DocsBottomDetailsInfo[];
    docsCreatedDateTime: string;
    docsFormat: string;
    docsOriginalText: string | null;
    docsRequesterName: string;
    docsStatus: FactValuesType;
    docsTitle: string;
    docsTopDetailInfo: DocsTopDetailInfo;
    docsUpdatedDateTime: string;
    objectId: ObjectId;
    seq: number;
}

export interface DocsBottomDetailsInfo {
    isClaim: string;
    claimProb: number;
    docsSentenceFactCheckResultInfo: DocsSentenceFactCheckResultInfo;
    query: string;
    queryId: number;
    sentence: boolean;
}   

interface DocsSentenceFactCheckResultInfo {
    detail: string | null;
    reference: string[] | null;
    result: FactValuesType | null;
}

interface DocsTopDetailInfo {
    docsTopDetailFactCheckResult: DocsTopDetailFactCheckResult;
    docsTopDetailReport: string;
    docsTopDetailTitle: string;
}

export type DocsTopDetailFactCheckResult = {
    [K in FactValuesType as typeof Facts[K] extends { analysisComplete: true } ? K : never ]: number;
}

// interface DocsTopDetailFactCheckResult {
//     FALSE: number;
//     MOSTLY_FALSE: number;
//     MOSTLY_TRUE: number;
//     PARTLY_TRUE: number;
//     TRUE: number;
//     UNCHECKABLE: number;
// }

interface ObjectId {
    date: string;
    timestamp: number;
}