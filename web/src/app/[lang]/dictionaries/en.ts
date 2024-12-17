import type { IDictionaries } from "@/types/dictionaries";

const en: IDictionaries = {
  head: {
    title: "Mandala Chain Hub",
    description:
      "Your gateway to managing assets within the Mandala Chain Ecosystem. Discover innovative use cases and connect with our developer community to build on-chain solutions.",
  },
  navigation: {
    dashboard: "dashboard",
    explorer: "explorer",
    documentation: "documentation",
    community: "community",
    home: "home",
    project: "project"
  },
  settings: {
    name: "settings",
    theme: "theme",
    language: "language",
  },
  drawer: {
    network: "network",
    wallet: "wallet",
    select_wallet: "select wallet",
    change_network: "change network",
    evm_wallets: "EVM Wallets",
    native_wallets: "Native Wallets",
    disconnect: "disconnect",
    connect: "connect",
    show_balance: "Show Balance",
    no_network_option: "No Network Option Available",
    no_wallet_installed: "is not installed, please install at least one!",
  },
  dashboard: {
    average_block_time: "average block time",
    total_blocks: "total blocks",
    transactions_count: "transactions count",
    assets: "assets",
    token_empty: "no tokens have been registered yet.",
    token_not_found: "token not found.",
    search: "Search",
    news: "news",
    see_more: "See more",
    wallet_not_yet_connect: {
      title: "Unlock your experience",
      description:
        "Connect your wallet to access all features and fully immerse yourself in our app. Your adventure starts with a simple click!",
    },
    wallet: {
      copy_address: "Copy Address",
      explore_address: "Explore",
    },
  },
  project: {
    title: "All Project",
    search: {
      label: "Search",
      placeholder: "Project name",
    },
    filter: {
      label: "Filter by Tag",
      select_all: "Select All",
      reset: "Reset",
      placeholder: "Select Tag",
    },
    sort: {
      label: "Sort By",
      list: {
        name: "Name",
        year: "Year",
        tvl: "TVL",
        total_users: "Total Users",
      }
    },
    card: {
      users: "Users"
    },
    not_found: "No projects found, please update search",
    empty: "No projects have been added yet",
    item: {
      established_in: "Established in"
    }
  },
  modal_help: {
    title: "Unable to Connect",
    description:
      "There are many reasons why you are unable to connect your wallet. Try these advices, if it did not get sorted, you can ask member of the community.",
    list: {
      storage: {
        title: "Clear the Local Storage",
        description:
          "This means your cache of the Portal on this browser will be cleared.",
        button: "Clear",
      },
      community: {
        title: "Ask our Discord Communtiy",
        description: "Someone is always there for you.",
        button: "Join",
      },
    },
  },
  toast: {
    success: {
      connect_wallet: "Connecting Wallet Successful!",
      disconnect_wallet: "Disconnecting Wallet Successful!",
      address_copy: "Copy Success!",
    },
    alert: {
      please_wait_network: "Please Wait Until Network Connected",
      disconnect_wallet_first:
        "Please Disconnect First Before Connect To Another Wallet",
    },
    error: {
      connect_wallet: "Connecting Wallet Unsuccessful!",
      disconnect_wallet: "Disconnecting Wallet Unsuccessful!",
      address_copy: "Failed To Copy!",
    },
  },
};

export default en;
