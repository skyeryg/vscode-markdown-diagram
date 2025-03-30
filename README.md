# VSCode Markdown Diagram Extension

[![Version](https://img.shields.io/badge/version-1.1.5-blue.svg)](https://marketplace.visualstudio.com/items?itemName=skyer.vscode-markdown-diagram)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE.md)

[中文](./README.zh.md)

A VSCode extension for rendering diagrams (flowcharts, sequence diagrams, class diagrams, UML, etc.) in Markdown preview.

## Features

- Supports multiple diagram syntaxes: Mermaid/PlantUML/DOT/ditaa
- Diagram rendering powered by [markdown-it-diagram](https://ryanuo.cc/zh/posts/md-it-diagarm)
- Lightweight and high-performance Markdown preview enhancement
- Rich control features:
  - Zoom, pan, rough rendering
  - Copy source code
- Interactive operations:
  - Shift + mouse wheel to zoom
  - Hold left mouse button to drag
  - Integrated modal preview mode
- Configurable options:
  - Set maximum diagram height (default: 600px)
  - Different Mermaid themes for VSCode dark/light modes

## Usage

1. Write diagrams using Mermaid or PlantUML syntax in Markdown files
2. Open Markdown preview to view rendered diagrams

Example:
````markdown
## Mermaid

```mermaid
graph TD
    A[开始] --> B(处理)
    B --> C{条件}
    C -->|是| D[结果1]
    C -->|否| E[结果2]
```

## PlantUML

```plantuml
@startuml
Alice -> Bob: 你好
Bob --> Alice: 你好吗?
@enduml
```
````

Preview:

![Example](https://raw.githubusercontent.com/skyeryg/vscode-markdown-diagram/main/test/test.jpg)

## Contributing

Issues and PRs are welcome. Please ensure:
1. Code follows ESLint rules
2. Run tests with `pnpm test` before submitting
3. Update relevant documentation

## License

[MIT](./LICENSE.md) License © 2025 [skyer](https://github.com/skyeryg)
