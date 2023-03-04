import Ad from './Ad'
import Top from './Top'
import styles from './styles.module.scss'
import Main from './Main'
import Country from '@/types/country'

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
