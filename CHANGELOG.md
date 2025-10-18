# Change Log

All notable changes to the "FileRadar" extension will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [0.2.1] - 2025-10-04

### Added
- 🏷️ **Stamp File Paths** command - Automatically adds file path comments to source files
- Support for JavaScript (.js) files with `/** * File: path */` format
- Support for Python (.py) files with `# File: path` format
- Auto-detection and replacement of existing path stamps (prevents duplicates)
- Recursive processing of all files in selected folder

### Changed
- Context menu items now appear in the modification section (lower position)
- Improved path normalization to use forward slashes consistently

### Fixed
- Better handling of relative paths across different operating systems

## [0.0.1] - 2025-10-04

### Added
- Initial release
- 🎯 **Generate Sonar File** command - Creates JSON file with project structure
- Right-click context menu integration for folders
- Configurable ignored folders (node_modules, .git, dist, etc.)
- Hierarchical tree structure with file metadata (size, extension, type)
- AI-optimized JSON output format for LLM context
- Support for recursive directory scanning

### Configuration
- `fileRadar.ignoredFolders` - Array of folder names to ignore during scanning

---

## Future Plans

- [ ] Support for more programming languages (TypeScript, JSX, C++, etc.)
- [ ] Custom stamp format configuration
- [ ] Option to remove stamps from files
- [ ] Markdown output format
- [ ] Export to multiple formats (JSON, YAML, XML)

---

**Enjoy using FileRadar!** 🎯