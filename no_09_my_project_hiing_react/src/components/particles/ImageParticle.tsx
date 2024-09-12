import React from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadImageShape } from '@tsparticles/shape-image';
import { loadBasic } from "@tsparticles/basic";
import { loadFull } from "tsparticles";
import { type ISourceOptions, tsParticles } from "@tsparticles/engine";

interface Props {
    opt: ISourceOptions;
    className?: string;
}

const ImageParticle = ({ opt, className }: Props) => {

    const [init, setInit] = React.useState<boolean>(false);

    React.useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadFull(engine);
            // await loadBasic(engine);
            // await loadImageShape(tsParticles);
        })
        .then(() => {
            setInit(true);
        });
    }, []);

    const options: ISourceOptions = React.useMemo(() => {
        return {
            ...opt
        }
    }, [])

    if (init) {
        return (
            <Particles
                id="tsparticles"
                options={options}
                className={`fixed top-0 left-0 w-full h-full ${className ?? ''}`}
            />
        );
    }

    return <></>;
}

export default React.memo(ImageParticle);