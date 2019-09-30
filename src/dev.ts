/**
 * @module CLI脚本-启动开发环境
 */

import { fork } from 'child_process';
import path from 'path';

// import inquirer from 'inquirer';
// import inquirerWithCountdown from './libs/inquirer-with-countdown';

(async (): Promise<void> => {
    const result = await new Promise((_resolve): void => {
        const inquirer = path.resolve(__dirname, '_inquirer.js');
        let resolved = false;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const resolve = (...args: any[]): void => {
            resolved = true;
            _resolve(...args);
        };
        console.log({ inquirer });
        const child = fork(inquirer, [], {
            stdio: ['pipe', 'pipe', 'pipe', 'ipc']
        });
        child.on('message', message => {
            if (resolved) return;
            console.log('message from child:', message);
            resolve(message);
        });
        child.on('close', () => {
            if (resolved) return;
            resolve();
        });
        child.on('exit', () => {
            if (resolved) return;
            resolve();
        });
        child.on('error', (...args) => {
            console.error(...args);
        });
    });

    console.log({ result });
    // const arg = await inquirerWithCountdown<string>(
    //     {
    //         type: 'confirm',
    //         name: 'open',
    //         message: 'Auto-open browser?',
    //         default: true
    //     },
    //     5 * 1000,
    //     ''
    // );

    // console.warn({ arg });

    // 结束进程
    // process.kill(process.pid);

    // return;
})().catch(err => console.error(err));
