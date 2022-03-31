import { parse, DotenvParseOutput } from "dotenv";
import fs from "fs";
import path from "path";

interface ParserVariablesI {
  envFile: string;
}

const ERROR_SOURCE_DOESNT_FOUND = `Doesnt found source of configuration variables\n`;

const parseFile = ({ envFile }: ParserVariablesI): DotenvParseOutput =>
  parse(fs.readFileSync(path.resolve(process.cwd(), envFile)));

const parseEnv = ({ envFile }: ParserVariablesI): DotenvParseOutput => {
  try {
    const pattern = new RegExp("prod", "gi");

    if (!process.env.NODE_ENV) {
      return parseFile({ envFile });
    }

    if (process.env.NODE_ENV.match(pattern)) {
      return process.env as DotenvParseOutput;
    }

    return parseFile({ envFile });
  } catch (e) {
    console.error(e);
    return process.env as DotenvParseOutput;
  }
};

export { parseEnv, ERROR_SOURCE_DOESNT_FOUND };
