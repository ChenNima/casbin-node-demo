// import { createRequire } from "https://deno.land/std/node/module.ts";
// import * as enforcer from "https://raw.githubusercontent.com/casbin/node-casbin/master/src/enforcer.ts";
// const casbin = createRequire(import.meta.url)("https://raw.githubusercontent.com/casbin/deno-casbin/master/node-casbin/index.js")
// const require = createRequire(import.meta.url);
// const casbin = require("casbin");
import path from 'path';
import { PrismaAdapter } from 'casbin-prisma-adapter';
import { newEnforcer } from "casbin"

(async() => {
  const a = await PrismaAdapter.newAdapter();
  const e = await newEnforcer(path.join(__dirname, '..', 'rbac_model.conf'), a);
  e.enableAutoSave(true)
  await e.addRoleForUser("felix", "user")
  await e.addPolicy('*', '/data/:file_id', 'read')
  console.log(`Role of felix is ${await e.getRolesForUser('felix')}`)
  console.log(`felix can read /data/file1 ? ${await e.enforce('felix', '/data/file1', 'read')}`)
  console.log(`felix can write /data/file1 ? ${await e.enforce('felix', '/data/file1', 'write')}`)
  console.log(`felix can read /image/image1 ? ${await e.enforce('felix', '/image/image1', 'read')}`)
  await e.addRoleForUser("felix", "admin")
  console.log(`Roles of felix are ${await e.getRolesForUser('felix')} now`)
  console.log(`felix can read /data/file1 ? ${await e.enforce('felix', '/data/file1', 'read')}`)
  console.log(`felix can write /data/file1 ? ${await e.enforce('felix', '/data/file1', 'write')}`)
  console.log(`felix can read /image/image1 ? ${await e.enforce('felix', '/image/image1', 'read')}`)
})()
