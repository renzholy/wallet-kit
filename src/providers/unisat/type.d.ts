interface Window {
  unisat?: {
    requestAccounts(): Promise<string[]>;
    signMessage(message: string): Promise<string>;
    on(eventName: "accountsChanged", listener: (...args: any[]) => void): void;
    removeListener(
      eventName: "accountsChanged",
      listener: (...args: any[]) => void
    ): void;
  };
}
