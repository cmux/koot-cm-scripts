/**
 * @module CLI脚本-启动开发环境
 */

import inquirer from 'inquirer';

(async (): Promise<void> => {
    const defaultValue = '';
    const countdown = 1 * 1000;
    const question = {
        type: 'list',
        name: 'arg',
        message: 'Select development environment type',
        default: 0,
        choices: [
            new inquirer.Separator(),
            {
                name: 'Full environment',
                value: '',
                short: 'Full'
            },
            {
                name: 'Full environment (Donnot auto-open page)',
                value: '--no-open',
                short: 'Full (Donnot auto-open page)'
            },
            new inquirer.Separator(),
            {
                name: 'Start only webpack-dev-server for client',
                value: '-c',
                short: 'Only Client'
            },
            {
                name: 'Start only node.js server for SSR',
                value: '-s',
                short: 'Only Server'
            }
        ]
    };

    const arg = await new Promise((resolve): void => {
        const prompt = inquirer.prompt([question]);

        const timeout = setTimeout(() => {
            // prompt.ui.close();
            console.log(prompt.ui);
            console.warn(' ');
            resolve(defaultValue);
        }, countdown);

        prompt.then(results => {
            clearTimeout(timeout);
            resolve(results.arg);
        });
    });

    console.warn({ arg });
})().catch(err => console.error(err));
