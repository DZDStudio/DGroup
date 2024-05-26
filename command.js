const readline = require("readline")
const events = require("./events.js") // 假设events.js导出的是一个对象，这里直接使用
const Logger = require("./logger")
const logger = new Logger("command")

// 初始化命令行接口
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// 使用Map存储命令，便于管理和查询
const commandMap = new Map()

/**
 * 注册命令
 * @param {string} name 命令名称
 * @param {string} description 命令描述
 * @param {function} callback 命令执行的回调函数
 * @returns {boolean} 是否注册成功
 */
function registerCommand(name, description, callback) {
    logger.debug(`注册命令: ${name} - ${description}`)

    if (commandMap.has(name)) {
        logger.error(`命令 ${name} 注册失败：命令已存在。`)
        return false
    }

    commandMap.set(name, { description, callback })
    return true
}

/**
 * 解析命令行输入
 * @param {string} input 输入的命令行字符串
 * @returns {Array} 解析后的命令数组
 */
function parseCommands(input) {
    const regex = /[^\s"]+|"([^"]*)"/gi
    let match
    const commands = []
    while ((match = regex.exec(input))) {
        commands.push(match[1] || match[0])
    }
    return commands
}

/**
 * 执行命令
 * @param {Array} parsedCommands 解析后的命令数组
 */
function executeCommand(parsedCommands) {
    const commandName = parsedCommands[0]
    const command = commandMap.get(commandName)

    if (command) {
        command.callback(parsedCommands.slice(1))
    } else {
        logger.error(`未找到命令“${commandName}”。 输入“help”查看所有命令。`)
    }
}

/**
 * 监听命令行输入并处理
 */
function startListening() {
    rl.question("> ", (input) => {
        const commands = parseCommands(input)
        executeCommand(commands)
        startListening() // 递归调用以持续监听
    })
}

// 监听开始
startListening()

// 帮助命令注册
registerCommand("help", "显示帮助信息", (commands) => {
    logger.info("帮助信息:")
    commandMap.forEach((value, key) => {
        logger.info(`   ${key} - ${value.description}`)
    })
})

// 退出命令注册
registerCommand("exit", "退出程序", (commands) => {
    logger.info("正在关闭...")
    events.emit("sys.exit")
    process.exit(0)
})

// 导出
module.exports = {
    "add": registerCommand
}
