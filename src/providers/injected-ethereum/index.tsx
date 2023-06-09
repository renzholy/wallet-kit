import type { Transaction, TypedData } from "viem";
import { Provider } from "../../type";

export const InjectedEthereumProvider: Provider<
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
> = async (ethereum) => ({
  icon() {
    return ethereum.isMetaMask ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 172 33"
        width="172"
        height="33"
      >
        <path
          fill="#161616"
          d="M151.26 16.64c-.89-.58-1.86-1-2.78-1.52-.6-.33-1.24-.63-1.76-1.06-.88-.72-.7-2.15.22-2.77 1.33-.88 3.52-.39 3.76 1.41 0 .04.04.07.08.07h2c.05 0 .09-.04.07-.1a3.94 3.94 0 00-1.46-2.94 4.66 4.66 0 00-2.84-.97c-5.28 0-5.77 5.59-2.92 7.35.33.2 3.12 1.6 4.1 2.21 1 .61 1.3 1.73.88 2.6-.4.81-1.4 1.37-2.42 1.3-1.1-.06-1.96-.66-2.26-1.59-.05-.17-.08-.5-.08-.63a.09.09 0 00-.08-.08h-2.17c-.03 0-.07.04-.07.08 0 1.56.39 2.43 1.45 3.22 1 .75 2.1 1.07 3.22 1.07 2.97 0 4.5-1.68 4.8-3.41.28-1.7-.22-3.23-1.74-4.24zm-94.2-7.59h-2.02a.09.09 0 00-.07.05l-1.78 5.86a.08.08 0 01-.16 0L51.25 9.1c-.01-.04-.04-.05-.08-.05h-3.31c-.04 0-.08.04-.08.07v14.96c0 .04.04.08.08.08h2.17c.04 0 .08-.04.08-.08V12.7c0-.09.13-.1.15-.02l1.8 5.9.13.4c0 .05.03.06.07.06h1.67c.04 0 .06-.03.07-.05l.13-.42 1.8-5.9c.02-.08.15-.06.15.03v11.37c0 .04.04.08.08.08h2.17c.04 0 .08-.04.08-.08V9.12c0-.03-.04-.07-.08-.07h-1.27zm60.98 0a.09.09 0 00-.08.05l-1.78 5.86a.08.08 0 01-.16 0l-1.78-5.86c0-.04-.03-.05-.07-.05h-3.3c-.04 0-.08.04-.08.07v14.96c0 .04.04.08.08.08h2.17c.03 0 .07-.04.07-.08V12.7c0-.09.13-.1.16-.02l1.8 5.9.12.4c.02.05.04.06.08.06h1.66a.1.1 0 00.08-.05l.13-.42 1.8-5.9c.02-.08.15-.06.15.03v11.37c0 .04.04.08.08.08h2.17c.04 0 .08-.04.08-.08V9.12c0-.03-.04-.07-.08-.07h-3.3zm-27.99 0H79.8c-.03 0-.07.04-.07.07V11c0 .04.04.08.07.08h3.97v13c0 .05.04.09.07.09h2.17c.04 0 .08-.04.08-.08V11.07h3.96c.04 0 .08-.04.08-.08V9.12c0-.03-.02-.07-.08-.07zm12.8 15.11h1.98c.05 0 .09-.06.07-.1l-4.08-15.01c0-.04-.03-.06-.07-.06H97.9a.09.09 0 00-.07.06l-4.08 15c-.02.05.02.1.07.1h1.98c.04 0 .06-.02.08-.05l1.18-4.36c.01-.04.04-.05.08-.05h4.36c.04 0 .07.02.08.05l1.18 4.36c.02.03.06.06.08.06zm-5.18-6.61l1.58-5.85a.08.08 0 01.16 0l1.58 5.85c.02.05-.02.1-.07.1h-3.17c-.06 0-.1-.05-.08-.1zm38.85 6.61h1.98c.05 0 .09-.06.08-.1L134.5 9.04c-.02-.04-.04-.06-.08-.06h-2.83a.09.09 0 00-.08.06l-4.08 15c-.01.05.03.1.08.1h1.97c.04 0 .07-.02.08-.05l1.18-4.36c.02-.04.04-.05.08-.05h4.37c.03 0 .06.02.07.05l1.19 4.36c0 .03.04.06.07.06zm-5.18-6.61l1.59-5.85a.08.08 0 01.15 0l1.59 5.85c0 .05-.03.1-.08.1h-3.17c-.05 0-.1-.05-.08-.1zm-64.12 4.39V17.3c0-.04.03-.08.07-.08h5.78c.04 0 .08-.04.08-.07v-1.87a.09.09 0 00-.08-.08H67.3c-.04 0-.07-.04-.07-.08v-3.96c0-.04.03-.08.07-.08h6.58c.04 0 .08-.04.08-.08V9.14a.09.09 0 00-.08-.08h-8.9a.09.09 0 00-.08.08v14.94c0 .04.04.08.08.08h9.17c.04 0 .08-.04.08-.08V22.1a.09.09 0 00-.08-.08h-6.86c-.04-.01-.06-.04-.06-.09zm103.86 2.09l-7.5-7.74a.08.08 0 010-.1l6.75-7a.07.07 0 00-.06-.13h-2.76c-.03 0-.04.01-.05.03l-5.73 5.93a.08.08 0 01-.13-.05V9.14a.09.09 0 00-.08-.08h-2.17a.09.09 0 00-.08.08v14.95c0 .04.04.08.08.08h2.17c.04 0 .08-.04.08-.08v-6.58c0-.07.09-.1.13-.05l6.5 6.68a.1.1 0 00.04.03h2.77c.05-.01.1-.1.04-.14z"
        ></path>
        <path
          fill="#E17726"
          stroke="#E17726"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width=".25"
          d="M32.96 1l-13.14 9.72 2.45-5.73L32.96 1z"
        ></path>
        <path
          fill="#E27625"
          stroke="#E27625"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width=".25"
          d="M2.66 1l13.02 9.8L13.35 5 2.66 1zm25.57 22.53l-3.5 5.34 7.49 2.06 2.14-7.28-6.13-.12zm-26.96.12l2.13 7.28 7.47-2.06-3.48-5.34-6.12.12z"
        ></path>
        <path
          fill="#E27625"
          stroke="#E27625"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width=".25"
          d="M10.47 14.51l-2.08 3.14 7.4.34-.24-7.97-5.08 4.5zm14.68.01l-5.16-4.6-.17 8.07 7.4-.34-2.07-3.13zM10.87 28.87l4.49-2.16-3.86-3-.63 5.16zm9.4-2.17l4.46 2.17-.6-5.17-3.86 3z"
        ></path>
        <path
          fill="#D5BFB2"
          stroke="#D5BFB2"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width=".25"
          d="M24.73 28.87l-4.46-2.16.36 2.9-.04 1.23 4.14-1.97zm-13.86 0l4.16 1.97-.03-1.23.36-2.9-4.49 2.16z"
        ></path>
        <path
          fill="#233447"
          stroke="#233447"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width=".25"
          d="M15.1 21.78l-3.7-1.08 2.62-1.2 1.09 2.28zm5.41 0l1.1-2.29 2.63 1.2-3.73 1.1z"
        ></path>
        <path
          fill="#CC6228"
          stroke="#CC6228"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width=".25"
          d="M10.87 28.87l.65-5.34-4.13.12 3.48 5.22zm13.23-5.34l.63 5.34 3.5-5.22-4.13-.12zm3.13-5.88l-7.4.34.68 3.8 1.1-2.3 2.63 1.2 2.99-3.04zM11.4 20.7l2.62-1.2 1.09 2.28.69-3.8-7.4-.33 3 3.05z"
        ></path>
        <path
          fill="#E27525"
          stroke="#E27525"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width=".25"
          d="M8.4 17.65l3.1 6.05-.1-3-3-3.05zm15.84 3.05l-.12 3 3.1-6.05-2.98 3.05zm-8.44-2.71l-.7 3.8.88 4.48.2-5.91-.38-2.37zm4.02 0l-.36 2.36.18 5.92.87-4.49-.69-3.8z"
        ></path>
        <path
          fill="#F5841F"
          stroke="#F5841F"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width=".25"
          d="M20.51 21.78l-.87 4.49.63.44 3.85-3 .12-3.01-3.73 1.08zM11.4 20.7l.1 3 3.86 3 .62-.43-.87-4.49-3.72-1.08z"
        ></path>
        <path
          fill="#C0AC9D"
          stroke="#C0AC9D"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width=".25"
          d="M20.6 30.84l.03-1.23-.34-.28h-4.96l-.33.28.03 1.23-4.16-1.97 1.46 1.2 2.95 2.03h5.05l2.96-2.04 1.44-1.19-4.14 1.97z"
        ></path>
        <path
          fill="#161616"
          stroke="#161616"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width=".25"
          d="M20.27 26.7l-.63-.43h-3.66l-.62.44-.36 2.9.33-.28h4.96l.34.28-.36-2.9z"
        ></path>
        <path
          fill="#763E1A"
          stroke="#763E1A"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width=".25"
          d="M33.52 11.35L34.62 6l-1.66-5-12.7 9.4 4.89 4.11 6.9 2.01 1.52-1.77-.66-.48 1.05-.96-.8-.62 1.05-.8-.7-.54zM1 5.99l1.12 5.36-.72.53 1.07.8-.8.63 1.04.96-.66.48 1.52 1.77 6.9-2 4.89-4.13L2.66 1 1 5.99z"
        ></path>
        <path
          fill="#F5841F"
          stroke="#F5841F"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width=".25"
          d="M32.05 16.52l-6.9-2 2.08 3.13-3.1 6.05 4.1-.05h6.13l-2.31-7.13zm-21.58-2.01l-6.9 2.01-2.3 7.13H7.4l4.1.05-3.1-6.05 2.08-3.14zm9.35 3.48l.45-7.6 2-5.4h-8.92l2 5.4.45 7.6.17 2.38v5.9h3.67l.02-5.9.16-2.38z"
        ></path>
      </svg>
    ) : (
      <svg
        enable-background="new 0 0 1920 1080"
        viewBox="0 0 1920 1080"
        xmlns="http://www.w3.org/2000/svg"
        width="192"
        height="108"
      >
        <g fill="#3b3b3b">
          <path d="m726.2 560.4c0 1.9-1.6 3.5-3.6 3.5h-66.3c1.7 16.4 14 31.4 31.4 31.4 11.9 0 20.7-4.5 27.3-14 .7-1 1.7-1.7 2.9-1.7 1.9 0 3.3 1.4 3.3 3.3 0 .7-.2 1.2-.5 1.7-6.7 11.6-20 17.3-33 17.3-22.3 0-38.3-20-38.3-41.3 0-21.4 15.9-41.3 38.3-41.3 22.3 0 38.4 19.8 38.5 41.1zm-7.1-3.1c-1.4-16.4-14-31.4-31.4-31.4s-29.7 15-31.4 31.4z" />
          <path d="m806.7 520.9c1.9 0 3.3 1.7 3.3 3.3 0 1.9-1.4 3.3-3.3 3.3h-17.8v69.9c0 1.7-1.4 3.3-3.3 3.3s-3.3-1.7-3.3-3.3v-69.9h-17.1c-1.9 0-3.3-1.4-3.3-3.3 0-1.7 1.4-3.3 3.3-3.3h17.1v-25.5c0-1.7 1.3-3.3 3-3.5 2.1-.2 3.7 1.3 3.7 3.3v25.7z" />
          <path d="m915.3 554.7v42.3c0 1.9-1.7 3.3-3.3 3.3-1.9 0-3.3-1.4-3.3-3.3v-42.3c0-14.3-8.1-28.5-24-28.5-20.4 0-29.2 17.8-28 36.1 0 .5.2 2.6.2 2.9v31.7c0 1.7-1.3 3.3-3 3.5-2.1.2-3.7-1.3-3.7-3.3v-139.1c0-1.7 1.4-3.3 3.3-3.3s3.3 1.7 3.3 3.3v78.6c5.7-10.2 15.9-17.1 27.8-17.1 19.6 0 30.7 17.1 30.7 35.2z" />
          <path d="m1034.4 560.4c0 1.9-1.6 3.5-3.6 3.5h-66.3c1.7 16.4 14 31.4 31.4 31.4 11.9 0 20.7-4.5 27.3-14 .7-1 1.7-1.7 2.9-1.7 1.9 0 3.3 1.4 3.3 3.3 0 .7-.2 1.2-.5 1.7-6.7 11.6-20 17.3-33 17.3-22.3 0-38.3-20-38.3-41.3 0-21.4 15.9-41.3 38.3-41.3 22.2 0 38.3 19.8 38.5 41.1zm-7.2-3.1c-1.4-16.4-14-31.4-31.4-31.4-17.3 0-29.7 15-31.4 31.4z" />
          <path d="m1115.8 524c0 2.1-1.2 3.3-3.1 3.6-19.5 2.9-28.3 18.8-28.3 37.3v31.7c0 1.7-1.3 3.3-3 3.5-2.1.2-3.7-1.3-3.7-3.3v-72.3c0-1.7 1.3-3.3 3-3.5 2.1-.2 3.7 1.3 3.7 3.3v14.7c5.5-9.3 16.4-18.1 27.8-18.1 1.7 0 3.6 1.2 3.6 3.1z" />
          <path d="m1224.9 560.4c0 1.9-1.6 3.5-3.6 3.5h-66.3c1.7 16.4 14 31.4 31.4 31.4 11.9 0 20.7-4.5 27.3-14 .7-1 1.7-1.7 2.9-1.7 1.9 0 3.3 1.4 3.3 3.3 0 .7-.2 1.2-.5 1.7-6.7 11.6-20 17.3-33 17.3-22.3 0-38.3-20-38.3-41.3 0-21.4 15.9-41.3 38.3-41.3 22.3 0 38.4 19.8 38.5 41.1zm-7.1-3.1c-1.4-16.4-14-31.4-31.4-31.4s-29.7 15-31.4 31.4z" />
          <path d="m1332.1 524.8v22.9 49.7c0 1.9-1.7 3.3-3.3 3.3-1.9 0-3.3-1.4-3.3-3.3v-13.8c-5.5 10.9-15.2 18.8-27.6 18.8-19.7 0-30.6-17.1-30.6-35.2v-42.5c0-1.7 1.4-3.3 3.3-3.3s3.3 1.7 3.3 3.3v42.5c0 14.3 8.1 28.5 24 28.5 22.3 0 27.6-20.9 27.6-44v-27.1c0-2 2.1-4 4.5-3.1 1.2.6 2.1 1.9 2.1 3.3z" />
          <path d="m1500 554.4v42.5c0 1.9-1.7 3.3-3.3 3.3-1.9 0-3.3-1.4-3.3-3.3v-42.5c0-14.3-8.1-28.3-24-28.3-20 0-27.6 21.4-27.6 38v32.8c0 1.9-1.7 3.3-3.3 3.3-1.9 0-3.3-1.4-3.3-3.3v-42.5c0-14.3-8.1-28.3-24-28.3-20.2 0-28.5 15.9-27.8 37.1 0 .5.2 1.4 0 1.7v31.9c0 1.7-1.3 3.3-3 3.5-2.1.2-3.7-1.3-3.7-3.3v-72.5c0-1.7 1.3-3.3 3-3.5 2.1-.2 3.7 1.3 3.7 3.3v12.1c5.7-10.2 15.9-16.9 27.8-16.9 13.5 0 24 8.6 28.3 21.1 5.5-12.4 16.2-21.1 29.9-21.1 19.5 0 30.6 16.9 30.6 34.9z" />
        </g>
        <path d="m503 504.8-83 37.7 83 49.1 83.1-49.1z" opacity=".6" />
        <path d="m420 542.5 83 49.1v-86.8-100.1z" opacity=".45" />
        <path d="m503 404.7v100.1 86.8l83.1-49.1z" opacity=".8" />
        <path d="m420 558.3 83 117v-68z" opacity=".45" />
        <path d="m503 607.3v68l83.1-117z" opacity=".8" />
      </svg>
    );
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
