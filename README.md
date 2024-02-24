# -Web-PL-0
包含了PL/0的开发环境，包括编辑器、调试器、编译器。对应的API接口，前端项目

### 说明

本项目主要用于实现web端的pl0的集成开发环境的实现，简单来说就是对pl0做了一个web端的IDE，包含了基本的功能，诸如代码编辑器、编译器、调试器等；<br>
本项目是我的毕设项目，如果要使用的话，请联系我本人，邮箱如下：
- [qq邮箱:2574381756@qq.com](2574381756@qq.com)
- [Google邮箱:kurt.du.cobain@gmail.com](kurt.du.cobain@gmail.com)

使用方法：
- 首先声明，需要配合另一个仓库中的服务端项目使用
- 克隆代码到本地，执行`npm i`，下载所需要的`npm_modules`
- 执行`npm run serve`，在本地启动项目
- 执行`npm run build`,对项目进行打包，可以在后续进行部署

## 还未做完，别急！
### 进度

- 由于这个readme文档更新于2024/2/24，因此接下来我会以现在这个时间为基准讲述项目进度
  - 2/24: 实现了基本的前后端基本通信，能够实现pl0的编译处理（目前实现了词法分析，语法分析，语义分析，中间代码生成），目标代码生成仍存在一些问题，比如循环语句处理和if-else if-else语句的处理等；同时能够实现代码编辑器的基本功能，比如代码的书写和高亮、代码文件的管理等等