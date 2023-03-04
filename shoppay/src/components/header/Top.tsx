import styles from './styles.module.scss'
import { MdSecurity } from 'react-icons/md'
import { BsSuitHeart } from 'react-icons/bs'
import {
  RiAccountCircleLine,
  RiArrowDropDownFill,
} from 'react-icons/ri'
import Link from 'next/link'
import { useState } from 'react'
import UserMenu from './UserMenu'
import Country from '@/types/country'

interface TopProps {
  country: Country
}

export default function Top({ country }: TopProps) {
  const [loggedIn, setLoggedIn] = useState(true)
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div></div>
        <ul className={styles.top__list}>
          <li className={styles.li}>
            <img src={country.flag} alt={country.name} />
            <span>{country.name} / USD</span>
          </li>
          <li className={styles.li}>
            <MdSecurity />
            <span>Buyer Protection</span>
          </li>
          <li className={styles.li}>
            <span>Customer Service</span>
          </li>
          <li className={styles.li}>
            <span>Help</span>
          </li>
          <li className={styles.li}>
            <BsSuitHeart />
            <Link href="/profile/wishlist">
              <span>Wishlist</span>
            </Link>
          </li>
          <li
            className={styles.li}
            onMouseOver={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
          >
            {loggedIn ? (
              <li>
                <div className={styles.flex}>
                  <RiAccountCircleLine />
                  <span>m00p1ng</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
            ) : (
              <li>
                <div className={styles.flex}>
                  <RiAccountCircleLine />
                  <span>Account</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
            )}
            {visible && <UserMenu loggedIn={loggedIn} />}

          </li>
        </ul>
      </div>
    </div>
  )
}
