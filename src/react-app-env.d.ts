/// <reference types="react-scripts" />

interface NodeRequire {
  context(directory: string, useSubdirectories: boolean, pattern: RegExp): {
    (key: string): string;
    keys(): string[];
  };
}
