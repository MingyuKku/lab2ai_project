import React from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadBasic } from "@tsparticles/basic";
import { loadFull } from "tsparticles";
// import { loadAll } from "@tsparticles/all"
// import { loadHeartShape } from '@tsparticles/shape-heart';
import { loadLineShape  } from '@tsparticles/shape-line';
import { type ISourceOptions, tsParticles } from "@tsparticles/engine";

interface Props {
    opt: ISourceOptions;
    className?: string;
}

const ShapeParticle = ({ opt, className }: Props) => {

    const [init, setInit] = React.useState<boolean>(false);

    React.useEffect(() => {

        initParticlesEngine(async (engine) => {
            // await loadLineShape(tsParticles);
            // await loadBasic(engine);
            await loadFull(engine);
            // await loadAll(engine);
        })
        .then(() => {
            setInit(true);
        });


    }, []);


    const options: ISourceOptions = React.useMemo(() => {
        return {
            ...opt
        }
    },[],);

    if (init) {
        return (
            <Particles
                id="tsparticles-shape"
                options={options}
                className={`${ className ?? '' }`}
            />
        );
    }

    return <></>;
}

export default ShapeParticle;

