'use client';

import { useViewportResize } from '@/hooks/app/use-viewport-resize';
import "@/utils/index";

const AppViewport = () => {

    useViewportResize();
    
    return null;
}

export default AppViewport;
