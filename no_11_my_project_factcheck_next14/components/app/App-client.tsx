'use client'

import "@/utils/index";
import { useViewportResize } from '@/hooks/app/use-viewport-resize';
import { useAuthCheck } from '@/hooks/app/use-auth-check';

const AppClient = () => {
    useViewportResize();
    useAuthCheck();
    
    return null;
}

export default AppClient;
