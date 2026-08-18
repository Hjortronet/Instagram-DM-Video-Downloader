"use strict";
console.log("%c🚀 Instagram DM Video Downloader Interceptor Injected (Fetch + XHR)!", "color: orange; font-weight: bold;");
const originalFetch = window.fetch;
window.fetch = async (...args) => {
    const response = await originalFetch(...args);
    const clone = response.clone();
    clone.text().then(processPayload).catch(() => { });
    return response;
};
const originalXHRSend = window.XMLHttpRequest.prototype.send;
window.XMLHttpRequest.prototype.send = function (...args) {
    this.addEventListener('load', function () {
        if (this.responseType === '' || this.responseType === 'text') {
            processPayload(this.responseText);
        }
    });
    originalXHRSend.apply(this, args);
};
function processPayload(text) {
    if (!text || !text.includes('dash_manifest'))
        return;
    console.log("%c📦 Caught Instagram Media Payload!", "color: yellow; font-size: 14px;");
    const manifestMatch = text.match(/"dash_manifest":"((?:\\"|[^"])*)"/);
    if (manifestMatch) {
        console.log("🔍 Extracting Full XML Manifest...");
        const rawXml = manifestMatch[1]
            .replace(/\\"/g, '"')
            .replace(/\\n/g, '\n')
            .replace(/\\u003c/gi, '<')
            .replace(/\\u003e/gi, '>')
            .replace(/\\u0026/gi, '&')
            .replace(/\\\\/g, '\\');
        parseAndCopy(rawXml);
    }
}
function parseAndCopy(manifestXml) {
    let videoUrl = "";
    let audioUrl = "";
    let maxVideoBw = 0;
    const reps = [...manifestXml.matchAll(/<Representation[\s\S]*?<\/Representation>/gi)];
    for (const rep of reps) {
        const block = rep[0];
        const urlMatch = block.match(/<BaseURL[^>]*>(.*?)<\/BaseURL>/i);
        if (!urlMatch)
            continue;
        const url = urlMatch[1].replace(/&amp;/ig, '&');
        const isAudio = /audio/i.test(block);
        const bwMatch = block.match(/bandwidth=["']?(\d+)/i);
        const bandwidth = bwMatch ? parseInt(bwMatch[1]) : 0;
        if (isAudio) {
            audioUrl = url;
        }
        else {
            if (bandwidth > maxVideoBw) {
                maxVideoBw = bandwidth;
                videoUrl = url;
            }
        }
    }
    if (videoUrl && audioUrl) {
        const command = `ffmpeg -i "${videoUrl}" -i "${audioUrl}" -c copy "hd_video.mp4"`;
        window.postMessage({ type: 'INSTA_FFMPEG_CLIPBOARD', command }, '*');
        console.log("%c✅ SUCCESS! Command sent to clipboard.", "color: lime; font-weight: bold; font-size: 16px;");
    }
    else {
        console.error("❌ Failed to locate audio/video streams in manifest.");
        console.log("Snippet:", manifestXml.substring(0, 500));
    }
}
