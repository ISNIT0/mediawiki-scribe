import * as MsTranslator from 'mstranslator';
import { config } from "src/config";

const translateClient = new MsTranslator({
    api_key: config.azure.translateKey
}, true);

export function translate(text: string, targetLanguage: string): Promise<string> {
    return new Promise((resolve, reject) => {
        translateClient.translate({
            text,
            to: targetLanguage,
        }, (err: any, res: any) => {
            if (err) reject(err);
            else resolve(res);
        })
    });
}