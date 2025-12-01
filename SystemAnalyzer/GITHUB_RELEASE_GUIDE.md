# SystemAnalyzer - GitHub Release Guide

This guide explains how to publish SystemAnalyzer executables to GitHub Releases and update the TestingSuite download link.

## 📦 Files to Upload

Located in `SystemAnalyzer/publish/`:

1. **WinForms Version (Recommended)**
   - File: `winforms/SystemAnalyzer.WinForms.exe`
   - Size: ~70-75 MB
   - Description: Graphical interface with real-time monitoring

2. **Console Version (Advanced Users)**
   - File: `console/SystemAnalyzer.Console.exe`
   - Size: ~65-70 MB
   - Description: Terminal interface with color-coded output

## 🚀 Step-by-Step: Create GitHub Release

### Option 1: Via GitHub Web Interface

1. **Navigate to Repository**
   ```
   https://github.com/YOUR_USERNAME/TestingSuite
   ```

2. **Go to Releases**
   - Click "Releases" in the right sidebar
   - Or visit: `https://github.com/YOUR_USERNAME/TestingSuite/releases`

3. **Create New Release**
   - Click "Draft a new release"
   - Or "Create a new release"

4. **Fill Release Information**
   ```
   Tag version: v1.0.0
   Release title: SystemAnalyzer v1.0.0 - CPU & RAM Monitoring
   
   Description:
   SystemAnalyzer is a Windows desktop application for monitoring CPU and RAM information.
   
   ## Features
   - CPU name, cores, and frequency monitoring
   - RAM usage tracking (total, used, available)
   - Real-time updates
   - Both GUI and Console interfaces
   
   ## Download
   - **Recommended**: SystemAnalyzer.WinForms.exe (Graphical interface)
   - **Advanced**: SystemAnalyzer.Console.exe (Terminal interface)
   
   ## Requirements
   - Windows 10/11
   - No additional dependencies (standalone executables)
   
   ## Usage
   1. Download the .exe file
   2. Double-click to run
   3. Allow Windows SmartScreen if prompted
   ```

5. **Upload Executables**
   - Drag and drop both `.exe` files into the "Attach binaries" box
   - Wait for upload to complete (may take 1-2 minutes)

6. **Publish Release**
   - Click "Publish release"
   - ✅ Your files are now hosted!

---

### Option 2: Via GitHub CLI (Advanced)

If you have GitHub CLI installed:

```powershell
# Navigate to SystemAnalyzer directory
cd d:\Codespace\TestingSuite\SystemAnalyzer

# Create release and upload files
gh release create v1.0.0 `
  publish\winforms\SystemAnalyzer.WinForms.exe `
  publish\console\SystemAnalyzer.Console.exe `
  --title "SystemAnalyzer v1.0.0 - CPU & RAM Monitoring" `
  --notes "Windows desktop application for CPU and RAM monitoring. See description for details."
```

---

## 🔗 Get Download URLs

After publishing the release:

1. **Go to your release page:**
   ```
   https://github.com/YOUR_USERNAME/TestingSuite/releases/tag/v1.0.0
   ```

2. **Right-click on the `.exe` files** → "Copy link address"

3. **URLs will look like:**
   ```
   https://github.com/YOUR_USERNAME/TestingSuite/releases/download/v1.0.0/SystemAnalyzer.WinForms.exe
   https://github.com/YOUR_USERNAME/TestingSuite/releases/download/v1.0.0/SystemAnalyzer.Console.exe
   ```

---

## ⚙️ Update TestingSuite Download Link

Open `src/app/tests/system-info/page.tsx` and update line 25:

**Before:**
```typescript
const DOWNLOAD_URL = "https://github.com/YOUR_USERNAME/YOUR_REPO/releases/download/v1.0.0/SystemAnalyzer.WinForms.exe";
```

**After:**
```typescript
const DOWNLOAD_URL = "https://github.com/MinhThuan2406/TestingSuite/releases/download/v1.0.0/SystemAnalyzer.WinForms.exe";
```

Replace `MinhThuan2406` with your actual GitHub username.

---

## 🔐 Windows SmartScreen Warning

Users may see a Windows Defender SmartScreen warning when downloading/running the `.exe`:

**Why?**
- Unsigned executables trigger SmartScreen
- Not enough users have downloaded the file yet

**How Users Can Run:**
1. Click "More info"
2. Click "Run anyway"

**To Prevent (Advanced):**
- Sign the executable with a code signing certificate
- Build reputation over time
- Distribute via Microsoft Store

---

## 📊 Track Downloads

GitHub automatically tracks:
- Number of downloads per file
- Download history

View stats on your release page:
```
https://github.com/YOUR_USERNAME/TestingSuite/releases
```

---

## 🔄 Future Updates

To release a new version:

1. Make changes to SystemAnalyzer code
2. Rebuild executables:
   ```powershell
   cd SystemAnalyzer
   dotnet publish SystemAnalyzer.WinForms\SystemAnalyzer.WinForms.csproj -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true -o publish\winforms
   ```
3. Create new GitHub release (e.g., `v1.1.0`)
4. Upload new executables
5. Update `DOWNLOAD_URL` in `system-info/page.tsx`

---

## 🆘 Troubleshooting

### "File too large" error
- GitHub has a 2GB limit per file (your files are ~70MB, so OK)
- If needed, compress with 7-Zip (but Windows may not auto-extract)

### "Asset not found" 404 error
- Check that release is published (not draft)
- Verify filename matches exactly

### Users can't download
- Ensure release is public
- Check repository visibility settings

---

## ✅ Checklist

- [ ] Build executables with `dotnet publish`
- [ ] Create GitHub release (v1.0.0)
- [ ] Upload both `.exe` files
- [ ] Copy download URLs
- [ ] Update `system-info/page.tsx` with actual URL
- [ ] Test download link from website
- [ ] Run downloaded `.exe` to verify it works

---

## 📝 Example Release Notes Template

```markdown
# SystemAnalyzer v1.0.0

🎉 **First release of SystemAnalyzer!**

## What's New
- ✅ CPU information monitoring (name, cores, frequency)
- ✅ RAM usage tracking (total, used, available)
- ✅ Real-time updates (1-second refresh)
- ✅ Both graphical (WinForms) and console interfaces
- ✅ Vietnamese and English support

## Download

### 🖥️ GUI Version (Recommended)
Download: [SystemAnalyzer.WinForms.exe](./SystemAnalyzer.WinForms.exe)
- Modern Windows Forms interface
- Progress bars and visual feedback
- File size: ~70 MB

### ⌨️ Console Version
Download: [SystemAnalyzer.Console.exe](./SystemAnalyzer.Console.exe)
- Terminal interface with colors
- Lightweight and fast
- File size: ~65 MB

## Requirements
- Windows 10/11 (64-bit)
- No additional dependencies

## Installation
1. Download the `.exe` file
2. Double-click to run
3. If Windows SmartScreen appears, click "More info" → "Run anyway"

## Screenshots
[Add screenshots here if available]

## Coming Soon
- Linux support
- macOS support
- GPU monitoring
- Network monitoring

---

**Full Changelog**: https://github.com/YOUR_USERNAME/TestingSuite/commits/v1.0.0
```

---

## 🎯 Next Steps

After creating the GitHub release:
1. Copy the download URL
2. Update `system-info/page.tsx` with real URL
3. Test the website
4. Share with users! 🎉
