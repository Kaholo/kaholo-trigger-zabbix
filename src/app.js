const config = require("./config");
const mapExecutionService = require("../../../api/services/map-execution.service");
const Trigger = require("../../../api/models/map-trigger.model");

module.exports = {
    webhook: function (req, res) {
        let p = new Promise((resolve, reject) => {
            resolve(Trigger.find({ plugin: config.name }))
        }).then((triggers) => {
            console.log("Found trigger", triggers.length);
            triggers.forEach(trigger =>
                new Promise((resolve, reject) => {
                    
                    const triggerServerity = trigger.params.find(o => o.name === 'SEVERITY');
                    const triggerSecret = trigger.params.find(o => o.name === 'SECRET');
                    
                    if(req.body.secret != triggerSecret.value)
                        return reject("Invalid Secret");
                    
                    if(triggerServerity.value != req.body.severity) 
                        return reject("Severity not match");
                    
                    resolve();
                }).then(() => {
                    console.log(trigger.map);
                    let message = trigger.name + ' - Started by zabbix trigger';
                    mapExecutionService.execute(trigger.map, null, 0, req, trigger.configuration, message);
                })
            )
        })
        .then(() =>{
            res.send('OK');
        })
        .catch((error) => res.send(error))
    }
};