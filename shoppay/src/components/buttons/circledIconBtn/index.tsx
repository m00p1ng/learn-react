import { BiRightArrowAlt } from "react-icons/bi";

import styles from "./styles.module.scss";

interface CircledIconBtnProps {
  type: "button" | "submit"
  text: string
  icon?: string
}

export default function CircledIconBtn({
  type,
  text,
  icon,
}: CircledIconBtnProps) {
  return (
    <button className={styles.button} type={type}>
      {text}
      <div className={styles.svg__wrap}>
        <BiRightArrowAlt />
      </div>
    </button>
  );
}
