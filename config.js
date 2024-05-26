// 导入所需模块
const Logger = require('./logger');
const logger = new Logger('config');
const fs = require('fs');

// 尝试从配置文件中读取配置
let configFile;
try {
    configFile = JSON.parse(fs.readFileSync('./Config.json'))
    logger.debug('配置文件加载成功')
} catch (error) {
    logger.error(`配置文件加载失败: ${error}`)
}

// 定义配置管理器
class ConfigManager {
    /**
     * 重新加载配置文件
     */
    static async reload() {
        try {
            configFile = JSON.parse(fs.readFileSync('./Config.json'))
            logger.debug('配置文件缓存已刷新')
        } catch (error) {
            logger.error(`刷新配置文件缓存失败: ${error}`)
        }
    }

    /**
     * 获取配置项
     * @param {string} key - 配置项的键
     * @returns {any | null} - 配置项的值或null
     */
    static get(key) {
        return configFile[key] || null
    }

    /**
     * 设置配置项
     * @param {string} key - 配置项的键
     * @param {any} value - 配置项的值
     * @returns {boolean} - 更新配置文件成功返回true，失败返回false
     */
    static async set(key, value) {
        configFile[key] = value

        try {
            fs.writeFileSync('./Config.json', JSON.stringify(configFile, null, 4))
            logger.debug('配置文件更新成功');
            return true
        } catch (error) {
            logger.error(`配置文件更新失败: ${error}`)
            return false
        }
    }
}

// 导出配置管理器
module.exports = ConfigManager
