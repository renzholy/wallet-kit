interface Window {
  ethereum?: {
    isMetaMask?: boolean;
    request(args: { method: "eth_requestAccounts" }): Promise<[string]>;
    on(eventName: "accountsChanged", listener: ([string]) => void): void;
    removeListener(
      eventName: "accountsChanged",
      listener: ([string]) => void
    ): void;

    request(args: { method: "eth_chainId" }): Promise<string>;
    on(eventName: "chainChanged", listener: (string) => void): void;
    removeListener(eventName: "chainChanged", listener: (string) => void): void;

    request(args: {
      method: "personal_sign";
      params: [string, string];
    }): Promise<string>;
    request(args: {
      method: "eth_signTypedData_v4";
      params: [string, unknown];
    }): Promise<string>;
    request(args: {
      method: "eth_sendTransaction";
      params: [unknown];
    }): Promise<string>;
  };
}
