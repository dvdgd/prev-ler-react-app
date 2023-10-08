import { useRouteError } from "react-router-dom";

type TUserRouterError = {
  statusText: string;
  message: string;
};

export const ErrorPage = () => {
  const error: TUserRouterError = useRouteError() as TUserRouterError;
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText.toString() || error?.message}</i>
      </p>
    </div>
  );
};
