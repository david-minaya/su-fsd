import styles from './item.module.css'

interface Props {
  created: string;
  filename: string;
}

export function Item(props: Props) {

  const { created, filename } = props;

  return (
    <li className={styles.container}>
      <div className={styles.created}>{created}</div>
      <div className={styles.filename}>{filename}</div>
    </li>
  )
}
