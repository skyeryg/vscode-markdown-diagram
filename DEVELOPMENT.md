# VSCode Markdown Diagram 插件

## 项目说明
一个VSCode插件，用于在Markdown文件预览时渲染流程图、时序图、类图、UML等图表。
使用[markdown-it-diagram](https://ryanuo.cc/zh/posts/md-it-diagarm)实现图表的渲染

## 开发进度跟踪
### 项目初始化
- [x] 创建项目结构 (2025-03-28)
- [x] 配置pnpm工作区 (2025-03-28)
- [x] 安装基础依赖 (2025-03-28)

### 核心功能开发
- [x] 实现Markdown预览扩展点 (2025-03-28)
- [x] 集成markdown-it-diagram渲染引擎 (2025-03-28)
- [x] 支持Mermaid/PlantUML等图表语法 (2025-03-28)
- [ ] 添加语法高亮和代码提示

### 测试与调试
- [ ] 编写单元测试
- [ ] 配置VSCode调试环境 (2025-03-28)
- [ ] 测试不同图表类型的渲染效果 (2025-03-28)

### 发布准备
- [x] 使用vsce工具打包插件 (2025-03-28)
- [ ] 准备市场发布所需的元数据
- [ ] 发布到VSCode扩展市场

## 测试说明
1. 在VSCode中打开扩展视图(⇧⌘X)
2. 点击"..."菜单选择"从VSIX安装"
3. 选择生成的vscode-markdown-diagram-1.0.0.vsix文件
4. 打开test.md文件查看图表渲染效果