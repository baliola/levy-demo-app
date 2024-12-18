import type { PropsWithChildren, ReactElement } from "react";
import { Fragment } from "react";

export const Skeleton = (props: PropsWithChildren<{}>): ReactElement => {
  return <Fragment>{props.children}</Fragment>;
};

const List = (): ReactElement => {
  return (
    <div className="skeleton h-5 bg-gradient-to-r from-transparent to-skeleton animate-pulse transition-opacity w-full" />
  );
};

Skeleton.List = List;
