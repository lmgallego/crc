import * as React from "react";

export function Highlight({ children }: { children: React.ReactNode }) {
  return <span className="text-highlight">{children}</span>;
}
