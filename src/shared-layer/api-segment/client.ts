import createClient, {type Middleware} from "openapi-fetch";
import type {paths} from "./schema.ts";
import {authStorage} from "../libs-segment/authStorage.ts";

export const client = createClient<paths>({ baseUrl: "https://musicfun.it-incubator.app/api/1.0/" });

const myMiddleware: Middleware = {
    async onRequest({ request }) {
        request.headers.set("API-KEY", "8fef2f5b-1e1e-48a3-802e-10b7d5962ab4");
        const creds = authStorage.getBasicCredentials()
        if (creds) {
            const encoded = btoa(`${creds.login}:${creds.password}`)
            request.headers.set("Authorization", `Basic ${encoded}`);
        }

        return request;
    },
    async onResponse({ response }) {
        if (!response.ok) {
            // Will produce error messages like "https://example.org/api/v1/example: 404 Not Found".
            const responseBody = await response.json()
            const error = new APIError(response, responseBody)

            console.log('error')
            throw error
        }
    }
};


client.use( myMiddleware )


class APIError extends Error {
    constructor(public response: Response, public body: any) {
        super(`${response.url} ${response.status} ${response.statusText}`)
    }
}



