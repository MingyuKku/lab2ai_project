import './number';
import './string';
import './date';
import './object';


export const delayed = (timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>, timer: number) => {
    return new Promise<void>((resolve) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            resolve();
        }, timer)
    })
}