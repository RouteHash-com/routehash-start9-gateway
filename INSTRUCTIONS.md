# RouteHash Gateway

Sideload this on a StartOS box that **already runs Knots** and does **not** already run DATUM. It is a DATUM gateway prefilled to join RouteHash RATUM as a **segment**. Package id is `routehash-gateway`. It does **not** replace a package named `datum`.

If you already run DATUM (Ocean, CONVOY `#pow`, Paulscode, iohzrd), paste Pool Host `pool.routehash.com`, port `28915`, and the Connect pubkey on **that** gateway. One DATUM per box.

## Who this is for

Node runners who already have StartOS + Knots and want share pay on RouteHash’s coordinator. You can still rent hash to this miner door. Independent operators who want solo mining should leave **Pool Host blank** after install, or skip this package.

## After sideload

1. Depend on the Knots you already run (`bitcoind` / `#knots:`).
2. Confirm DATUM Config → Pool Host is `pool.routehash.com`, Pool Port `28915`, Pool Pubkey filled, Collaborative reward sharing = prefer, Pool Pass User = On, Pool Pass Workers = Off.
3. Set your Mining Bitcoin Address (payout).
4. Point **your ASICs** at this gateway’s Stratum (StartOS-assigned miner port, often 23334). Never put an ASIC on 28915.
5. Optional: list this miner listen on RouteHash so rentals can hash here. Allow TCP on the listen only from `165.245.235.36`; do not world-open Stratum. Listed ASICs on `stratum.routehash.com:23335` are the hash market, not this Stratum.

## Solo vs segment

- **Segment:** keep the prefilled Pool Host and pubkey.
- **Solo / independent:** clear Pool Host (and pubkey). You keep the coinbase. You are not a RouteHash segment.

## Do not

- Install this next to an existing Datum service. One DATUM per box.
- Uninstall the Knots you already run.
- Type `stratum.routehash.com` or `:23335` into Pool Host.
