Disclaimer: Entirely made with Gemini.

# Instagram DM Video Downloader 🎬

A Chrome/Brave extension that bypasses Meta's DRM and DASH streaming architecture to let you download high-definition Instagram Direct Message videos.

Meta hides DM media inside nested GraphQL payloads and intentionally fragments the high-res video and audio into separate streams to prevent right-clicking and saving. This extension intercepts the raw `dash_manifest`, extracts the highest quality unencrypted audio and video URLs, and automatically copies the exact `ffmpeg` command to your clipboard to stitch them back together locally.

## ✨ Features
* **Bypasses XHR/Fetch Restrictions:** Catches hidden background requests made by Meta.
* **Aggressive Regex Parsing:** Ignores Meta's intentional JSON/XML formatting traps.
* **Auto-Saves to Downloads:** The generated command automatically drops the final `.mp4` into your `Downloads` folder with a clean timestamp so files never overwrite each other.

---

## 🛠️ Prerequisites

Because Instagram serves the HD video and audio as two separate files, you need **FFmpeg** installed on your system to download and multiplex them together.

### 1. Install FFmpeg

**Windows (Easiest Method):**
Open your Command Prompt or PowerShell as Administrator and run:
`winget install ffmpeg` 
*(Alternatively, use `choco install ffmpeg` if you use Chocolatey).*

**Windows (Manual Method):**
1. Download the latest release build from [gyan.dev](https://www.gyan.dev/ffmpeg/builds/).
2. Extract the `.zip` file and move the unzipped folder to `C:\ffmpeg`.
3. Open the Windows Start Menu, search for **Environment Variables**, and click **Edit the system environment variables**.
4. Click **Environment Variables...** at the bottom.
5. Under "System variables", find and select **Path**, then click **Edit...**
6. Click **New**, type `C:\ffmpeg\bin`, and click OK on all windows.

**macOS:**
Open your terminal and run:
`brew install ffmpeg`

**Linux:**
Open your terminal and run:
`sudo pacman -S ffmpeg` (Arch/Manjaro)
`sudo apt install ffmpeg` (Debian/Ubuntu)

### 2. Verify Installation
Restart your terminal and type `ffmpeg -version`. If a bunch of text pops up, you are ready to go!

---

## 🚀 Installation & Usage

1. Download this repository as a `.zip` file and extract it to a folder on your computer.
2. Open Chrome or Brave and navigate to `chrome://extensions/`.
3. Toggle **Developer mode** on in the top right corner.
4. Click Load unpacked in the top left. Select the extracted folder. (Note: If you downloaded this via GitHub's ZIP button, you may need to open the first folder and select the inner folder so Chrome can see the manifest.json file).
5. Open an Instagram Direct Message on your computer and hit play on a video.
6. A green success message will appear in your `F12` Developer Console, and the complete download command will be instantly copied to your clipboard.
7. Open your terminal, press `Ctrl + V` (or `Cmd + V`), and press Enter.

Your high-definition `.mp4` video will automatically download, sync the audio/video, and save directly to your `Downloads` folder!
