import Link from 'next/link'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { MdSecurity } from 'react-icons/md'
import { BsSuitHeart } from 'react-icons/bs'
import {
  RiAccountCircleLine,
  RiArrowDropDownFill,
} from 'react-icons/ri'

import Country from '@/types/country'
import UserMenu from './UserMenu'

import styles from './styles.module.scss'

interface TopProps {
  country: Country
}

export default function Top({ country }: TopProps) {
  const { data: session } = useSession()
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
            {session ? (
              <li>
                <div className={styles.flex}>
                  <img src={session.user.image} alt={session.user.name} />
                  <span>{session.user.name}</span>
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
            {visible && <UserMenu session={session} />}

          </li>
        </ul>
      </div>
    </div>
  )
}
