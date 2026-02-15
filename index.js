import express from "express";

const app = express();

const RPCS = [
  "https://api.mainnet-beta.solana.com",
  "https://solana.public-rpc.com",
  "https://rpc.ankr.com/solana"
];

app.get("/balance/:wallet", async (req, res) => {
  for (let rpc of RPCS) {
    try {
      const r = await fetch(rpc, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "getBalance",
          params: [req.params.wallet]
        })
      });

      const j = await r.json();

      if (j.result) {
        return res.json({ sol: j.result.value / 1e9 });
      }

    } catch {}
  }

  res.json({ error: "rpc failed" });
});

app.listen(3000, () => console.log("Relay running"));
