const { gitDescribeSync } = require('./node_modules/git-describe');
const { version } = require('./package.json');
const { resolve, relative } = require('./node_modules/path');
const { writeFileSync } = require('./node_modules/fs-extra');

const gitInfo = gitDescribeSync({
    dirtyMark: false,
    dirtySemver: false,
    customArguments: ['--abbrev=40']
});

gitInfo.version = version;

const file = resolve(__dirname, 'src', 'environments', 'version.ts');
writeFileSync(file,
`// IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR COMMIT!
/* tslint:disable */
export const VERSION = ${JSON.stringify(gitInfo, null, 4)};
/* tslint:enable */
`, { encoding: 'utf-8' });

console.log(`Wrote version info ${gitInfo.raw} to ${relative(resolve(__dirname, '..'), file)}`);
