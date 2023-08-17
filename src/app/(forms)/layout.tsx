import { PropsWithChildren } from "react";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-sky-500 min-h-screen flex flex-col justify-center items-center">
      {children}
    </div>
  );
};
export default Layout;
