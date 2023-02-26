import classNames from 'classnames';
import { ReactNode } from 'react';

interface LabelProps extends React.HTMLProps<HTMLLabelElement> {
  className?: string
  children: ReactNode
}

function Label({ children, className, ...props }: LabelProps) {
  const classes = classNames(
    'block text-sm font-medium text-gray-700',
    className
  );

  return (
    <label {...props} className={classes}>
      {children}
    </label>
  );
}

export default Label;
