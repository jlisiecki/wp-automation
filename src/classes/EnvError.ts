export default class EnvError extends Error {
    constructor(envName: string) {
        super(
            `You sholud specify ${envName} variable in .env file (look at example.env in main folder and create similar .env file).`
        );
    }
}
