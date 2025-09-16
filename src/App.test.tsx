import {MainPage} from "./MainPage.tsx";
import {createContext} from "react";
import type {QueryClient} from "./shared/libs/query-client/query-client.ts";


export const QueryClientContext = createContext<QueryClient | null>(null)

export const AppTest = () => {
   return (
       <QueryClientContext.Provider value={{} as QueryClient }>
         <MainPage />
       </QueryClientContext.Provider>
   )
}



