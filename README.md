# FileRadar

🎯 Scan and map project structures with radar precision. Generate AI-ready file maps from any folder.

## Features

- **Right-click context menu**: Generate structure maps directly from the VS Code explorer
- **Clean JSON output**: Creates `sonar-file.json` with hierarchical folder and file structure
- **Configurable filtering**: Ignore specific folders like `node_modules`, `.git`, etc.
- **AI-optimized format**: Perfect for providing context to Large Language Models (LLMs)

## Usage

1. Right-click on any folder in the VS Code Explorer
2. Select **"🎯 Generate Sonar File"**
3. A `sonar-file.json` file will be created in that folder with the complete structure

## Example Output
```json
{
  "generated_at": "2025-10-04T19:30:00.000Z",
  "root_path": "/Users/you/project",
  "root_name": "project",
  "ignored_folders": ["node_modules", ".git"],
  "tree": [
    {
      "name": "src",
      "type": "folder",
      "children": [
        {
          "name": "index.js",
          "type": "file",
          "size": 1234,
          "extension": ".js"
        }
      ]
    }
  ]
}