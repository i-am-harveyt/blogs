import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';

// Run parsers in a separate process so an infinite loop fails within 5 seconds.
// Reproductions: https://joshua.hu/image-size-infinite-loop-dos-vulnerabilities
for (const mode of ['require', 'import']) {
  test(`image-size rejects malformed images and reads valid images (${mode})`, () => {
    const result = spawnSync(process.execPath, ['--input-type=module', '-e', `
      import assert from 'node:assert/strict';
      import { createRequire } from 'node:module';
      import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
      import { tmpdir } from 'node:os';
      import { join } from 'node:path';
      const require = createRequire(process.cwd() + '/package.json');
      const load = ${mode === 'require' ? 'async (name) => require(name)' : '(name) => import(name)'};
      const { imageSize } = await load('image-size');
      const { imageSizeFromFile } = await load('image-size/fromFile');
      const { ICNS } = await load('image-size/types/icns');
      const { HEIF } = await load('image-size/types/heif');
      const { JXL } = await load('image-size/types/jxl');
      const hex = (s) => Buffer.from(s.replaceAll(' ', ''), 'hex');
      const icns = hex('69636e73 00000010 69733332 00000000');
      const heif = hex('00000010 66747970 61766966 00000000 00000024 6d657461 00000000 00000008 69707270 00000014 6970636f 00000000 69737065 00000000 00000000 00000000 00000000');
      const jxl = hex('0000000c 4a584c20 0d0a870a 00000010 66747970 6a786c20 00000000 00000000 6a786c70 00000000');
      const fixtures = [
        { input: icns, parser: ICNS, offset: 12 },
        { input: heif, parser: HEIF, offset: 44 },
        { input: jxl, parser: JXL, offset: 28 },
      ];
      const dir = mkdtempSync(join(tmpdir(), 'image-size-security-'));
      try {
        for (const { input, parser, offset } of fixtures) {
          for (const size of [0, 1, 7]) {
            const malformed = Buffer.from(input);
            malformed.writeUInt32BE(size, offset);
            assert.throws(() => imageSize(malformed));
            assert.throws(() => parser.calculate(malformed));
            const path = join(dir, 'malformed');
            writeFileSync(path, malformed);
            await assert.rejects(() => imageSizeFromFile(path));
          }
        }
        // Valid headers for each patched format still yield dimensions.
        const validIcns = Buffer.from(icns);
        validIcns.writeUInt32BE(8, 12);
        const validHeif = Buffer.from(heif);
        validHeif.writeUInt32BE(20, 44);
        validHeif.writeUInt32BE(32, 56);
        validHeif.writeUInt32BE(24, 60);
        const validJxl = hex('0000000c 4a584c20 0d0a870a 00000010 66747970 6a786c20 00000000 0000000c 6a786c63 ff0a0100');
        const svg = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="24"></svg>');
        for (const [input, width, height] of [[validIcns, 16, 16], [validHeif, 32, 24], [validJxl, 8, 8], [svg, 32, 24]]) {
          const dimensions = imageSize(input);
          assert.equal(dimensions.width, width);
          assert.equal(dimensions.height, height);
          const path = join(dir, 'valid');
          writeFileSync(path, input);
          const fromFile = await imageSizeFromFile(path);
          assert.equal(fromFile.width, width);
          assert.equal(fromFile.height, height);
        }
      } finally {
        rmSync(dir, { recursive: true, force: true });
      }
    `], { timeout: 5000, encoding: 'utf8' });
    assert.ifError(result.error);
    assert.equal(result.status, 0, result.stderr);
  });
}
