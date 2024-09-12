export const messageWebview = (msg:string) => {
    try {
        console.log(`MessageHelper ${msg}`)
        window.flutter_inappwebview.callHandler('MessageHelper', msg)
    
    } catch (err) { console.log(err) }
}