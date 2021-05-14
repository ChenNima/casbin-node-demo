import path from 'path';
import { PrismaAdapter } from 'casbin-prisma-adapter';
import { newEnforcer } from "casbin"

const aPromise = PrismaAdapter.newAdapter();

async function main() {
  const a = await aPromise
  const e = await newEnforcer(path.join(__dirname, 'rbac_model.conf'), a);
  e.enableAutoSave(true)
  await e.addPolicies([
    ['*', '/data/:file_id', 'read'],
    ['admin', '/data/:file_id', 'write'],
  ])
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    const a = await aPromise
    await a.close()
  })