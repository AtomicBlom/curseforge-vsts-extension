import * as tl from 'azure-pipelines-task-lib/task';
import { ServiceClient, ServiceClientOptions, ServiceClientCredentials, TokenCredentials, ApiKeyCredentials } from 'ms-rest-js';

function getCredentials(id: string, credentialsOptional: boolean) : ServiceClientCredentials | null 
{
    const authorization = tl.getEndpointAuthorization(id, credentialsOptional);
    if (authorization.scheme === "Token") {
        tl.debug("Authorizing using API Key credentials");
        const result = new ApiKeyCredentials({
            inHeader: {
                "X-Api-Token": authorization.parameters.Token
            }
        });
        return result;
    }
    throw Error(`Unsupported authorization: ${JSON.stringify(authorization)}`);
}

export class ConnectedService extends ServiceClient {
    private endpointUrl: string;

    constructor(private connectedServiceName: string, 
                private credentialsOptional: boolean = true, 
                private options?: ServiceClientOptions) 
    {
        super(getCredentials(connectedServiceName, credentialsOptional), options);
        this.endpointUrl = tl.getEndpointUrl(connectedServiceName, credentialsOptional);
    }
}