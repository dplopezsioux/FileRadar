const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

function activate(context) {
    console.log("FileRadar is active!");

    // Command 1: Generate Sonar File
    let generateSonar = vscode.commands.registerCommand(
        "file-radar.generateSonar",
        async (uri) => {
            if (!uri) {
                vscode.window.showErrorMessage(
                    "Please right-click on a folder"
                );
                return;
            }

            const folderPath = uri.fsPath;

            // Verify it's a folder
            if (!fs.statSync(folderPath).isDirectory()) {
                vscode.window.showErrorMessage("You must select a folder");
                return;
            }

            try {
                // Get ignored folders configuration
                const config = vscode.workspace.getConfiguration("fileRadar");
                const ignoredFolders = config.get("ignoredFolders", [
                    "node_modules",
                    ".git",
                    "dist",
                    "build",
                    ".vscode",
                    "coverage",
                ]);

                // Generate the tree
                const tree = generateTree(folderPath, ignoredFolders);

                // Create JSON with metadata
                const sonarData = {
                    generated_at: new Date().toISOString(),
                    root_path: folderPath,
                    root_name: path.basename(folderPath),
                    ignored_folders: ignoredFolders,
                    tree: tree,
                };

                // Save sonar-file.json
                const outputPath = path.join(folderPath, "sonar-file.json");
                fs.writeFileSync(
                    outputPath,
                    JSON.stringify(sonarData, null, 2),
                    "utf8"
                );

                // Show success message and open the file
                vscode.window.showInformationMessage(
                    `✅ sonar-file.json generated successfully!`
                );

                const doc = await vscode.workspace.openTextDocument(outputPath);
                await vscode.window.showTextDocument(doc);
            } catch (error) {
                vscode.window.showErrorMessage(`Error: ${error.message}`);
            }
        }
    );

    // Command 2: Stamp File Paths (folder)
    let stampPaths = vscode.commands.registerCommand(
        "file-radar.stampPaths",
        async (uri) => {
            if (!uri) {
                vscode.window.showErrorMessage(
                    "Please right-click on a folder"
                );
                return;
            }

            const folderPath = uri.fsPath;

            // Verify it's a folder
            if (!fs.statSync(folderPath).isDirectory()) {
                vscode.window.showErrorMessage("You must select a folder");
                return;
            }

            try {
                // Get ignored folders configuration
                const config = vscode.workspace.getConfiguration("fileRadar");
                const ignoredFolders = config.get("ignoredFolders", [
                    "node_modules",
                    ".git",
                    "dist",
                    "build",
                    ".vscode",
                    "coverage",
                ]);

                // Stamp all files
                let filesProcessed = 0;
                stampAllFiles(
                    folderPath,
                    folderPath,
                    ignoredFolders,
                    (count) => {
                        filesProcessed = count;
                    }
                );

                vscode.window.showInformationMessage(
                    `✅ Stamped ${filesProcessed} files successfully!`
                );
            } catch (error) {
                vscode.window.showErrorMessage(`Error: ${error.message}`);
            }
        }
    );

    // Command 3: Stamp Single File
    let stampSingleFile = vscode.commands.registerCommand(
        "file-radar.stampSingleFile",
        async (uri) => {
            if (!uri) {
                vscode.window.showErrorMessage("Please right-click on a file");
                return;
            }

            const filePath = uri.fsPath;

            // Verify it's a file
            if (fs.statSync(filePath).isDirectory()) {
                vscode.window.showErrorMessage(
                    "Please select a file, not a folder"
                );
                return;
            }

            try {
                const ext = path.extname(filePath);

                // Check if it's a supported file type
                if (!isSupportedExtension(ext)) {
                    vscode.window.showErrorMessage(
                        `File type ${ext} is not supported. Supported types: .js, .jsx, .ts, .tsx, .py, .html, .css, .scss, .java, .cpp, .c, .go, .rs, .php, .rb, .swift`
                    );
                    return;
                }

                // Get workspace folder to calculate relative path
                const workspaceFolder =
                    vscode.workspace.getWorkspaceFolder(uri);
                const basePath = workspaceFolder
                    ? workspaceFolder.uri.fsPath
                    : path.dirname(filePath);
                const relativePath = path.relative(basePath, filePath);

                // Stamp the file
                stampFile(filePath, relativePath, ext);

                vscode.window.showInformationMessage(
                    `✅ File stamped successfully!`
                );
            } catch (error) {
                vscode.window.showErrorMessage(`Error: ${error.message}`);
            }
        }
    );

    context.subscriptions.push(generateSonar);
    context.subscriptions.push(stampPaths);
    context.subscriptions.push(stampSingleFile);
}

function generateTree(dirPath, ignoredFolders) {
    const items = fs.readdirSync(dirPath);
    const tree = [];

    items.forEach((item) => {
        // Ignore configured folders
        if (ignoredFolders.includes(item)) {
            return;
        }

        const fullPath = path.join(dirPath, item);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            // It's a folder
            tree.push({
                name: item,
                type: "folder",
                children: generateTree(fullPath, ignoredFolders),
            });
        } else {
            // It's a file
            tree.push({
                name: item,
                type: "file",
                size: stats.size,
                extension: path.extname(item),
            });
        }
    });

    return tree;
}

function isSupportedExtension(ext) {
    const supported = [
        ".js", // JavaScript
        ".jsx", // React JSX
        ".ts", // TypeScript
        ".tsx", // TypeScript JSX
        ".py", // Python
        ".html", // HTML
        ".css", // CSS
        ".scss", // SCSS
        ".java", // Java
        ".cpp", // C++
        ".c", // C
        ".go", // Go
        ".rs", // Rust
        ".php", // PHP
        ".rb", // Ruby
        ".swift", // Swift
    ];
    return supported.includes(ext);
}

function getCommentFormat(extension) {
    // HTML uses special comment format
    if (extension === ".html") {
        return { start: "<!-- File: ", end: " -->\n" };
    }

    // CSS and SCSS use block comments
    if (extension === ".css" || extension === ".scss") {
        return { start: "/* File: ", end: " */\n" };
    }

    // Python and Ruby use hash comments
    if (extension === ".py" || extension === ".rb") {
        return { start: "# File: ", end: "\n" };
    }

    // All other languages use double-slash comments
    // JS, JSX, TS, TSX, Java, C, C++, Go, Rust, PHP, Swift
    return { start: "// File: ", end: "\n" };
}

function stampAllFiles(currentPath, basePath, ignoredFolders, callback) {
    let count = 0;
    const items = fs.readdirSync(currentPath);

    items.forEach((item) => {
        // Ignore configured folders
        if (ignoredFolders.includes(item)) {
            return;
        }

        const fullPath = path.join(currentPath, item);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            // Recursively process subdirectories
            count += stampAllFiles(
                fullPath,
                basePath,
                ignoredFolders,
                callback
            );
        } else {
            const ext = path.extname(item);
            // Process supported file types
            if (isSupportedExtension(ext)) {
                const relativePath = path.relative(basePath, fullPath);
                stampFile(fullPath, relativePath, ext);
                count++;
            }
        }
    });

    if (callback) callback(count);
    return count;
}

function stampFile(filePath, relativePath, extension) {
    try {
        const content = fs.readFileSync(filePath, "utf8");
        const lines = content.split("\n");

        // Normalize path separators to forward slashes
        const normalizedPath = relativePath.replace(/\\/g, "/");

        // Define robust patterns for detecting File: stamps
        const stampPatterns = [
            /^\/\/\s*File:\s*(.+?)\s*$/, // JavaScript: // File: path
            /^#\s*File:\s*(.+?)\s*$/, // Python/Ruby: # File: path
            /^\/\*\s*File:\s*(.+?)\s*\*\/\s*$/, // CSS: /* File: path */
            /^<!--\s*File:\s*(.+?)\s*-->\s*$/, // HTML: <!-- File: path -->
        ];

        // Search for existing stamp in first 10 lines
        let existingStampLine = -1;
        let existingPath = null;

        for (let i = 0; i < Math.min(10, lines.length); i++) {
            const line = lines[i].trim();

            // Try each pattern
            for (const pattern of stampPatterns) {
                const match = line.match(pattern);
                if (match) {
                    existingStampLine = i;
                    existingPath = match[1].trim();
                    break;
                }
            }

            // If found, stop searching
            if (existingStampLine !== -1) {
                break;
            }
        }

        // If stamp exists with correct path, skip
        if (existingPath && existingPath === normalizedPath) {
            return false; // No changes needed
        }

        // Get the appropriate comment format for this file type
        const commentFormat = getCommentFormat(extension);
        const newStamp =
            commentFormat.start + normalizedPath + commentFormat.end;

        let newContent;

        if (existingStampLine !== -1) {
            // Update existing stamp (preserve indentation if any)
            lines[existingStampLine] = newStamp.trimEnd();
            newContent = lines.join("\n");
        } else {
            // Add new stamp at the beginning
            newContent = newStamp + content;
        }

        fs.writeFileSync(filePath, newContent, "utf8");
        return true; // File was modified
    } catch (error) {
        console.error(`Error stamping file ${filePath}:`, error);
        return false;
    }
}

function deactivate() {}

module.exports = {
    activate,
    deactivate,
};
