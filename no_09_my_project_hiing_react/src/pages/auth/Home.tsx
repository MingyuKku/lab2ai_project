import React from 'react'
import { getMemberTokenStorage, webTestRefreshToken } from 'services/token';
import Characters from 'components/home/Characters';


const Home = () => {

    const onClickRefresh = async () => {
        // const cookies = new Cookies();
        // const accToken = cookies.get('hiing-acc');
        const token = getMemberTokenStorage();

        webTestRefreshToken(token);
    }


    return (
        <div className="home overflow-hidden h-full">
            <Characters />
        </div>
    )
}

export default Home;