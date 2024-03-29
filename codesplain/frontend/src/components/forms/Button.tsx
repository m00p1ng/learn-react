import classNames from 'classnames';
import { IssueDraftIcon as Spinner } from '@primer/octicons-react';
import { ReactNode } from 'react';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  wide?: boolean
  className?: string
  children?: ReactNode
  loading: boolean
  type?: "submit" | "button" | undefined
}

function Button({
  wide,
  className,
  children,
  loading,
  ...rest
}: ButtonProps) {
  const classes = classNames(
    'rounded-md border bg-blue-600 py-3 text-sm font-medium text-white',
    {
      'opacity-50': loading,
    },
    wide ? 'px-12' : 'px-6',
    loading ? 'border-blue-300' : 'border-blue-600',
    className
  );

  const spinner = <Spinner className="animate-spin w-10" />;

  return (
    <button {...rest} disabled={loading} className={classes}>
      {loading ? spinner : children}
    </button>
  );
}

export default Button;
