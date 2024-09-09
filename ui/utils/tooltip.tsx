'use client'
import React, { ReactNode, useRef, useEffect } from 'react';
import tippy, { Instance, Props , followCursor } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/material.css';
import 'tippy.js/animations/scale.css';

interface TooltipProps {
  content: string | ReactNode;
  children: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  fontSize?: string;
  moves?:boolean
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, placement = 'top', fontSize = '14px' , moves=true }) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      if (tooltipRef.current) {
          const instance: Instance<Props> = tippy(tooltipRef.current, {
              content: content as string | Element | DocumentFragment,
              arrow: true,
              placement: placement,
              animation:"scale",
              allowHTML : true ,
              followCursor:moves , 
              plugins:[followCursor]
          });

          return () => {
              instance.destroy();
          };
      }
  }, [content, placement, fontSize]);

  return <div ref={tooltipRef}>{children}</div>;
};

export default Tooltip;