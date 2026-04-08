import { parse } from 'csv-parse'
import fs from 'fs'

async function CSVParser(file: any) {
  const parser = fs.createReadStream(file.path).pipe(
    parse({
      columns: true,
      skip_empty_lines: true,
      from_line: 1,
    })
  )

  const records: any[] = []

  for await (const record of parser) {
    records.push({
      id: crypto.randomUUID(),
      ...record,
      completed_at: null,
      created_at: new Date(),
      updated_at: new Date(),
    })
  }

  return records
}

export { CSVParser }
