import {createContext} from "react";
import type {QueryClient} from "./query-client.ts";

export const QueryClientContext = createContext<QueryClient | null>(null)