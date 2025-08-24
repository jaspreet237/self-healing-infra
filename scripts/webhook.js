const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
app.use(bodyParser.json());

app.post('/', (req, res) => {
    console.log("Alert received:", JSON.stringify(req.body));

    // Run shell script
    exec("sh /app/scripts/restart_service.sh", (err, stdout, stderr) => {
        if (err) {
            console.error(`Error: ${stderr}`);
            res.status(500).send("Error restarting service");
            return;
        }
        console.log(`Service restarted: ${stdout}`);
        res.send("Service restart triggered");
    });
});

app.listen(5001, () => console.log("Webhook server running on port 5001"));
