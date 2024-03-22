import * as fs from "fs";

export async function until(conditionFunction: any, timeout: any) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        
        const poll = async () => {
            if (await conditionFunction()) {
                resolve("");
            } else {
                const elapsedTime = Date.now() - startTime;
                if (elapsedTime >= timeout) {
                    reject(new Error("Timeout exceeded while waiting for condition to be met"));
                } else {
                    setTimeout(poll, 200);
                }
            }
        };

        poll();
    });
}

export async function isDirectory(path: string) {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err: any, stats: { isDirectory: () => unknown; }) => {
            if (err) {
                reject(err);
            } else {
                resolve(stats.isDirectory());
            }
        });
    });
}