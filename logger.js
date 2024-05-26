// 导入配置文件
const Config = require("./Config.json")

/**
 * 一个简单的日志记录类，用于不同级别的消息输出。
 */
class Logger {
    /**
     * 构造函数，初始化日志对象。
     * @param {String} title - 日志的标题或标识。
     */
    constructor(title) {
        this.title = title
    }

    /**
     * 在调试模式下输出调试信息。
     * @param {...any} msg - 要输出的调试信息，可以是多个参数。
     * @returns {boolean} - 操作是否成功。
     */
    debug(...msg) {
        // 如果未开启调试模式，返回失败
        if (!Config.deBug) return false

        const date = new Date()
        console.log(
            `\x1B[36m${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}\x1B[2m DEBUG\x1B[0m [${this.title}]`,
            ...msg
        )
        return true
    }

    /**
     * 输出普通信息。
     * @param {...any} msg - 要输出的信息，可以是多个参数。
     * @returns {boolean} - 操作是否成功。
     */
    info(...msg) {
        const date = new Date()
        console.log(
            `\x1B[36m${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}\x1B[32m INFO\x1B[0m [${this.title}]`,
            ...msg
        )
        return true
    }

    /**
     * 输出警告信息。
     * @param {...any} msg - 要输出的警告信息，可以是多个参数。
     * @returns {boolean} - 操作是否成功。
     */
    warn(...msg) {
        const date = new Date()
        console.log(
            `\x1B[36m${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}\x1B[33m WARN\x1B[0m [${this.title}]`,
            ...msg
        )
        return true
    }

    /**
     * 输出错误信息。
     * @param {...any} msg - 要输出的错误信息，可以是多个参数。
     * @returns {boolean} - 操作是否成功。
     */
    error(...msg) {
        const date = new Date()
        console.log(
            `\x1B[36m${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}\x1B[31m ERROR\x1B[0m [${this.title}]`,
            ...msg
        )
        return true
    }
}

// 导出Logger类
module.exports = Logger
