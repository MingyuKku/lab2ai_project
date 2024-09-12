import { headAndShoulders, penants, triangles, xabcds, type MultipointShape, type PatternType, type Point } from "~/composables/coin/tv-tech-chart/services/_types";
import type { CTVChart } from "../widget/CTVChart";
import type { ICTVElement } from "./ICTVElement";
import type { CreateMultipointShapeOptions, EntityId } from "~/public/charting_library/charting_library";

interface IDrawShapePoint {
    points: Point[];
    shape: "triangle_pattern" | "xabcd_pattern";
}


export class CTVPattern implements ICTVElement {
    private entityIds: EntityId[] = [];

    private patternScanId: number;
    private startSeconds: number;
    private endSeconds: number;

    private lineOptions: CreateMultipointShapeOptions<object>;
    private auxOptions: CreateMultipointShapeOptions<object> | null;
    private linePoints: Point[];
    private auxPoints: Point[];

    constructor(patternScanId: number, patternType: PatternType, points: Point[], startSeconds: number, endSeconds: number) {
        this.patternScanId = patternScanId;

        const isHeadAndShoulder = patternType in headAndShoulders;
        this.startSeconds = startSeconds;
        this.endSeconds = endSeconds;
        this.lineOptions = {
            shape: isHeadAndShoulder? 'head_and_shoulders' : 'trend_line',
            // shape: 'rectangle',
            lock: true,
            disableSelection: true,
            disableSave: true,
            disableUndo: true,
            text: "text",
            overrides: {
                'linewidth': 3,
                'linecolor': 'green',
            }
        }
        this.linePoints = points;

        if(!isHeadAndShoulder) {
            this.auxPoints = patternType in penants && points.length > 5? points.slice(1, 5) :
                            patternType in triangles && points.length > 4? points.slice(0, 4) :
                            patternType in xabcds && points.length > 5? points.slice(0, 5) :
                            [];
            this.auxOptions = {
                shape: patternType in xabcds? "xabcd_pattern": "triangle_pattern",
                lock: true,
            }
        } else {
            this.auxPoints = [];
            this.auxOptions = null;
        }
    }

    public show(ctvChart: CTVChart): void {
        const shapes: MultipointShape[] = [
            {
                points: this.linePoints,
                options: this.lineOptions,
            }
        ];

        if(this.auxOptions !== null) {
            shapes.push({
                points: this.auxPoints,
                options: this.auxOptions,
            });
        }

        this.entityIds = ctvChart.createMultipointShapes(shapes);
    }

    public hide(ctvChart: CTVChart): void {
        ctvChart.removeShapes(this.entityIds);
        this.entityIds = [];
    }

    public getPatternScanId(): number {
        return this.patternScanId;
    }

    public getStartSeconds(): number {
        return this.startSeconds;
    }

    public getEndSeconds(): number {
        return this.endSeconds;
    }

}