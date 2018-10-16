import * as tl from 'azure-pipelines-task-lib/task';
import { ServiceClient, ServiceClientOptions, ServiceClientCredentials } from 'ms-rest-js';

function getCredentials(id: string, credentialsOptional: boolean) : ServiceClientCredentials | null 
{
    const endpointUrl = tl.getEndpointUrl(id, credentialsOptional);
    tl.debug(`endpointUrl: ${endpointUrl}`);
    const authorizationScheme = tl.getEndpointAuthorizationScheme(id, credentialsOptional);
    tl.debug(`authorizationScheme: ${authorizationScheme}`);
    const authorization = tl.getEndpointAuthorization(id, credentialsOptional);
    tl.debug(`authorization: ${authorization}`);
    
    return null;
}

export class ConnectedService extends ServiceClient {
    constructor(private connectedServiceName: string, 
                private credentialsOptional: boolean = true, 
                private options?: ServiceClientOptions) 
    {
        super(getCredentials(connectedServiceName, credentialsOptional), options);
    }
}