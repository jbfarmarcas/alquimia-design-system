declare module "node:sqlite" {
  export type SqlValue = string | number | bigint | null | Uint8Array;

  export class StatementSync {
    run(...values: SqlValue[]): { changes: number | bigint; lastInsertRowid: number | bigint };
    get(...values: SqlValue[]): Record<string, SqlValue> | undefined;
    all(...values: SqlValue[]): Record<string, SqlValue>[];
  }

  export class DatabaseSync {
    constructor(path: string);
    exec(sql: string): void;
    prepare(sql: string): StatementSync;
  }
}
