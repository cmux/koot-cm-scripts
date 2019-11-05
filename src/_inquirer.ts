import inquirer from 'inquirer';

(async (): Promise<void> => {
    switch (process.argv.slice(2)[0]) {
        case 'auto-open-browser': {
            const { autoOpenBrowser } = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'autoOpenBrowser',
                    message: 'Auto-open browser?',
                    suffix: ' (Open after 5 seconds)',
                    default: true,
                    choices: [
                        {
                            name: 'Yes',
                            value: true
                        },
                        {
                            name: 'No',
                            value: false
                        }
                    ]
                }
            ]);

            if (process.send) {
                process.send(`SELECT::${autoOpenBrowser}`);
            }

            break;
        }
        default: {
        }
    }
})();
