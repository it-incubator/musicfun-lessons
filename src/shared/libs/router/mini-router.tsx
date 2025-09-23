/* eslint-disable */
// shared/libs/router/mini-router.tsx (v2)
import React, {
    createContext, useContext, useEffect, useMemo, useState, ReactNode
} from "react";

/* ------------ History (HTML5) ------------ */
type Listener = (path: string) => void;
function createBrowserHistory() {
    const listeners = new Set<Listener>();
    const notify = () => listeners.forEach(l => l(window.location.pathname));
    const push = (to: string) => {
        if (to !== window.location.pathname) {
            window.history.pushState({}, "", to);
            notify();
        }
    };
    const replace = (to: string) => {
        if (to !== window.location.pathname) {
            window.history.replaceState({}, "", to);
            notify();
        }
    };
    const listen = (l: Listener) => {
        listeners.add(l);
        return () => listeners.delete(l);
    };
    const onPop = () => notify();
    window.addEventListener("popstate", onPop);
    return { push, replace, listen, dispose: () => window.removeEventListener("popstate", onPop) };
}

/* ------------ Types ------------ */
type RouteObject = { path?: string; index?: boolean; element?: ReactNode; children?: RouteObject[] };
type Params = Record<string, string>;
type Match = { params: Params; route: RouteObject; child?: Match } | null;

/* ------------ Router context ------------ */
type RouterCtx = {
    pathname: string;
    navigate: (to: string, opts?: { replace?: boolean }) => void;
    params: Params;
};
const RouterContext = createContext<RouterCtx | null>(null);

/* Outlet context (ключ к фиксу) */
const OutletCtx = createContext<ReactNode>(null);

export function Outlet() {
    return <>{useContext(OutletCtx)}</>;
}

/* ------------ Public API ------------ */
export function Router({ children }: { children: ReactNode }) {
    const history = useMemo(() => createBrowserHistory(), []);
    const [pathname, setPathname] = useState(() => window.location.pathname);

    useEffect(() => history.listen(setPathname), [history]);

    const ctx = useMemo<RouterCtx>(() => ({
        pathname,
        navigate: (to, opts) => (opts?.replace ? history.replace(to) : history.push(to)),
        params: {},
    }), [pathname, history]);

    return <RouterContext.Provider value={ctx}>{children}</RouterContext.Provider>;
}

export function Routes({ children }: { children: ReactNode }) {
    const base = useRouter();
    const tree = useMemo(() => childrenToRouteObjects(children), [children]);
    const match = useMemo(() => matchRoutes(tree, base.pathname), [tree, base.pathname]);

    if (!match) return null; // 404 можно заменить на <NotFound/>

    const elementTree = buildElementTree(match);
    const value: RouterCtx = { ...base, params: match.params };

    return (
        <RouterContext.Provider value={value}>
            {elementTree}
        </RouterContext.Provider>
    );
}

export function Route(_props: { path?: string; index?: boolean; element?: ReactNode; children?: ReactNode }) {
    return null; // декларативное описание
}

export function NavLink(
    { to, end, children, className, style, activeClassName, activeStyle, ...rest }:
        React.AnchorHTMLAttributes<HTMLAnchorElement> & {
        to: string; end?: boolean;
        activeClassName?: string; activeStyle?: React.CSSProperties;
    }
) {
    const { pathname, navigate } = useRouter();
    const isActive = end ? pathname === to : pathname === to || pathname.startsWith(withSlash(to));
    const mergedClass = [className, isActive && activeClassName].filter(Boolean).join(" ") || undefined;
    const mergedStyle = { ...(style||{}), ...(isActive ? (activeStyle||{}) : {}) };

    return (
        <a
            href={to}
            className={mergedClass}
            style={mergedStyle}
            onClick={(e) => {
                if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0) return;
                e.preventDefault();
                navigate(to);
            }}
            {...rest}
        >{children}</a>
    );
}

export function useNavigate() {
    return useRouter().navigate;
}

export function useParams<T extends Record<string, string> = Record<string, string>>() {
    return useRouter().params as T;
}

/* ------------ Helpers ------------ */
function useRouter() {
    const ctx = useContext(RouterContext);
    if (!ctx) throw new Error("Use inside <Router>.");
    return ctx;
}

function childrenToRouteObjects(children: ReactNode): RouteObject[] {
    return React.Children.toArray(children).flatMap((child) => {
        if (!React.isValidElement(child)) return [];
        const p = child.props as any;
        const node: RouteObject = { path: p.path, index: p.index, element: p.element };
        if (p.children) node.children = childrenToRouteObjects(p.children);
        return [node];
    });
}

function split(pathname: string) {
    return pathname.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
}
function withSlash(s: string) { return s.startsWith("/") ? s : `/${s}`; }

function matchRoutes(routes: RouteObject[], pathname: string): Match {
    const segs = split(pathname);
    for (const r of routes) {
        if (r.index) {
            if (segs.length === 0) return { params: {}, route: r };
            continue;
        }
        const pattern = r.path ?? "";
        const m = matchPath(pattern, segs);
        if (!m.matched) continue;
        const rest = segs.slice(m.consumed);
        if (r.children?.length) {
            const child = matchRoutes(r.children, "/" + rest.join("/"));
            if (child) return { params: { ...m.params, ...child.params }, route: r, child };
        }
        if (rest.length === 0) return { params: m.params, route: r };
    }
    return null;
}

function matchPath(pattern: string, segs: string[]): { matched: boolean; consumed: number; params: Params } {
    if (!pattern || pattern === "/") return { matched: true, consumed: 0, params: {} };
    const pSegs = split(pattern);
    if (pSegs.length > segs.length) return { matched: false, consumed: 0, params: {} };
    const params: Params = {};
    for (let i = 0; i < pSegs.length; i++) {
        const p = pSegs[i], s = segs[i];
        if (p.startsWith(":")) { params[p.slice(1)] = decodeURIComponent(s ?? ""); continue; }
        if (p !== s) return { matched: false, consumed: 0, params: {} };
    }
    return { matched: true, consumed: pSegs.length, params };
}

/* Главный фикс: строим дерево через контекст для Outlet */
function buildElementTree(match: Match): ReactNode {
    if (!match) return null;
    const child = match.child ? buildElementTree(match.child) : null;
    const current = match.route.element ?? <Outlet />;
    return <OutletCtx.Provider value={child}>{current}</OutletCtx.Provider>;
}
