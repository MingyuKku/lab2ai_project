import React from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadBasic } from "@tsparticles/basic";
import { type Container, type ISourceOptions } from "@tsparticles/engine";

interface Props {
    opt: ISourceOptions;
    className?: string;
}

const TestParticle = ({ opt, className }: Props) => {

    const [init, setInit] = React.useState<boolean>(false);

    React.useEffect(() => {

        initParticlesEngine(async (engine) => {
            await loadBasic(engine);
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
                id="tsparticles"
                options={options}
                className={`fixed top-0 left-0 w-full h-full ${className ?? ''}`}
            />
        );
    }

    return <></>;
}

export default TestParticle;

