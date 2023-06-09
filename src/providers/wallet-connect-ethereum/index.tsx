import type { EthereumProviderOptions } from "@walletconnect/ethereum-provider/dist/types/EthereumProvider";
import type { Transaction, TypedData } from "viem";
import { Provider } from "../../type";

const WalletConnectEthereumProvider: Provider<
  EthereumProviderOptions,
  { address: string; chainId: number },
  string | TypedData,
  Transaction
> = async (options) => {
  const { EthereumProvider } = await import("@walletconnect/ethereum-provider");
  const provider = await EthereumProvider.init(options);

  return {
    icon() {
      return <span>WC</span>;
    },

    name() {
      return "WalletConnect";
    },

    async connect(callback) {
      let [address] = await provider.request<[string]>({
        method: "eth_requestAccounts",
      });
      let chainId = parseInt(await provider.request({ method: "eth_chainId" }));
      callback({ address, chainId });

      const handleAccountsChanged = (args: string[]) => {
        address = args[0];
        callback({ address, chainId });
      };
      const handleChainChanged = (args: string) => {
        chainId = parseInt(args);
        callback({ address, chainId });
      };
      const handleDisconnect = () => {
        callback(undefined);
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        callback(undefined);
        provider.removeListener("accountsChanged", handleAccountsChanged);
        provider.removeListener("chainChanged", handleChainChanged);
        provider.removeListener("disconnect", handleDisconnect);
      };
    },

    async signMessage(message, account) {
      if (typeof message === "string") {
        return provider.request({
          method: "personal_sign",
          params: [message, account.address],
        });
      }
      return provider.request({
        method: "eth_signTypedData_v4",
        params: [account.address, message],
      });
    },

    async sendTransaction(transaction) {
      return provider.request({
        method: "eth_sendTransaction",
        params: [transaction],
      });
    },
  };
};

export default WalletConnectEthereumProvider;
