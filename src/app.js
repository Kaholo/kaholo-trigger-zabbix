async function webhook(req, res, settings, triggerControllers) {
    if (!triggerControllers) {
        return res.status(400).send("triggers cannot be nil");
    }
    try {        
        const body = req.body;
        const reqSecret = body.secret, reqSeverity = body.severity;
        triggerControllers.forEach(trigger => {
            const secret = trigger.params.SECRET, severity = trigger.params.SEVERITY;
            if (secret && reqSecret !== secret) return;
            if (severity && reqSeverity != severity) return;
            const msg = `${trigger.name} Alert Severity ${reqSeverity}`;
            trigger.execute(msg, body);
        });
        res.status(200).send("OK");
    }
    catch (err){
        res.status(422).send(err.message);
    }
}

module.exports = {
    webhook
}