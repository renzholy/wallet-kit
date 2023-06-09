import type { JSX } from "react";

export type Provider<C, A, M, T> = (config: C) => Promise<{
  icon(): JSX.Element;
  name(): string;
  connect(callback: (account?: A) => void): Promise<() => void>;
  signMessage(message: M, account: A): Promise<string>;
  sendTransaction(transaction: T, account: A): Promise<string>;
}>;
