# Build RouteHash Gateway for StartOS 0.4

This wrapper builds [iohzrd/datum_gateway](https://github.com/iohzrd/datum_gateway)
at `7491a5099dd5d887a027c812f71de63e0d5986a3` into a **v2 merkle `.s9pk`**.

Package id is **`routehash-gateway`**. Output is **`routehash-gateway_x86_64.s9pk`**.
Sideload on a StartOS box that already runs Knots. It does **not** replace a
service named `datum`.

In the RouteHash workspace this directory is `packaging/routehash-gateway-startos`.
In the public repo the same files are at the root.

## Prerequisites

```bash
curl -fsSL https://start9.com/start-cli/install.sh | sh
start-cli --version

# Workspace is the directory that contains package repos:
cd ~/Projects
start-cli s9pk init-workspace .
```

Docker Buildx, Node.js/npm. Signing workspace is `~/Projects/.startos/`.

## Build (x86_64)

```bash
cd ~/Projects/routehash/packaging/routehash-gateway-startos
npm install
npm run check
npm run build
make x86
```

From a clone of this GitHub repo, `cd` into the clone instead of the workspace
path above.

Output: `routehash-gateway_x86_64.s9pk`.

Sideload that file. Open **Actions & Config**: Mining Settings (payout address),
confirm Pool Host `pool.routehash.com` port `28915`, Collaborative reward sharing
= prefer, Pool Pass User = On, Pool Pass Workers = Off. Point **your** ASICs at
this gateway’s miner listen (StartOS-assigned, often 23334). Never 28915 on the
miner.

If the operator already has DATUM, skip this package and paste Pool Host on the
gateway they already run.
