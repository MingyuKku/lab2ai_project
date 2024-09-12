export interface I18nText {
    pages: {
        news: {
            title: string;
            content: {
                aiCommend: string;
                lookAtRecentTitle_1: string;
                lookAtRecentTitle_2?: string;
            }
        };
        autotrade: {
            title: string;
            content: {
                popup: {
                    showTotalModel: string;
                    transactionHistoryTotalView: string;
                };
                profile: {
                    currentAmount: string;
                    originalAmount: string;
                    earningAmount: string;
                };
                yieldTrend: {
                    label: {
                        transite: string;
                        assets: string;
                        modelEarning: string;
                        changeRate: string;
                    }
                };
                assetConfigure: {
                    label: {
                        position: string;
                        coinName: string;
                    }
                };
                fallbackText: {
                    assets: string;
                }
            }
        }
    },
    labels: {
        more: string;
        startPrice: string;
        targetPrice: string;
        earning: string;
        goodNews: string;
        badNews: string;  
        ad: string;
        buy: string;  
        sell: string;  
    };
    footer: {
        warning: string;
        company: string;
        ceo: string;
        ceoName: string;
        companyNumber: string;
    }
}