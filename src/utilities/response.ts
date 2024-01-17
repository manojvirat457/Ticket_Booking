import express, { Request, Response } from 'express';

interface Result {
    success: boolean;
    data?: any;
    error?: any;
}

class Success implements Result {
    success = true;
    constructor(public data: any) { }
}

class Failure implements Result {
    success = false;
    constructor(public error: any) { }
}

export function ok(res: Response, data: any): void {
    
    res.status(200).json(new Success(data));
}

export function failed(res: Response, error: any): void {
    res.status(500).json(new Failure(error));
}