import WPPostData from "./interfaces/WPPostData";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

function data() {
  const fileName = process.env.DATA_FILE;
  if (!fileName) throw new Error("No data file specified");
  const text = fs.readFileSync(path.join(process.cwd(), fileName), "utf-8");
  const records = parse(text, {
    columns: true,
    skip_empty_lines: true,
  });
  console.log(records);
  return records as WPPostData[];
}

export default data();
