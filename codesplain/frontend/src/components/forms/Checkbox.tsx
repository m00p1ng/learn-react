import classNames from 'classnames';
import { ChangeEvent } from 'react';
import Label from './Label';

interface CheckboxProps extends React.HTMLProps<HTMLInputElement> {
  className?: string,
  label?: string,
  name: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
}

function Checkbox({ className, label, ...rest }: CheckboxProps) {
  const classes = classNames(
    'h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm',
    className
  );

  return (
    <div className="flex gap-4">
      <input type="checkbox" id={rest.name} {...rest} className={classes} />
      <Label htmlFor={rest.name}>{label}</Label>
    </div>
  );
}

export default Checkbox;
