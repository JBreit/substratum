#!/usr/bin/env node

import path from 'node:path';
import os from 'node:os';
import { spawn } from 'node:child_process';

import type { ChildProcess } from 'node:child_process';

export const exec = (command: string, args: [], variables: unknown[]): Promise<void> => {
  return new Promise((resolve, reject): void => {
    if (os.platform() == 'win32') { command += '.cmd'; }

    console.info(`Executing: ${command}  ${args.join(' ')} \n`, 'confirm');

    const cmd: ChildProcess = spawn(path.normalize(command), args, {
      stdio: 'inherit',
      cwd: process.cwd(),
    });

    cmd.on('exit', (code: number | null): void => {
      if (code === 1) {
        reject();
      }

      resolve();
    });
  });
};
