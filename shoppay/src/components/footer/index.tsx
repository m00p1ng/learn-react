import Country from '@/types/country'
import Copyright from './CopyRight'
import Links from './Links'
import NewsLetter from './NewsLetter'
import Payment from './Payment'
import Socials from './Socials'

import styles from './styles.module.scss'

interface FooterProps {
  country: Country;
}

export default function Footer({ country }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <Links />
        <Socials />
        <NewsLetter />
        <Payment />
        <Copyright country={country} />
      </div>
    </footer>
  )
}
