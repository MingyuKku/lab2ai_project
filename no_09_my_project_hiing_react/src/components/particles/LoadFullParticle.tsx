import React from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadFull } from "tsparticles";
import { type ISourceOptions } from "@tsparticles/engine";

interface Props {
    opt: ISourceOptions;
    className?: string;
}

const LoadFullParticle = ({ opt, className }: Props) => {

    const [init, setInit] = React.useState<boolean>(false);

    React.useEffect(() => {

        initParticlesEngine(async (engine) => {
            await loadFull(engine);
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

export default LoadFullParticle;

