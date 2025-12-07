# Change Log

All notable changes to the "FileRadar" extension will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [0.4.3] - 2025-12-07

### Added
- `↗️ Open External Terminal` command to the folder context menu for quick access to the command line.

### Changed
- Improved and reorganized the context menu for a more intuitive and efficient workflow.

## [0.4.2] - 2025-12-07

### Added
- **TOON (Token-Oriented Object Notation)** format for highly compact JSON output, optimizing for LLM context.

### Changed
- The `sonar-file.json` output now uses the TOON format.
- Updated `README.md` to reflect the new TOON format and its key legend.

## [0.3.2] - 2025-10-04

### Added
- **Smart path update detection** - Automatically updates file path stamps when files are moved or relocated
- Robust regex pattern matching for precise stamp detection across all languages
- Status return system - Functions now indicate if files were modified or skipped

### Changed
- **Ultra-optimized detection** - Now reads only first 10 lines instead of 50 (5x faster)
- Enhanced stamp detection with language-specific regex patterns for accuracy
- Improved path extraction to handle all comment formats correctly

### Improved
- No false positives - Only detects actual FileRadar stamps, ignores regular comments containing "File:"
- Better handling of files with headers, shebangs, or license comments
- More efficient processing for large codebases with thousands of files

### Fixed
- Stamps now update correctly when files are moved between folders
- Prevents unnecessary rewrites when stamp already has correct path
- Better whitespace handling in stamp detection

## [0.3.0] - 2025-10-04

### Added
- 🌍 **Multi-language support** - Now supports 16+ programming languages
- Support for TypeScript (`.ts`, `.tsx`)
- Support for React JSX (`.jsx`)
- Support for HTML (`.html`) with `<!-- -->` comment format
- Support for CSS/SCSS (`.css`, `.scss`) with `/* */` comment format
- Support for Java (`.java`)
- Support for C/C++ (`.c`, `.cpp`)
- Support for Go (`.go`)
- Support for Rust (`.rs`)
- Support for PHP (`.php`)
- Support for Ruby (`.rb`)
- Support for Swift (`.swift`)

### Changed
- **Universal stamp detection** - Now searches for "File:" keyword instead of language-specific patterns
- Improved detection algorithm for better performance across all languages
- Each language now uses its native comment syntax automatically

### Improved
- Better error messages showing all supported file types
- More efficient file processing with unified detection logic

## [0.2.4] - 2025-10-04

### Added
- 🏷️ **Stamp This File** command - Add file path comment to individual files
- Context menu option for single .js and .py files
- Right-click support for stamping individual files

### Changed
- Menu items appear in a more logical order
- Improved user experience with per-file stamping

## [0.2.3] - 2025-10-04

### Changed
- **Optimized stamp detection** - Now only reads first 50 lines instead of entire file for performance
- **Simplified JavaScript stamp format** - Changed from `/** * File: path */` to `// File: path` for cleaner code
- Improved performance for large files (10x faster stamp detection)

### Fixed
- Stamp detection now prevents duplicates without reading entire file
- Reduced memory usage when processing large codebases

## [0.2.1] - 2025-10-04

### Added
- 🏷️ **Stamp File Paths** command - Automatically adds file path comments to source files
- Support for JavaScript (.js) files with `// File: path` format
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

- [ ] Support for more programming languages (Kotlin, Dart, Elixir, etc.)
- [ ] Custom stamp format configuration
- [ ] Option to remove stamps from files
- [ ] Markdown output format
- [ ] Export to multiple formats (JSON, YAML, XML)
- [ ] Batch operations with progress indicators
- [ ] Integration with Git to stamp only modified files

---

**Enjoy using FileRadar!** 🎯