export interface User {
    name: string;
    id: string;
    email: string;
    auth: 'admin' | 'normal',
    createAt: string;
}