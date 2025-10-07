import {createContext, useContext, useEffect, useState} from "react";
import React from "react";


const RouterContext = createContext<any>(null)

export const BrowserRouter = (props: any) => {
    return <RouterContext.Provider value={{pattern: null}}>
        {props.children}
    </RouterContext.Provider>
}

export const Route = (props: any) => {
   // lexical envirinment (1)  // lexical envirinment (2)
    const [_, setVersion] = React.useState(1) //  1
   const value = useContext(RouterContext);

    useEffect(() => {
        const listener = (e: any) => {
            setVersion(prevState => prevState + 1 )
        }

        (window as any).navigation.addEventListener('navigate', listener);

        return () => {
            (window as any).navigation.removeEventListener('navigate', listener);
        }
    }, [ ])// замыкание

    const currentAddress = window.location.pathname;

    if (matchPath(currentAddress, props.path)) {
        value.pattern = props.path
        return props.element
    } else {
        return null
    }
}

export const NavLink = (props) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()

        window.history.pushState({}, '', props.to);
    }

    return <a href={props.to} onClick={ handleClick }>{props.children}</a>
}


export const useParams = () => {
    const currentAddress = window.location.pathname;
    const value = useContext(RouterContext);

    const currentAddressSegments = currentAddress.split('/')
    const patternSegments = value.pattern.split('/')

    const result = {} as any

    for (let i = 0; i < currentAddressSegments.length; i++) {
        const segmentFromPath = currentAddressSegments[i]
        const segmentFromPattern = patternSegments[i]

        if (segmentFromPattern[0] === ':') {
            result[segmentFromPattern.substring(1)] = segmentFromPath
        }

    }

    return result
}

function matchPath(currentAddress: any, pattern: any) {
    const currentAddressSegments = currentAddress.split('/')
    const patternSegments = pattern.split('/')

    if  (currentAddressSegments.length !== patternSegments.length) {
        return false
    } else {
        return true
    }

}