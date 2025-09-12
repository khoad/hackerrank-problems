export interface SimpleDBInterface {
  get(key: string): Number | null;

  set(key: string, value: any): void;

  unset(key: string): void;

  begin(): void;

  rollback(): void | Error;

  commit(): void | Error;
}

let store = new Map()
let tempStore = new Map<string, (number | null)[]>()
let transaction = false
let tempKeys: string[] = []

export class SimpleDB implements SimpleDBInterface {

  get(key: string): Number | null {
    if (!transaction) {
      return store.get(key)
    }
    let array = tempStore.get(key) || []
    return array.length ? array[array.length - 1] : store.get(key)
  }

  set(key: string, value: any) {
    if (!transaction) {
      store.set(key, value)
      return
    }
    let array = tempStore.get(key) ?? []
    array.push(value)
    tempStore.set(key, array)
    tempKeys.push(key)
  }

  unset(key: string) {
    if (!transaction) {
      store.delete(key)
      return
    }
    this.set(key, null)
  }

  begin() {
    transaction = true
  }

  rollback(): void | Error {
    if (tempKeys.length == 0) {
      throw new Error()
    }
    let key = tempKeys.pop()!
    let array = tempStore.get(key)!
    if (array.length == 0) {
      throw new Error()
    }
    array.pop()
    tempStore.set(key, array!)
  }

  commit(): void | Error {
    if (!transaction) {
      throw new Error()
    }
    transaction = false
    tempKeys = []
    for (const [key, array] of tempStore) {
      store.set(key, array.pop())
    }
    tempStore.clear()
  }
}
