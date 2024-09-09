import { cn } from '@/ui/utils/cn';
import React, { ReactNode } from 'react';
import "./ui.css"
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
}

export const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        ' dark:bg-secondary  focus:ring-2 transition bg-primary hover:bg-primary/90 hover:dark:bg-secondary/90 text-content rounded-full  ring-secondary/30  shadow-md relative capitalize overflow-hidden py-2 px-5',
        className
      )}
    >
      {children}
    </button>
  );
};
