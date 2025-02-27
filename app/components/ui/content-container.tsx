import React from "react";

interface ContentContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * ContentContainer provides a consistent width constraint for page content
 * while allowing full-width backgrounds in parent elements.
 */
export function ContentContainer({ 
  children, 
  className = ""
}: ContentContainerProps) {
  return (
    <div className={`max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
} 