const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

function activate(context) {
    console.log("FileRadar is active!");

    let disposable = vscode.commands.registerCommand(
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

    context.subscriptions.push(disposable);
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

function deactivate() {}

module.exports = {
    activate,
    deactivate,
};