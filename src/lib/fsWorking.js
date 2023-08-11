import fs from "fs";
import path from "path";
export const reader=(x)=>JSON.parse(fs.readFileSync(path.join(process.cwd(), "db", x)));
export const writer=(x, data)=>fs.writeFileSync(path.join(process.cwd(), "db", x), JSON.stringify(data, null, 5));