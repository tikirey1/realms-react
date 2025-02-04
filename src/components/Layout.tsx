import React, { ReactElement } from "react";
import { Head } from "./Head";

export default function Layout({
  children,
}: {
  children: ReactElement | ReactElement[];
}) {
  return (
    <div>
      <Head />
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}
