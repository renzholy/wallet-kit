interface Window {
  ethereum?: {
    isMetaMask?: boolean;
    request<T>(args: { method: string; params: unknown[] }): Promise<T>;
    on(eventName: "accountsChanged", listener: (...args: any[]) => void): void;
    removeListener(
      eventName: "accountsChanged",
      listener: (...args: any[]) => void
    ): void;
  };
}
