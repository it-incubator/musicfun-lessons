import createClient, {type Middleware} from "openapi-fetch";
import type {paths} from "./schema.ts";

export const client = createClient<paths>({ baseUrl: "https://musicfun.it-incubator.app/api/1.0/" });

const myMiddleware: Middleware = {
    async onRequest({ request }) {
        request.headers.set("API-KEY", "28ea8f95-8a11-4c7e-8fb8-89e27d956368");
        return request;
    }
};


client.use( myMiddleware )