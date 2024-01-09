export const supportsHEVCAlpha = () => {
    const navigator = window.navigator;
    const ua = navigator.userAgent.toLowerCase();
    const hasMediaCapabilities = !!(navigator.mediaCapabilities && navigator.mediaCapabilities.decodingInfo);
    const isSafari = ua.indexOf('safari') != -1 && !(ua.indexOf('chrome') != -1) && ua.indexOf('version/') != -1;
    const isiphone =
        /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    return (isSafari || isiphone) && hasMediaCapabilities;
};
