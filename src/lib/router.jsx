import { useMemo } from 'react';
import {
  Link as WouterLink,
  Route as WouterRoute,
  Switch,
  useLocation as useWouterLocation,
  useSearch,
} from 'wouter';

export function Link({ to, ...props }) {
  return <WouterLink href={to} {...props} />;
}

export function Routes({ children }) {
  return <Switch>{children}</Switch>;
}

export function Route({ path, element }) {
  return <WouterRoute path={path}>{element}</WouterRoute>;
}

export function useLocation() {
  const [pathname] = useWouterLocation();
  return { pathname };
}

export function useNavigate() {
  const [, navigate] = useWouterLocation();
  return navigate;
}

export function useSearchParams() {
  const search = useSearch();
  const [pathname, navigate] = useWouterLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);

  const setParams = (nextParams, options) => {
    const next = nextParams instanceof URLSearchParams
      ? nextParams
      : new URLSearchParams(nextParams);
    const query = next.toString();
    navigate(query ? `${pathname}?${query}` : pathname, options);
  };

  return [params, setParams];
}
