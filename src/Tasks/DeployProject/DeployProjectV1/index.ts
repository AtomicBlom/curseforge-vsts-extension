import * as tl from 'azure-pipelines-task-lib/task';
import * as unirest from 'unirest';

let serviceName: string = tl.getInput('CurseForgeService', true);
let file = tl.getPathInput("ProjectFile", true, true);
let projectId = tl.getInput('Project', true);
let releaseType = <"alpha" | "beta" | "release">tl.getInput('ReleaseType', true);

async function run() {
    try {
        const authorization = tl.getEndpointAuthorization(serviceName, false);
        if (authorization.scheme !== "Token") {
            throw Error("TODO: error this properly");
        }

        const metadata: IProjectUpload = {
            changelog: "",
            releaseType: releaseType,
            gameVersions: [ 6756 ],
        };

        unirest.post(`https://minecraft.curseforge.com/api/projects/${projectId}/upload-file`)
            .headers({
                'Content-Type': 'multipart/form-data',
                'X-Api-Token': authorization.parameters.apitoken
            })
            .field('metadata', JSON.stringify(metadata))
            .attach('file', file)
            .end( (response) => console.log(response.body) );
    } catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();

//---------------------------------------
//API Definitions
interface IProjectUpload {
    changelog: string;
    changelogType?: "text" | "html" | "markdown";
    displayName?: string;
    parentFileID?: number;
    gameVersions?: number[];
    releaseType: "alpha" | "beta" | "release"
    relations?: {
        projects: IProjectReference[];
    } 
}

interface IProjectReference {
    slug: string;
    type: "embeddedLibrary" | "incompatible" | "optionalDependency" | "requiredDependency" | "tool"
}