export interface SimpleDBInterface {
  get(key: string): Number | null;

  set(key: string, value: any): void;

  unset(key: string): void;

  begin(): void;

  rollback(): void | Error;

  commit(): void | Error;
}

export class SimpleDB implements SimpleDBInterface {
  private store: Map<string, any> = new Map()
  private tranStack: Map<string, any>[] = []

  get(key: string): Number | null {
    for (let i = this.tranStack.length - 1; i >= 0; i--) {
      const transaction = this.tranStack[i]
      if (transaction.has(key)) {
        return transaction.get(key)
      }
    }
    return this.store.get(key)
  }

  set(key: string, value: any) {
    if (this.tranStack.length == 0) {
      this.store.set(key, value)
      return
    }
    const transaction = this.tranStack[this.tranStack.length - 1]
    transaction.set(key, value)
  }

  unset(key: string) {
    this.set(key, null)
  }

  begin() {
    this.tranStack.push(new Map())
  }

  rollback(): void | Error {
    if (this.tranStack.length == 0) {
      throw new Error('Cannot rollback')
    }
    this.tranStack.pop()
  }

  commit(): void | Error {
    if (this.tranStack.length == 0) {
      throw new Error('Cannot commit')
    }
    for (const transaction of this.tranStack) {
      for (const [key, value] of transaction) {
        this.store.set(key, value)
      }
    }
    this.tranStack = []
  }
}
