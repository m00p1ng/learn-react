import Link from 'next/link'
import { RiSearch2Line } from 'react-icons/ri'
import { FaOpencart } from 'react-icons/fa'
import { useSelector } from "react-redux";
import styles from './styles.module.scss'

export default function Main() {
  const { cart } = useSelector((state) => ({ ...state }));

  return (
    <div className={styles.main}>
      <div className={styles.main__container}>
        <Link href="/">
          <span className={styles.logo}>
            <img src="../../../logo.png" alt="logo" />
          </span>
        </Link>
        <div className={styles.search}>
          <input type="text" placeholder="Search..." />
          <div className={styles.search__icon}>
            <RiSearch2Line />
          </div>
        </div>
        <Link href="/cart">
          <span className={styles.cart}>
            <FaOpencart />
            <span>0</span>
          </span>
        </Link>
      </div>
    </div>
  )
}
