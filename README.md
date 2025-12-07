# 🎯 FileRadar

> **Navigate your codebase like never before.** Scan, map, and stamp your project structure with radar precision.

[![Version](https://img.shields.io/visual-studio-marketplace/v/dplopez.file-radar?style=flat-square&color=blue)](https://marketplace.visualstudio.com/items?itemName=dplopez.file-radar)
[![Downloads](https://img.shields.io/visual-studio-marketplace/d/dplopez.file-radar?style=flat-square&color=green)](https://marketplace.visualstudio.com/items?itemName=dplopez.file-radar)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/dplopez.file-radar?style=flat-square&color=yellow)](https://marketplace.visualstudio.com/items?itemName=dplopez.file-radar)

## ✨ Overview

**FileRadar** is a powerful VS Code extension designed for developers who need to understand, document, and share their project structures efficiently. Whether you're feeding context to AI assistants, onboarding new team members, or documenting your architecture, FileRadar makes it effortless.

### 🚀 What makes FileRadar special?

- **📊 Smart Structure Mapping** - Generate comprehensive JSON representations of your entire project hierarchy with a single click
- **🎯 Token-Oriented Output** - Generates a highly compact, token-efficient JSON structure, perfect for maximizing context in AI models.
- **🏷️ Intelligent Path Stamping** - Automatically add file location comments to your source code for better context and navigation
- **🌍 Multi-Language Support** - Works with 16+ programming languages including JavaScript, TypeScript, Python, Java, C++, Go, Rust, and more
- **⚡ Lightning Fast** - Optimized detection reads only what's necessary, processing thousands of files in seconds
- **🎯 AI-Ready Output** - Perfect for providing context to ChatGPT, Claude, GitHub Copilot, and other LLMs
- **🔧 Highly Configurable** - Customize which folders to ignore, tailored to your workflow

### 💡 Perfect for:

- 🤖 **AI-Assisted Development** - Give language models complete project context
- 📚 **Documentation** - Quick visual representation of your codebase architecture
- 👥 **Team Collaboration** - Help new developers understand project structure instantly
- 🔍 **Code Reviews** - Share comprehensive project snapshots with reviewers
- 📦 **Project Planning** - Visualize and organize your file structure

---

## 🎬 Quick Start

### Generate Project Structure Map

Right-click any folder → **🎯 Generate Sonar File**

Creates a clean JSON file with your complete project hierarchy, metadata, and structure.

### Stamp File Paths (Batch)

Right-click any folder → **🏷️ Stamp File Paths**

Automatically adds location comments to all supported files in the folder.

### Stamp Single File

Right-click any supported file → **🏷️ Stamp This File**

Adds a location comment to that specific file instantly.

---

## 📸 Features in Action

### 📊 Structure Mapping (TOON Format)

FileRadar now uses a **Token-Oriented Object Notation (TOON)** format to generate highly compact JSON files. This minimizes token count, making it extremely efficient for use with Large Language Models (LLMs).

```json
{
  "t": "2025-12-07T22:10:00.000Z",
  "r": "my-project",
  "c": [
    {
      "n": "src",
      "y": "d",
      "c": [
        {
          "n": "index.js",
          "y": "f",
          "s": 1234,
          "e": ".js"
        }
      ]
    }
  ]
}
```

**Key Legend:**

| Key | Stands For  | Description                               |
|:---:|:------------|:------------------------------------------|
| `t` | time        | The ISO 8601 timestamp of when the map was generated. |
| `r` | root        | The name of the root folder that was scanned.      |
| `c` | children    | An array of files and folders within a directory. |
| `n` | name        | The name of the file or folder.           |
| `y` | type        | The type of item: `f` for file, `d` for directory. |
| `s` | size        | The size of the file in bytes.            |
| `e` | extension   | The file extension (e.g., `.js`, `.py`).    |


### 🏷️ Path Stamping

**JavaScript/TypeScript:**
```javascript
// File: src/components/Header.tsx
import React from 'react';

export default function Header() {
  return <h1>Welcome</h1>;
}
```

**Python/Ruby:**
```python
# File: src/utils/helpers.py
import os

def process_data(data):
    return data.strip()
```

**HTML:**
```html
<!-- File: public/index.html -->
<!DOCTYPE html>
<html>
  <head><title>App</title></head>
</html>
```

**CSS/SCSS:**
```css
/* File: styles/main.css */
body {
  margin: 0;
  padding: 0;
}
```

---

## 🌍 Supported Languages

FileRadar supports **16+ programming languages** with intelligent comment formatting:

| Language | Extensions | Comment Format |
|----------|------------|----------------|
| **JavaScript** | `.js`, `.jsx` | `// File: path` |
| **TypeScript** | `.ts`, `.tsx` | `// File: path` |
| **Python** | `.py` | `# File: path` |
| **HTML** | `.html` | `<!-- File: path -->` |
| **CSS/SCSS** | `.css`, `.scss` | `/* File: path */` |
| **Java** | `.java` | `// File: path` |
| **C/C++** | `.c`, `.cpp` | `// File: path` |
| **Go** | `.go` | `// File: path` |
| **Rust** | `.rs` | `// File: path` |
| **PHP** | `.php` | `// File: path` |
| **Ruby** | `.rb` | `# File: path` |
| **Swift** | `.swift` | `// File: path` |

Each language uses its native comment syntax for seamless integration with your codebase.

---

## ⚙️ Configuration

Customize which folders FileRadar ignores during scanning:
```json
{
  "fileRadar.ignoredFolders": [
    "node_modules",
    ".git",
    "dist",
    "build",
    ".vscode",
    "coverage",
    ".next",
    "out",
    "target"
  ]
}
```

**Settings → Extensions → FileRadar** or add to your `settings.json`

---

## 🎯 Use Cases

### 🤖 AI Context Generation
Feed your entire project structure to AI assistants for better, more contextual suggestions.

### 📚 Documentation
Generate up-to-date project structure diagrams for your documentation automatically.

### 🎓 Onboarding
Help new team members understand the codebase layout instantly with visual structure maps.

### 🔍 Code Navigation
File path stamps make it easy to locate files when reviewing code snippets or error logs.

### 📦 Architecture Planning
Visualize your project organization and plan refactoring with confidence.

### 🌐 Multi-Language Projects
Work seamlessly across different programming languages with automatic comment format detection.

---

## 🚀 Why FileRadar?

| Feature | Benefit |
|---------|---------|
| **One-Click Mapping** | No manual tree drawing or documentation |
| **Smart Detection** | Only reads first 50 lines for instant processing |
| **No Duplicates** | Intelligent detection prevents redundant stamps |
| **Universal Format** | Clean, parseable JSON for any tool or workflow |
| **Multi-Language** | 16+ languages with native comment syntax |
| **Zero Dependencies** | Lightweight and fast, no bloat |

---

## 📦 Installation

1. Open VS Code
2. Go to Extensions (`Cmd+Shift+X` / `Ctrl+Shift+X`)
3. Search for **"FileRadar"**
4. Click **Install**

Or install directly:
```bash
code --install-extension dplopez.file-radar
```

---

## 💖 Support the Project

**Hey! I'm Daniel** — I love building things that make life easier, smarter, and a little more inspiring. If something I created helped you, made your day easier, or just sparked an idea, a coffee means a lot. It keeps me creating, learning, and sharing with heart. ☕💛

<div align="center">

<a href="https://buymeacoffee.com/dplopez" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="50" width="210">
</a>

<a href="https://ko-fi.com/dplopez" target="_blank">
  <img src="https://storage.ko-fi.com/cdn/kofi2.png?v=3" alt="Ko-fi" height="50" width="210">
</a>

</div>

Every contribution helps me:
- ✨ Create more useful tools and extensions
- 📚 Share knowledge and tutorials
- 🚀 Keep projects maintained and updated
- 💡 Explore new ideas and innovations

---

## 🤝 Contribute & Connect

- **Found a bug?** [Open an issue](https://github.com/dplopezsioux/FileRadar/issues)
- **Have a feature idea?** [Start a discussion](https://github.com/dplopezsioux/FileRadar/discussions)
- **Want to contribute code?** Pull requests are welcome!
- **Just want to say thanks?** ⭐ Star the repo or [buy me a coffee](https://buymeacoffee.com/dplopez)!

---

## 📄 License

MIT © [Daniel Lopez](https://github.com/dplopezsioux)

---

<div align="center">
  <strong>⭐ If FileRadar helps you, consider giving it a star!</strong>
  <br><br>
  Made with ❤️ by <a href="https://github.com/dplopezsioux/FileRadar">Daniel Perez</a>
  <br>
  <sub>Building tools that make developers' lives easier, one extension at a time.</sub>
</div>