# RouteHash Gateway (StartOS)

Customer DATUM gateway for people who **already run Knots** on StartOS. It is an overlay of [iohzrd/datum_gateway](https://github.com/iohzrd/datum_gateway) pin `7491a5099dd5d887a027c812f71de63e0d5986a3`, wrapped for StartOS 0.4, prefilled to join RouteHash RATUM as a **segment**.

Package id is `routehash-gateway`. Title **RouteHash Gateway**. It is not Start9’s official Ocean Datum package (id `datum`) and it is not RATUM Prime.

Sideload: [app.routehash.com/pool/connect](https://app.routehash.com/pool/connect). Source: this tree. In the RouteHash workspace the same files live at `packaging/routehash-gateway-startos`.

## What it does

- Depends on the Knots package you already run (`bitcoind` / `#knots:`).
- Prefills DATUM Config: Pool Host `pool.routehash.com`, Pool Port `28915`, live pubkey from [/pool/connect](https://app.routehash.com/pool/connect), Collaborative reward sharing = prefer, Pool Pass User = On, Pool Pass Workers = Off.
- ASICs stay on **this** gateway’s miner listen (often 23334, or the port StartOS assigned). Never 28915 on the miner.
- Independent operators leave Pool Host blank after install, or skip the package.
- Hash-only miners skip this package. Firmware stays `stratum.routehash.com:23335`.

## One DATUM per box

StartOS treats this file as a **new** service. Sideloading it does **not** replace a service named `datum` (Ocean, CONVOY `#pow`, iohzrd).

If you **already** run DATUM, paste Pool Host / port / pubkey on **that** gateway. Do not run two DATUMs. Two services means two miner ports.

If StartOS said **Updated** on Datum when you installed a file, that file’s package id was `datum`. This package’s id is `routehash-gateway`; StartOS would list a second service named RouteHash Gateway.

## What we changed vs upstream iohzrd

- StartOS package id `routehash-gateway` (so it can install beside an existing `datum` without wiping it). That is StartOS safety, not permission to run two gateways.
- Title **RouteHash Gateway**.
- Coordinator prefill (`startos/coordinator.ts`): host, port, pubkey, prefer, Pass User On, Workers Off.
- Empty split table on install. RouteHash’s marketplace does not POST this gateway.
- Icon is a bolt-in-ring mark (no letter badges).
- Blake2b header-v2 pin `7491a509` (same binary family as the Umbrel image).

We do not ship Knots, RATUM, or chain data. IBD and miner-listen firewall stay with the operator.

## Build

See [BUILD.md](BUILD.md). Output is `routehash-gateway_x86_64.s9pk`. Pack from this directory only.

## Umbrel

Same product: community store [github.com/RouteHash-com/umbrel-store](https://github.com/RouteHash-com/umbrel-store). Umbrel operators paste that GitHub URL in Settings → App stores. No extra hostname is required.
