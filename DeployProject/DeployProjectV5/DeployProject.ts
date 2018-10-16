import tl = require('azure-pipelines-task-lib/task');
import fs = require('fs');
import { ConnectedService } from './CurseForgeAPI/ConnectedService';
import { WebResource } from 'ms-rest-js';
import { IProjectUpload } from './CurseForgeAPI/IProjectUpload';

//npm install vsts-task-lib

// Get task parameters
let serviceName: string = tl.getInput('CurseForgeService', true);
let file = tl.getPathInput("ProjectFile", true, true);
async function run() {
    try {

        /*const service = new ConnectedService(serviceName);
        const webResource = new WebResource();
        
        const requestForm = new FormData();
        const metadata: IProjectUpload = {
            changelog: "",
            releaseType: "alpha",
            gameVersions: [ 6756 ],
        }

        const reader = new FileReader();
        reader.
        requestForm.append("metadata", JSON.stringify(metadata));
        requestForm.append("file", new File(); )

        service.sendRequest()*/

        //Almost working CURL request?:
        //curl -X POST --header "X-Api-Token: $(Token)" -F "metadata={changelog: \"\", releaseType: \"alpha\", gameVersions: [ 6756 ] }" -F file=@anyseed-1.12.2-1.1.1-beta-universal.jar https://minecraft.curseforge.com/api/projects/AtomicBlomsTestCurseForgeAPIProject/upload-file
        //curl -v --header "X-Api-Token: $(Token)" -F "metadata={changelog: \"\", releaseType: \"alpha\", gameVersions: [ 6756 ] }" -F file=@anyseed-1.12.2-1.1.1-beta-universal.jar https://minecraft.curseforge.com/api/projects/304919/upload-file
        //curl -v --header "Expect:" --header "X-Api-Token: $(Token)" -F "metadata={changelog: \"\", releaseType: \"alpha\", gameVersions: [ 6756 ] }" -F file=@anyseed-1.12.2-1.0-universal.jar https://minecraft.curseforge.com/api/projects/304919/upload-file

        tl.debug('CurseForgeService:' + serviceName)
    } catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();
