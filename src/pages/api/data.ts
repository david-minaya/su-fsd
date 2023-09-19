import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

type Item = {
  created: string
  filename: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Item[]>) {

  const results: Item[] = [];

  fs.createReadStream(path.join(process.cwd(), 'data.csv'))
    .pipe(csv({ separator: ';', headers: ['created', 'filename'] }))
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.status(200).json(results)
    });
}
