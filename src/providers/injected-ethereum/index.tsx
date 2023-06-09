import type { Transaction, TypedData } from "viem";
import { Provider } from "../../type";

export default {
  icon() {
    return <span>IE</span>;
  },
  name() {
    return window.ethereum?.isMetaMask ? "MetaMask" : "Injected";
  },
  async connect(callback) {
    let [address] = await window.ethereum!.request({
      method: "eth_requestAccounts",
    });
    let chainId = parseInt(
      await window.ethereum!.request({ method: "eth_chainId" })
    );
    callback({ address, chainId });

    const handleAccountsChanged = (args: [string]) => {
      address = args[0];
      callback({ address, chainId });
    };
    const handleChainChanged = (args: string) => {
      chainId = parseInt(args);
      callback({ address, chainId });
    };

    window.ethereum!.on("accountsChanged", handleAccountsChanged);
    window.ethereum!.on("chainChanged", handleChainChanged);

    return () => {
      window.ethereum!.removeListener("accountsChanged", handleAccountsChanged);
      window.ethereum!.removeListener("chainChanged", handleChainChanged);
    };
  },
  async signMessage(message, account) {
    if (typeof message === "string") {
      return window.ethereum!.request({
        method: "personal_sign",
        params: [message, account.address],
      });
    }
    return window.ethereum!.request({
      method: "eth_signTypedData_v4",
      params: [account.address, message],
    });
  },
  async sendTransaction(transaction) {
    return window.ethereum!.request({
      method: "eth_sendTransaction",
      params: [transaction],
    });
  },
} satisfies Provider<
  { address: string; chainId: number },
  string | TypedData,
  Transaction
>;
