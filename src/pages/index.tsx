import styles from '@/styles/Home.module.css'
import { useEffect, useMemo, useState } from 'react';
import { Inter } from 'next/font/google'
import { Item } from '@/components/item/item.component'

const inter = Inter({ subsets: ['latin'] })

interface Item {
  created: string;
  filename: string;
}

export default function Home() {

  const [list, setList] = useState<Item[]>([]);
  const [selectValue, setSelectValue] = useState('sort-date');

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/data');
      const data = await response.json();
      setList(data);
    })();
  }, []);

  const sortedList = useMemo(() => {
    switch (selectValue) {
      case 'sort-date': return list.sort((item1, item2) => Date.parse(item1.created) - Date.parse(item2.created));
      case 'sort-a-z': return list.sort((item1, item2) => sortByName(item1, item2));
      case 'sort-z-a': return list.sort((item1, item2) => sortByName(item2, item1));
    }
  }, [list, selectValue]);

  function sortByName(item1: Item, item2: Item) {

    const item1Numeric = parseName(item1.filename);
    const item2Numeric = parseName(item2.filename);

    // if the names of both items are numeric, then sort the list comparing
    // the numbers, else sort the list comparing the strings.
    if (/^\d+$/.test(item1Numeric) && /^\d+$/.test(item2Numeric)) {
      return parseInt(item1Numeric) - parseInt(item2Numeric);
    } else {
      return item1Numeric.localeCompare(item2Numeric);
    }
  }

  // This function check if the name contain numbers, if the name contains
  // numbers then return only the numbers, else return the original filename.
  function parseName(name: string) {
    return /\d+/.test(name) ? name.replaceAll(/\D/g, '') : name;
  }

  return (
    <div className={`${styles.container} ${inter.className}`}>
      <h1 className={styles.title}>Sort list</h1>
      <select
        className={styles.select}
        value={selectValue}
        onChange={e => setSelectValue(e.target.value)}>
        <option value="sort-date">Sort by date</option>
        <option value="sort-a-z">Sort a-z</option>
        <option value="sort-z-a">Sort z-a</option>
      </select>
      <ul className={styles.list}>
        {
          sortedList?.map(i => 
            <Item key={i.created} created={i.created} filename={i.filename}/>
          )
        }
      </ul>
    </div>
  )
}
