import { ReactNode } from "react";

export interface Provider<A, M, T> {
  icon(): ReactNode;
  name(): string;
  connect(callback: (account: A) => void): Promise<() => void>;
  signMessage(message: M): Promise<string>;
  sendTransaction(transaction: T): Promise<string>;
}
