import path from "path";
import { addAliases } from "module-alias";

const args = process.argv.slice(2);
const mode = args[0] !== "dev" ? "dist" : "";

const base = path.join(process.cwd(), mode);

addAliases({
  "@root": ".",
  // "@helpers": path.resolve(base, "src/helpers"),
  "@core/entities": path.resolve(base, "src/db/models"),
  "@core/utils": path.resolve(base, "src/utils/index"),
  "@core/config": path.resolve(base, "src/config/config"),
  "@core/db-config": path.resolve(base, "src/db/config/config"),
  // "@core/modules/database": path.resolve(base, "src/modules/database/index"),
  "@core/db": path.resolve(base, "src/db/index"),
  "@core/worker": path.resolve(base, "src/modules/worker"),
  // "@core/models": path.resolve(base, "src/models"),
});
