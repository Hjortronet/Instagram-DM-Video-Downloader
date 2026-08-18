"use strict";
console.log("%c🌉 Instagram DM Video Downloader Content Script Loaded!", "color: cyan; font-weight: bold;");
const script = document.createElement('script');
script.src = chrome.runtime.getURL('interceptor.js');
(document.head || document.documentElement).appendChild(script);
script.onload = () => script.remove();
window.addEventListener('message', async (event) => {
    if (event.source !== window || event.data.type !== 'INSTA_FFMPEG_CLIPBOARD')
        return;
    try {
        await navigator.clipboard.writeText(event.data.command);
        console.log("%c✅ FFmpeg command copied to clipboard!", "color: lime; font-size: 16px; font-weight: bold;");
        console.log(event.data.command);
    }
    catch (err) {
        console.error("Focus lost. Command printed below:");
        console.log(event.data.command);
    }
});
