# DFrame-NodeJS
>DZDStudo Nodejs 开发框架

# 介绍
一款可模块化开发 NodeJS 应用的框架  
主要功能：
- 模块化开发
- 智能化的命令系统
- 自动的日志管理
- 统一的配置管理
- 事件系统和贡献函数

# 开始
您需要在`modules`文件夹中创建一个.js文件  
您需要在文件中导出一个对象，如:
```javascript
module.exports = {
  "name": "demo",
  "type": "business",
  "version": "1.0.0",
  "main": (log, cmd, en, exApi, conf) => {
  }
}
```
导出的对象需要包含以下字段:
- name - 模块名称
- type - 模块类型 [rely|business]
- version - 模块版本
- main - 模块入口函数
> 类型为rely时，框架会优先调用入口函数  
> 调用入口函数时会传入各种组件的API

# API
### log - 日志组件
- debug(msg)
- info(msg)
- warn(msg)
- error(msg)

### cmd - 命令组件
- add(name, description, func) - 注册命令
  - name - 命令名称
  - description - 命令描述
  - func - 命令执行函数
    - args - 命令参数
> 注:命令参数是一个数组  
> 框架会将命令以空格分割为数组，使用"括起来的参数将会被忽略

### en - 事件组件
- emit(event, func) - 触发事件
- on(event, func) - 监听事件
默认的事件：
- sys.start - 框架启动完成时触发
- sys.exit - 框架退出时触发

### exApi - 共享 API
一个在所有模块共享的变量

### conf - 配置组件
- reload() - 重新从磁盘中读取配置文件
- get(key) - 获取配置项
- set(key, value) - 设置配置项
```json
{
    "deBug": true
}
```
