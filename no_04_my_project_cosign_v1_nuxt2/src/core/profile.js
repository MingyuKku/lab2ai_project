const getProfile = ({profile_origin}) => {
    let profile = {
        title: profile_origin.title,
        description: profile_origin.description,
        profileImage: profile_origin.profileImage,
        type: profile_origin.type
    };

    if(profile_origin.earningRate !== null) {
        profile.earningRate = parseFloat(profile_origin.earningRate.toFixed(2)) || 0;
        profile.earningRateSum = parseFloat(profile_origin.earningRateSum.toFixed(1)) || 0;
        profile.maxEarningRate = parseFloat(profile_origin.maxEarningRate.toFixed(1)) || 0;
        profile.successRate = parseFloat(profile_origin.successRate.toFixed(1)) || 0;
    }
    
    if(profile_origin.subscribeCount !== null) {
        profile.subscribeCount = profile_origin.subscribeCount;
    }

    let chartData = {
        isChart: false,
        mentorCurrentEarning: null,
        earningColor: null,
        currentMentorEarning: [],
        averageMentorEarning: [],
    };

    function earningColor() {
        if(chartData.mentorCurrentEarning < 0) return {color: '#2058EA'};
        else if(chartData.mentorCurrentEarning == 0) return {color: '#999'}
        else return {color: '#F53B57'}
    }

    if(profile_origin.earningRates.length > 0) {
        chartData.isChart = true;

        chartData.mentorCurrentEarning = (profile_origin.earningRates.reduce(function add(sum, currValue) {
            return sum + currValue.earningRate;
        }, 0) / profile_origin.earningRates.length).toFixed(2);

        chartData.earningColor = earningColor();

        chartData.currentMentorEarning = profile_origin.earningRates.map(value => {
            return {
                time: value.earningDate,
                value: Number(value.earningRate.toFixed(2))
            };
        })

        chartData.averageMentorEarning = profile_origin.totalEarningRates.map(value => {
            return {
                time: value.earningDate,
                value: Number(value.earningRate.toFixed(2))
            };
        });
    } else {
        chartData.isChart = false;
    }

    return {profile, chartData}
}

export default getProfile;

const detailMentorIds = [
    'dtw','rabbit','sns','news','rocket','updown','bottom','global','homerun','hoonbot','hoonbotlight', 'document'
]

export {detailMentorIds};