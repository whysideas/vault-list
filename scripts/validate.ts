import Ajv from "ajv";
import addFormats from "ajv-formats";
import * as fs from "fs";
import * as path from "path";

const ROOT = path.resolve(__dirname, "..");

function main() {
  const schemaPath = path.join(ROOT, "schema", "vault-list.schema.json");
  const listPath = path.join(ROOT, "vault-list.json");

  const schema = JSON.parse(fs.readFileSync(schemaPath, "utf-8"));
  const list = JSON.parse(fs.readFileSync(listPath, "utf-8")) as {
    vaults: Array<{ rateManagerId: string; slug: string }>;
  };

  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv);
  const validate = ajv.compile(schema);

  const valid = validate(list);

  if (!valid) {
    console.error("Validation failed:");
    for (const error of validate.errors!) {
      console.error(`  ${error.instancePath}: ${error.message}`);
    }
    process.exit(1);
  }

  // Check for duplicate rateManagerIds
  const ids = list.vaults.map((v: any) => v.rateManagerId);
  const duplicates = ids.filter((id: string, i: number) => ids.indexOf(id) !== i);
  if (duplicates.length > 0) {
    console.error(`Duplicate rateManagerIds: ${duplicates.join(", ")}`);
    process.exit(1);
  }

  // Check for duplicate slugs
  const slugs = list.vaults.map((v: any) => v.slug);
  const dupSlugs = slugs.filter((s: string, i: number) => slugs.indexOf(s) !== i);
  if (dupSlugs.length > 0) {
    console.error(`Duplicate slugs: ${dupSlugs.join(", ")}`);
    process.exit(1);
  }

  console.log(`Validation passed. ${list.vaults.length} vault(s) in list.`);
}

main();
