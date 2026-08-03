import React from 'react';

// Lightweight Framer Motion Shim for seamless animation rendering
export const motion = new Proxy({}, {
  get: (_, prop: string) => {
    return React.forwardRef(({ 
      initial, animate, exit, whileInView, viewport, transition, 
      whileHover, whileTap, ...props 
    }: any, ref) => {
      const Tag = (prop || 'div') as keyof JSX.IntrinsicElements;
      return <Tag ref={ref} {...props} />;
    });
  }
}) as any;

export const AnimatePresence = ({ children }: any) => <>{children}</>;
