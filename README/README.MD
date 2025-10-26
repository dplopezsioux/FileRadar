
 

# 🚀 Publishing Guide – Step by Step

## 1) Update version in `package.json`

```json
"version": "x.x.x"
```
 

## 2) Save all files

* **Mac:** `Cmd + S`
* **Windows/Linux:** `Ctrl + S`
  Save **all open files** before continuing.



## 3) Test locally (optional but recommended)

1. Press **F5** to open the Extension Development Host.
2. Test your extension in the debug window.
3. Close the debug window when done.



## 4) Package the extension

```bash
vsce package
```

Wait for:

```
✔ DONE Packaged: file-radar-x.x.x.vsix
```



## 5) Publish to Marketplace

```bash
vsce publish
```

If it asks for your token, **paste it** (you won’t see it as you type — that’s normal).



## 6) Wait for confirmation

You should see:

```
✔ INFO  Publishing 'dplopez.file-radar vx.x.x'...
✔ DONE  Published dplopez.file-radar vx.x.x.
```



## 7) Verify publication

After **10–15 minutes**, visit:

```
https://marketplace.visualstudio.com/items?itemName=dplopez.file-radar
```



## 8) Push to GitHub

```bash
git add .
git commit -m "feat: add multi-language support (vx.x.x)"
git tag vx.x.x
git push origin main --tags
```



## ✅ Done!

**Marketplace URL:**
[https://marketplace.visualstudio.com/items?itemName=dplopez.file-radar](https://marketplace.visualstudio.com/items?itemName=dplopez.file-radar)



## 📋 Pre-Publish Checklist

* **CHANGELOG.md** → includes `[x.x.x]` entry with new features or fixes.
* **README.md** → updated with recent functionality (e.g., multi-language support).
* **package.json** → `"version": "x.x.x"`.
* **extension.js** → includes the latest code changes such as `Math.min(10, lines.length)`.

 
