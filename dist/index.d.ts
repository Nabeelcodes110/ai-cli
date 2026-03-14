#!/usr/bin/env node
import 'dotenv/config';
export type CommitOptions = {
    description: string;
    message: string;
    messageTemplate: string;
};
