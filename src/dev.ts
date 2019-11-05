/**
 * @module CLI脚本-启动开发环境
 */

import { fork } from 'child_process';
import path from 'path';

(async (): Promise<void> => {
    const result = await new Promise((_resolve): void => {
        const inquirer = path.resolve(__dirname, '_inquirer.js');

        let resolved = false;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const resolve = (...args: any[]): void => {
            resolved = true;
            _resolve(...args);
        };

        const child = fork(inquirer, ['auto-open-browser'], {
            stdio: ['inherit', 'inherit', 'inherit', 'ipc']
        });
        child.on('message', message => {
            if (resolved) return;
            if (Array.isArray(/^SELECT::(.+)$/.exec(message))) {
                clearTimeout(timeout);
                resolve((/^SELECT::(.+)$/.exec(message) as string[])[1]);
            } else {
                clearTimeout(timeout);
            }
        });
        child.on('close', () => {
            clearTimeout(timeout);
            if (resolved) return;
            resolve(true);
        });
        child.on('exit', () => {
            clearTimeout(timeout);
            if (resolved) return;
            resolve(true);
        });
        child.on('error', (...args) => {
            clearTimeout(timeout);
            console.error(...args);
        });

        const timeout = setTimeout(() => {
            process.kill(child.pid);
            // eslint-disable-next-line no-console
            console.log(' ');
            resolve(true);
        }, 5000);
    });

    setTimeout(() => {
        console.log({ result });
    }, 100);
})().catch(err => console.error(err));
