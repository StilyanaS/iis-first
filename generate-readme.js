const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(".");
const srcDir = path.join(projectRoot, "src", "app");

function scanDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDir(fullPath, fileList);
    } else if (file.endsWith(".ts") && !file.endsWith(".spec.ts")) {
      fileList.push(fullPath);
    }
  });
  return fileList;
}

function classifyFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  if (content.includes("@Component")) return "Component";
  if (content.includes("@NgModule")) return "Module";
  if (content.includes("@Injectable")) return "Service";
  if (content.includes("@Pipe")) return "Pipe";
  if (content.includes("@Directive")) return "Directive";
  return "Other";
}

function generateReadme() {
  const files = scanDir(srcDir);
  const classified = {};

  files.forEach((filePath) => {
    const type = classifyFile(filePath);
    if (!classified[type]) classified[type] = [];
    classified[type].push(path.relative(projectRoot, filePath));
  });

  let readme = `# Angular Project Documentation\n\n`;

  readme += `## Structure Overview\n\n`;
  Object.keys(classified).forEach((type) => {
    readme += `### ${type}s\n`;
    classified[type].forEach((file) => {
      readme += `- \`${file}\`\n`;
    });
    readme += `\n`;
  });

  fs.writeFileSync(path.join(projectRoot, "README.md"), readme, "utf-8");
  console.log("✅ README.md generated successfully.");
}

generateReadme();
