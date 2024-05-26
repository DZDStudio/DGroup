console.log("开始启动...")

// 加载基础依赖
const fs = require("fs")
const conf = require("./config")
const events = require("./events")
const command = require("./command")
const Logger = require("./logger")
const logger = new Logger("main")

/**
 * 加载并排序模块
 */
function loadAndSortModules() {
    const modulesPath = "./modules"
    const jsFiles = fs.readdirSync(modulesPath).filter(file => file.endsWith(".js"))

    return jsFiles.map(file => {
        const module = require(`./modules/${file}`)
        return { fileName: file, ...module }
    }).sort((a, b) => a.type === "rely" ? -1 : (b.type === "rely" ? 1 : 0))
}

/**
 * 初始化并加载所有模块
 * @param {Array} modulesObjList - 模块对象列表
 */
function initializeModules(modulesObjList) {
    const exposedAPI = {}
    modulesObjList.forEach(module => {
        const { name, version, type } = module
        const logMessage = type === "rely" ? `加载前置模块:${name} - ${version}` : `加载模块:${name} - ${version}`
        logger.info(logMessage)
        module.main(new Logger(name), command, events, exposedAPI, conf)
    })
}

try {
    logger.info("正在加载模块...")
    const modulesObjList = loadAndSortModules()
    initializeModules(modulesObjList)

    logger.info("启动成功！");
    events.emit("sys.start") // 使用emit触发事件
} catch (error) {
    logger.error("启动过程中遇到错误:", error)
}
