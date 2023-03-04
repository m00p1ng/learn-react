import Country from '@/types/country'
import Ad from './Ad'
import Top from './Top'
import Main from './Main'

import styles from './styles.module.scss'

interface HeaderProps {
  country: Country
}

export default function Header({ country }: HeaderProps) {
  return (
    <header className={styles.header}>
      <Ad />
      <Top country={country} />
      <Main />
    </header>
  )
}
