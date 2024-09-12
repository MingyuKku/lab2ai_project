import type { NitroApp } from 'nitropack';

export default defineNitroPlugin((nitroApp: NitroApp) => {

    // nitroApp.hooks.hook('render:response', (context) => {
    //     // console.log('니트로 response', context.headers.)

    //     if (context.headers) {
    //         context.headers['Cache-Control'] = `max-age=${60*60*24*7}`;
    //     }
    // })
})