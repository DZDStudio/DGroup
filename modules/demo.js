module.exports = {
    "name": "demo",
    "type": "business",
    "version": "1.0.0",
    "main": (log, cmd, en, exApi, conf) => {
        log.info("Demo加载成功！")
        cmd.add("demo", "Demo命令", (args) => {
            log.info(JSON.stringify(args))
        })
    }
}