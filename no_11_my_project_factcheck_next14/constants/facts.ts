import { CompletedFactMapping, Facts } from "./_types";



export const FACTS: CompletedFactMapping[] = Object.entries(Facts)
                                        .map(entrie => ({
                                            value: entrie[0],
                                            label: entrie[1].label,
                                            color: entrie[1].color,
                                            analysisComplete: entrie[1].analysisComplete
                                        }))
                                        .filter((item) => item.analysisComplete) as CompletedFactMapping[];