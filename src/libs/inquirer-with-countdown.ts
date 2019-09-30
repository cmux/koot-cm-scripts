import readline from 'readline';
import inquirer from 'inquirer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const inquirerWithCountdown = async <T>(
    /**
     * inquirer 问题
     * - 注: 仅支持传入一个问题
     */
    question: inquirer.DistinctQuestion<T>,
    /** 倒计时时长 (ms) */
    countdown = 1000,
    /**
     * 默认答案
     * - 如果问题为列表型，默认为问题的第一项
     * - 否则默认为空字符串
     */
    defaultAnswer?: T
): Promise<T> => {
    const ui = new inquirer.ui.BottomBar();
    const answerKey = question.name ? question.name : 0;
    const answer = await new Promise<T>((resolve): void => {
        const prompt = inquirer.prompt<{
            [Key: string]: T;
        }>([question]);

        let remaining = countdown;
        ui.updateBottomBar(`Auto-select first choice in ${remaining}ms`);
        const intervalCountdown = setInterval(() => {
            remaining -= 1000;
            if (remaining <= 0) {
                ui.updateBottomBar(``);
                clearInterval(intervalCountdown);
            } else {
                ui.updateBottomBar(
                    `Auto-select first choice in ${remaining}ms`
                );
            }
        }, 1000);

        const timeout = setTimeout(() => {
            // prompt.ui.close();
            // prompt.ui.rl.close();
            ui.updateBottomBar(``);
            readline.clearLine(process.stdout, -1);
            clearInterval(intervalCountdown);
            // console.log(' ');
            resolve(defaultAnswer);
        }, countdown);

        process.stdin.on('keypress', () => {
            clearInterval(intervalCountdown);
            ui.updateBottomBar(``);
        });

        prompt.then(results => {
            clearTimeout(timeout);
            clearInterval(intervalCountdown);
            resolve(results[answerKey]);
        });
    });

    return answer;
};

export default inquirerWithCountdown;
