import { defineConfig } from "hardhat/config";
import hardhatIgnitionViemPlugin from "@nomicfoundation/hardhat-ignition-viem";
import hardhatNodeTestRunner from "@nomicfoundation/hardhat-node-test-runner";

export default defineConfig({
  plugins: [
    hardhatIgnitionViemPlugin,
    hardhatNodeTestRunner,
  ],
  solidity: {
    version: "0.8.34",
  },
});