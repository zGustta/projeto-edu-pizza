import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

type Payload = {
    sub: string
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
        return res.status(401).end();
    }

    const [, token] = bearerToken.split(' ');

    try {
        const { sub } = verify(token, process.env.JWT_SECRET!) as Payload;
        console.log(sub);

        req.user_id = sub;

        return next();
    } catch (_) {
        return res.status(401).end();
    }
    
}