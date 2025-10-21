import createClient, {type Middleware} from "openapi-fetch";
import type {paths} from "./schema.ts";
import {authStorage} from "../libs-segment/authStorage.ts";

export const client = createClient<paths>({ baseUrl: "https://musicfun.it-incubator.app/api/1.0/" });

const myMiddleware: Middleware = {
    async onRequest({ request }) {
        request.headers.set("API-KEY", "df73a86e-2d94-4dbf-8fa7-9c28f8d2e817");
        const creds = authStorage.getBasicCredentials()
        if (creds) {
            const encoded = btoa(`${creds.login}:${creds.password}`)
            request.headers.set("Authorization", `Basic ${encoded}`);
        }

        return request;
    }
};


client.use( myMiddleware )