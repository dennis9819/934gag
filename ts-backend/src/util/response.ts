import * as express from 'express';

export function responseJson(req: express.Request, res: express.Response,code: number, data: any, err?: string): void{
    let respObj: any = {
        rescource: req.originalUrl.toString(),
        success: true,
        data: data,
        debug: {
            host: req.get('host'),
            proto: req.protocol
        }
    }
    if (err){
        respObj.success = false;
        respObj.error = err;
    }
    res.status(code);
    res.json(respObj);
}