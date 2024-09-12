import React from 'react'
import LoginCosignBi from './Login-cosign-bi';
import ProductionMode from './Production-mode';
import InputArea from './Input-area';



const LoginBox = () => {
    return (
        <div className='
            relative flex items-center flex-col
            bg-bg-white w-full max-w-[360px] rounded-2xl shadow-01 p-9
        '>
            <LoginCosignBi />
            <div className="production-mode w-full mt-space-top-lg">
                <ProductionMode />
            </div>
            <InputArea />
        </div>
    )
}

export default LoginBox;
