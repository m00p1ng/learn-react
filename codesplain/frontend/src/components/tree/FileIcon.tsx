import "@exuanbo/file-icons-js/dist/css/file-icons.css";
// @ts-ignore
import icons from "@exuanbo/file-icons-js/dist/js/file-icons";
import { useEffect, useState } from "react";
import classNames from "classnames";

interface FileIconProps {
  name: string
  className?: string
}

function FileIcon({ name, className }: FileIconProps) {
  const [klass, setKlass] = useState("");

  useEffect(() => {
    icons
      .getClass(name)
      .then((k: string) => setKlass(k))
      .catch(() => null);
  }, [name]);

  if (!klass) {
    return null;
  }

  return (
    <i
      role="img"
      aria-label={name}
      className={classNames(className, klass)}
    ></i>
  );
}

export default FileIcon;
