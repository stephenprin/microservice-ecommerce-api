import express, { Request, Response, NextFunction } from 'express';
import { validateSignature } from '../../utils';

export const userAuth = async (req: Request, res: Response, next: NextFunction) => {
    const isAutorized = await validateSignature(req)
    if (isAutorized) {
        return next()
    }
    return res.status(403).json({ message: 'Unauthorized' })
}