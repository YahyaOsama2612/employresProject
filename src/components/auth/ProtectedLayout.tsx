import React from "react";

interface ProtectedLayoutProps {
 
  children: React.ReactNode;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({
  children,
}) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default ProtectedLayout;
