export interface IChildrenProps {
  children: React.ReactNode;
}

export type BreadcrumbRoute = {
  handle: {
    title: string;
    breadcrumb?: JSX.Element;
  };
  pathname: string;
}
