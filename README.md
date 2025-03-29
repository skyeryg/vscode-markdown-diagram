# VSCode Markdown Diagram 插件

[![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)](https://marketplace.visualstudio.com/items?itemName=skyer.vscode-markdown-diagram)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE.md)

一个VSCode插件，用于在Markdown文件预览时渲染流程图、时序图、类图、UML等图表。

## 功能特性

- 支持Mermaid/PlantUML/DOT/ditaa等多种图表语法
- 基于[markdown-it-diagram](https://ryanuo.cc/zh/posts/md-it-diagarm)实现图表渲染
- 轻量级、高性能的Markdown预览扩展
- 提供丰富的控件功能：
  - 缩放、移动、粗糙渲染
  - 复制源代码
- 支持交互操作：
  - Shift键+鼠标滚轮缩放
  - 长按鼠标左键拖动图表
  - 集成模态窗口预览模式
- 可设置图表最大高度

## 使用方法

1. 在Markdown文件中使用Mermaid或PlantUML语法编写图表
2. 打开Markdown预览视图查看渲染效果

示例代码:
````markdown
```mermaid
graph TD
    A[开始] --> B(处理)
    B --> C{决策}
    C -->|是| D[结束]
    C -->|否| B
```
````

## 贡献指南

欢迎提交Issue和Pull Request。请确保:
1. 代码符合ESLint规范
2. 提交前运行测试`pnpm test`
3. 更新相关文档

## 许可证

[MIT](./LICENSE.md) License © 2025 [skyer](https://github.com/skyeryg)
