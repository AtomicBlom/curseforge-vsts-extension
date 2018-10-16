import tl = require('azure-pipelines-task-lib/task');
import { ConnectedService } from './CurseForgeAPI/ConnectedService';

//npm install vsts-task-lib

// Get task parameters
let serviceName: string = tl.getInput('CurseForgeService', true);

async function run() {
    try {

        const service = new ConnectedService(serviceName);
        tl.debug('CurseForgeService:' + serviceName)
    } catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();
