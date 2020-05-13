import * as React from 'react';

type ActionFn<A extends any[], T> = (...args: A) => Promise<T>;
type WithPromiseLoading = <T>(promise: Promise<T>) => Promise<T>;
type WithFnLoading = <A extends any[], T>(
  fn: ActionFn<A, T>
) => (...args: A) => Promise<T>;

function useLoading(
  initial = false
): [boolean, WithPromiseLoading, WithFnLoading] {
  const [isLoading, setIsLoading] = React.useState(initial);

  const withPromiseLoading: WithPromiseLoading = React.useCallback(
    (promise) => {
      setIsLoading(true);
      return promise.finally((...rest: any[]) => {
        setIsLoading(false);
        return rest;
      });
    },
    []
  );

  const withFnLoading: WithFnLoading = React.useCallback(
    (fn) => {
      return (...args) => withPromiseLoading(fn(...args));
    },
    [withPromiseLoading]
  );

  return [isLoading, withPromiseLoading, withFnLoading];
}

export default useLoading;
