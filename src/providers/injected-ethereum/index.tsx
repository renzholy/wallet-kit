import type { Transaction, TypedData } from "viem";
import { Provider } from "../../type";

const provider: Provider<
  {
    isMetaMask?: boolean;
    request(args: { method: "eth_requestAccounts" }): Promise<[string]>;
    on(eventName: "accountsChanged", listener: (args: [string]) => void): void;
    removeListener(
      eventName: "accountsChanged",
      listener: (args: [string]) => void
    ): void;

    request(args: { method: "eth_chainId" }): Promise<string>;
    on(eventName: "chainChanged", listener: (args: string) => void): void;
    removeListener(
      eventName: "chainChanged",
      listener: (args: string) => void
    ): void;

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
  },
  { address: string; chainId: number },
  string | TypedData,
  Transaction
> = (ethereum) => ({
  icon() {
    return <span>IE</span>;
  },

  name() {
    return ethereum.isMetaMask ? "MetaMask" : "Injected";
  },

  async connect(callback) {
    let [address] = await ethereum.request({
      method: "eth_requestAccounts",
    });
    let chainId = parseInt(await ethereum.request({ method: "eth_chainId" }));
    callback({ address, chainId });

    const handleAccountsChanged = (args: [string]) => {
      address = args[0];
      callback({ address, chainId });
    };
    const handleChainChanged = (args: string) => {
      chainId = parseInt(args);
      callback({ address, chainId });
    };

    ethereum.on("accountsChanged", handleAccountsChanged);
    ethereum.on("chainChanged", handleChainChanged);

    return () => {
      ethereum.removeListener("accountsChanged", handleAccountsChanged);
      ethereum.removeListener("chainChanged", handleChainChanged);
    };
  },

  async signMessage(message, account) {
    if (typeof message === "string") {
      return ethereum.request({
        method: "personal_sign",
        params: [message, account.address],
      });
    }
    return ethereum.request({
      method: "eth_signTypedData_v4",
      params: [account.address, message],
    });
  },

  async sendTransaction(transaction) {
    return ethereum.request({
      method: "eth_sendTransaction",
      params: [transaction],
    });
  },
});

export default provider;
