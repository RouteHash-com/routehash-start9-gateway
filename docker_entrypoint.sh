#!/bin/sh
set -eu

mkdir -p /data
CONFIG=/data/datum_gateway_config.json
PREV=/data/datum_gateway_config.json.prev
YAML=/data/config.yaml

if [ -f "$CONFIG" ]; then
    cp "$CONFIG" "$PREV"
fi

if [ ! -f "$YAML" ]; then
    echo "Error: /data/config.yaml missing. Run Configure Gateway in StartOS first."
    exit 1
fi

filter='.'
case $(yq eval .datum.reward_sharing "$YAML") in
require)
    filter="${filter}"'|.datum.pooled_mining_only=true'
    ;;
prefer)
    filter="${filter}"'|.datum.pooled_mining_only=false'
    ;;
never)
    filter="${filter}"'|.datum.pooled_mining_only=false'
    filter="${filter}"'|.datum.pool_host=""'
    ;;
esac

yq eval -o=json '(.stratum.username_modifiers) = (.stratum.username_modifiers | map({"key": .name, "value": (.addresses | map({((.address // "") | sub("^null$"; "")): (.split | tonumber)}) | .[] as $o ireduce ({}; . + $o))}) | from_entries)' "$YAML" > "$CONFIG"
jq ${filter} "$CONFIG" > "${CONFIG}.tmp" && mv "${CONFIG}.tmp" "$CONFIG"

if [ -f /mnt/bitcoind/.cookie ]; then
    cookie=$(cat /mnt/bitcoind/.cookie)
    rpcuser=$(printf '%s' "$cookie" | cut -d: -f1)
    rpcpassword=$(printf '%s' "$cookie" | cut -d: -f2-)
    jq --arg u "$rpcuser" --arg p "$rpcpassword" \
      '.bitcoind.rpcuser=$u | .bitcoind.rpcpassword=$p' \
      "$CONFIG" > "${CONFIG}.tmp" && mv "${CONFIG}.tmp" "$CONFIG"
fi

jq '.api.modify_conf = true | .mining.allow_hasher_time_rolling = false | .datum.protocol_v3 = true' "$CONFIG" > "${CONFIG}.tmp" && mv "${CONFIG}.tmp" "$CONFIG"

if [ -f "$PREV" ]; then
    ui_count=$(jq -r '.stratum.username_modifiers | if type=="object" then (keys|length) else 0 end' "$CONFIG")
    prev_count=$(jq -r '.stratum.username_modifiers | if type=="object" then (keys|length) else 0 end' "$PREV")
    if [ "${ui_count:-0}" -eq 0 ] && [ "${prev_count:-0}" -gt 0 ]; then
        echo "[i] Restoring stratum.username_modifiers from previous config"
        jq --slurpfile prev "$PREV" '.stratum.username_modifiers = ($prev[0].stratum.username_modifiers // {})' "$CONFIG" > "${CONFIG}.tmp" && mv "${CONFIG}.tmp" "$CONFIG"
    fi
fi

echo "[i] DATUM pin $(cat /etc/datum-pinned-commit 2>/dev/null || echo unknown)"
printf "\n\n [i] Starting Datum Gateway (iohzrd Blake2b) ...\n\n"

exec datum_gateway -c "$CONFIG"
