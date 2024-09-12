import { RoutesType } from "router/_types";

const productionMode = [ 'dev', 'main' ] as const; // 데브, 메인
export type ProductionType = typeof productionMode[number];


export type NavList = Pick<RoutesType, 'name' | 'path'>;


export interface TABLE_WIDTH {
    [key: string]: {
        width: number;
        maxWidth?: number;
        minWidth?: number;
    }
}