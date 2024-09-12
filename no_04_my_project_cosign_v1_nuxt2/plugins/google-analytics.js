export default({$config: {GTM_ID}}) => {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    
    gtag('config', GTM_ID);
    
    console.log(GTM_ID);
    
    window.gtag = gtag;
}