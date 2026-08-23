import { constants, copyFileSync, chmodSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { randomBytes } from 'node:crypto';

const target = new URL('../.env', import.meta.url);
const example = new URL('../.env.example', import.meta.url);

if (existsSync(target)) {
  console.error('cms/.env already exists; refusing to overwrite it.');
  process.exitCode = 1;
} else {
  copyFileSync(example, target, constants.COPYFILE_EXCL);

  const secret = () => randomBytes(32).toString('base64url');
  const generated = {
    APP_KEYS: Array.from({ length: 4 }, secret).join(','),
    API_TOKEN_SALT: secret(),
    ADMIN_JWT_SECRET: secret(),
    TRANSFER_TOKEN_SALT: secret(),
    JWT_SECRET: secret(),
    ENCRYPTION_KEY: secret(),
  };

  const contents = Object.entries(generated).reduce(
    (value, [name, secretValue]) => value.replace(`${name}=\n`, `${name}=${secretValue}\n`),
    readFileSync(target, 'utf8'),
  );

  writeFileSync(target, contents, { mode: 0o600 });
  chmodSync(target, 0o600);
  console.log('Created cms/.env with fresh local-only secrets.');
}
