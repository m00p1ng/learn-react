import DotLoader from "react-spinners/DotLoader";

import styles from "./styles.module.scss";

interface DotLoaderSpinnerProps {
  loading: boolean
}

export default function DotLoaderSpinner({ loading }: DotLoaderSpinnerProps) {
  return (
    <div className={styles.loader}>
      <DotLoader color="#2f82ff" loading={loading} />
    </div>
  );
}
