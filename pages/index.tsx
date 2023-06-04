import React, { useState } from 'react';
import { Web3Button } from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import styles from "../styles/Home.module.css";
import { PoweredBy } from '../components/PoweredBy';

const sdk = new ThirdwebSDK("mumbai");

const Airdrop = () => {
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenOwner, setTokenOwner] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [tokenId, setTokenId] = useState("");

  const handleAirdrop = (contract: { call: (arg0: string, arg1: (string | any[])[]) => void; }) => {
    let recipients, amounts, tokenIds;
    try {
      recipients = JSON.parse(recipient);
      amounts = JSON.parse(amount);
      tokenIds = JSON.parse(tokenId);
      if (!Array.isArray(recipients) || !Array.isArray(amounts) || !Array.isArray(tokenIds)) throw new Error();
    } catch {
      alert("Invalid input. Please input in JSON format like ['0x...']");
      return;
    }
    contract.call("airdrop", [
      tokenAddress,
      tokenOwner,
      recipients,
      amounts,
      tokenIds
    ]);
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Airdrop Tool</h1>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h2 className={styles.title}>ERC1155 Airdrop</h2>
            <h3>
              <label htmlFor="tokenAddress">Token Address:</label>
            </h3>
            <input type="text" id="tokenAddress" value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} placeholder="Enter token address" className={styles.inputStyle} />
            <h3>
              <label htmlFor="tokenOwner">Token Owner:</label>
            </h3>
            <input type="text" id="tokenOwner" value={tokenOwner} onChange={(e) => setTokenOwner(e.target.value)} placeholder="Enter token owner" className={styles.inputStyle} />
            <h3>
              <label htmlFor="recipient">Recipients:</label>
            </h3>
            <input type="text" id="recipient" value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder='Enter recipients in JSON format like ["0x..."]' className={styles.inputStyle} />
            <h3>
              <label htmlFor="amount">Amounts:</label>
            </h3>
            <input type="text" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Enter amounts in JSON format like ["1", "2", "3"]' className={styles.inputStyle} />
            <h3>
              <label htmlFor="tokenId">Token IDs:</label>
            </h3>
            <input type="text" id="tokenId" value={tokenId} onChange={(e) => setTokenId(e.target.value)} placeholder='Enter token IDs in JSON format like ["1", "2", "3"]' className={styles.inputStyle} />
            <br />
            <div className={styles.button}>
              <Web3Button
                contractAddress="0xBD618695009ce02c333CE48981887E5B8E73beF0"
                action={handleAirdrop}
              >
                Airdrop NFTs
              </Web3Button>
            </div>
          </div>
        </div>
        <PoweredBy />
      </main>
    </div>
  );
};

export default Airdrop;