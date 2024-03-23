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

export async function waitUntilFileWithEndingCreated(ending: string, dir: string)
{
  let files: string[] = [];
  await until(()=>{
    const wsContents = fs.readdirSync(dir)
    files = wsContents.filter((elem: string)=> elem.endsWith(ending));

    return files.length > 0;
  }, 2000);
  return files;
}
