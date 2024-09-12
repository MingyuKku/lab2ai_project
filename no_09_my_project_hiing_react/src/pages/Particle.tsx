import React from 'react';
import { sadness } from 'components/particles/options/shape';

// const TestParticle = React.lazy(() => import('components/particles/BasicParticle'));
const ShapeParticle = React.lazy(() => import('components/particles/ShapeParticle'));

const Particle = () => {
    return (
        <div>
            <React.Suspense>
                <ShapeParticle
                    opt={ sadness } 
                    className='relative z-[2]' 
                />
            </React.Suspense>
        </div>
    )
}

export default Particle