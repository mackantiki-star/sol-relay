import express from "express";

const app = express();

app.get("/balance/:wallet", async (req, res) => {
  try {
    const r = await fetch("https://rpc.ankr.com/solana", {
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
    res.json({ sol: j.result.value / 1e9 });

  } catch (e) {
    res.json({ error: "rpc failed" });
  }
});

app.listen(3000, () => console.log("Relay running"));
