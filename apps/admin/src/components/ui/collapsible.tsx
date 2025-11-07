import * as React from 'react';

export const Collapsible: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
> = ({ children, ...rest }) => {
  return <div {...rest}>{children}</div>;
};

export const CollapsibleTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  return <button type="button" ref={ref} {...props} />;
});
CollapsibleTrigger.displayName = 'CollapsibleTrigger';

export const CollapsibleContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return <div ref={ref} {...props} />;
});
CollapsibleContent.displayName = 'CollapsibleContent';
