# Mandala Chain Hub Documentation

## Overview
Mandala Chain Hub is a decentralized application designed to provide an efficient and user-friendly platform for users to interact with various blockchain services and features created by Mandala Chain. Mandala Chain Hub aims to enhance accessibility and usability in the blockchain ecosystem.

## Getting Started
### Prerequisites
The project utilizes the following tools:
- **Next.js `14.2.6`**: A powerful React framework enabling server-side rendering (SSR) and static site generation (SSG). Next.js improves page performance significantly, making it an ideal choice for building SEO-friendly applications that require dynamic user interfaces integrated with backend services.
- **Wagmi `2.12.16`**: A collection of React Hooks for Ethereum that simplifies building web3 applications. Wagmi provides essential utilities for managing connections to Ethereum and EVM-compatible blockchains, enhancing the overall user experience.
- **Polkadot-API `13.0.1`**: A library that allows developers to interact with the Polkadot network. It provides functionality for querying the blockchain, sending transactions, and subscribing to real-time events, making it integral for any features interfacing with the Polkadot ecosystem.
- **Tailwind CSS `3.4.1`**: A utility-first CSS framework that enables rapid UI development. Tailwind CSS promotes consistent styling across components, allowing developers to quickly build responsive designs without leaving their HTML.
- **Headless UI `2.1.3`**: A collection of fully accessible UI components designed to integrate seamlessly with Tailwind CSS. These components provide developers with building blocks to create complex user interfaces while maintaining full control over design.

## Initial Setup
Setting up a development environment for MandalaChain Hub is straightforward. Follow these steps to get started:

### Development Environment Setup
1. **Install Dependencies**: First, ensure that you have `Node.js` and `Yarn` installed on your local machine. Then, navigate to the project directory in your terminal and install all necessary dependencies by running:
   ```bash
    yarn
   ```
2. **Run Locally**: After the dependencies are installed, you can run the project locally to test and develop new features. Use the command below:
    ```bash
     yarn dev
    ```
    This command starts the development server, and you can access the application in your web browser at http://localhost:3000.

3. **Build Project**: When you’re ready to deploy your application or create a production-ready build, execute the following command:
    ```bash
     yarn build
    ```
    This command generates an optimized version of your application in the .next directory, making it ready for deployment.
