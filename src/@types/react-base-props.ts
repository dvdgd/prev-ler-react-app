export interface IChildrenProps {
  children: React.ReactNode;
}

export type BreadcrumbRoute = {
  handle: {
    title: string;
  };
  pathname: string;
}
