# ZKP2P Vault List

Curated metadata registry for ZKP2P vaults. Similar to [Uniswap Token Lists](https://tokenlists.org/), this repo provides off-chain metadata for ZKP2P rate manager vaults deployed on Base.

**Endpoint:** `https://raw.githubusercontent.com/zkp2p/vault-list/main/vault-list.json`

## What is a vault?

A vault in ZKP2P is a [RateManagerV1](https://github.com/zkp2p/zkp2p-v2-contracts) instance — a delegated rate manager that sets exchange rates and fees for USDC deposits on the protocol. Depositors opt into a vault, and the vault manager handles rate management on their behalf.

## Schema

Each vault entry contains:

| Field | Required | Description |
|-------|----------|-------------|
| `rateManagerId` | Yes | bytes32 ID from the RateManagerV1 contract |
| `chainId` | Yes | Chain ID (8453 for Base) |
| `rateManagerAddress` | Yes | RateManagerV1 contract address |
| `name` | Yes | Display name |
| `slug` | Yes | URL-safe identifier |
| `description` | Yes | Short description (max 500 chars) |
| `strategyShort` | Yes | One-line strategy summary |
| `strategyLong` | No | Detailed strategy (markdown) |
| `manager.address` | Yes | Manager wallet address |
| `manager.name` | Yes | Manager display name |
| `manager.twitter` | No | Twitter/X handle |
| `fee` | No | Current fee (e.g. "1.0%") |
| `maxFee` | No | Maximum fee (e.g. "5.0%") |
| `paymentMethods` | Yes | Supported payment methods |
| `currencies` | Yes | Supported fiat currencies (ISO 4217) |
| `riskLevel` | No | Risk classification: low, medium, high |
| `tags` | No | Filterable tags (max 10) |
| `links` | No | External links (website, docs, twitter, discord, telegram) |
| `logoURI` | No | 256x256 vault logo URL |

Full JSON Schema: [`schema/vault-list.schema.json`](schema/vault-list.schema.json)

## Adding a vault

1. Fork this repo
2. Add your vault entry to the `vaults` array in `vault-list.json`
3. (Optional) Add a 256x256 PNG logo to `logos/<rateManagerId>/vault.png`
4. Run validation: `npm install && npm run validate`
5. Open a PR

### Example entry

```json
{
  "rateManagerId": "0x...",
  "chainId": 8453,
  "rateManagerAddress": "0x...",
  "name": "Peer LATAM USDC",
  "slug": "peer-latam-usdc",
  "description": "USDC liquidity vault for Latin American payment rails.",
  "strategyShort": "LATAM fiat on-ramp liquidity",
  "manager": {
    "address": "0x...",
    "name": "Peer Labs",
    "twitter": "peerxyz"
  },
  "fee": "1.0%",
  "maxFee": "3.0%",
  "paymentMethods": ["mercadopago", "pix"],
  "currencies": ["BRL", "ARS", "MXN"],
  "riskLevel": "low",
  "tags": ["latam", "stablecoin"]
}
```

## Versioning

Follows semantic versioning:

- **Major**: Vault removed or breaking schema change
- **Minor**: New vault added
- **Patch**: Metadata updates to existing vaults

## Validation

```bash
npm install
npm run validate
```

Runs automatically on PRs via GitHub Actions.

## Dynamic data

The following data is **not** in this list and should be fetched at runtime from on-chain or the [ZKP2P indexer](https://github.com/zkp2p/zkp2p-indexer):

- TVL (total deposits)
- Volume
- Fill rate / APY
- Active deposit count
- Current rates per currency pair

## License

MIT
