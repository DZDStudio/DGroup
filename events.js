// 引入日志模块并初始化事件日志记录器
const Logger = require('./logger')
const eventLogger = new Logger('events')

// 创建对象以存储事件及其对应的监听器列表
const eventListeners = {}

/**
 * 注册事件监听器。
 * 当事件触发时，执行指定的回调函数。
 *
 * @param {string} eventName - 事件名称
 * @param {Function} listener - 事件触发时执行的函数
 */
function registerEventListener(eventName, listener) {
    eventLogger.debug(`注册监听事件: ${eventName}`)
    eventListeners[eventName] = eventListeners[eventName] || [] // 确保事件键存在并初始化为空数组
    eventListeners[eventName].push(listener)
}

/**
 * 触发事件，执行与该事件关联的所有监听器。
 *
 * @param {string} eventName - 事件名称
 * @param  {...any} args - 传递给监听器的参数
 */
function triggerEvent(eventName, ...args) {
    eventLogger.debug(`触发事件: ${eventName}`)
    const listeners = eventListeners[eventName] || [] // 获取当前事件的监听器列表
    listeners.forEach(listener => listener(...args)) // 执行每个监听器并传递参数
}

// 导出模块功能
module.exports = {
    on: registerEventListener,
    emit: triggerEvent
};
