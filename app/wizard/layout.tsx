import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-screen w-full flex-col-center-center">
      {children}
    </div>
  );
}
