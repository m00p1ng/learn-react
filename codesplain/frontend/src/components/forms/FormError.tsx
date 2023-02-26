import classNames from 'classnames';

interface FormErrorProps {
  error?: any
  className?: string
}

function FormError({ error, className }: FormErrorProps) {
  if (error instanceof Error || (error && error.message)) {
    const classes = classNames('text-red-500', className);

    return <div className={classes}>Something went wrong: {error.message}</div>;
  }
  return null;
}

export default FormError;
