# RouteHash Datum Gateway (StartOS)

RouteHash Datum Gateway is for a person who already runs Bitcoin Knots on StartOS and wants their own ASICs to mine through DATUM, with the pool pointed at RouteHash.

This StartOS download is the 64-bit package for an AMD or Intel server. A Raspberry Pi running StartOS does not have a gateway package in this release. A Raspberry Pi running Umbrel installs the same app from the RouteHash store, which has an amd64 and an arm64 image: [github.com/RouteHash-com/umbrel-store](https://github.com/RouteHash-com/umbrel-store).

## Why this DATUM

DATUM sits between the ASICs and the Knots node on this server. The node builds the block. The ASIC asks this gateway for work. This gateway joins RouteHash at `pool.routehash.com:28915`, so a block this node finds can be shared with that pool.

Ocean's DATUM package uses id `datum` and its own miner port. The Blake2b and SHA-256 companions use other miner ports. This package uses id `routehash-gateway` and miner port **23339** on Umbrel, and the port StartOS assigns on StartOS, so it can be installed beside a DATUM that is already there. Pool Host, the RouteHash pubkey, collaborative reward sharing set to prefer, Pool Pass User on, and Pool Pass Workers off are filled in for RouteHash. Never put 28915 on an ASIC.

## Who it is for

Use this package when the ASICs are yours and the Knots node is yours.

A hash-only miner that does not run a node leaves the firmware on `stratum.routehash.com:23335` and skips this package. A person who already runs one DATUM pastes Pool Host `pool.routehash.com`, port `28915`, and the pubkey from [pool/connect](https://app.routehash.com/pool/connect) into that gateway. One DATUM on the machine is the setup. Two gateways means two miner ports. An operator who wants the pool left blank clears Pool Host after install.

It is an overlay of [iohzrd/datum_gateway](https://github.com/iohzrd/datum_gateway) pin `7491a5099dd5d887a027c812f71de63e0d5986a3`, wrapped for StartOS 0.4, prefilled to join RouteHash as a segment. Package id is `routehash-gateway`. It is a separate service from Ocean's Datum package and from RATUM Prime.

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
- Title **RouteHash Datum Gateway**.
- Coordinator prefill (`startos/coordinator.ts`): host, port, pubkey, prefer, Pass User On, Workers Off.
- Empty split table on install. RouteHash’s marketplace does not POST this gateway.
- Icon is a bolt-in-ring mark (no letter badges).
- Blake2b header-v2 pin `7491a509` (same binary family as the Umbrel image).

We do not ship Knots, RATUM, or chain data. IBD and miner-listen firewall stay with the operator.

## Build

See [BUILD.md](BUILD.md). Output is `routehash-gateway_x86_64.s9pk`. Pack from this directory only.

## Umbrel

Same product: community store [github.com/RouteHash-com/umbrel-store](https://github.com/RouteHash-com/umbrel-store). Umbrel operators paste that GitHub URL in Settings → App stores. No extra hostname is required.
