FROM debian:bookworm-slim AS build

RUN apt-get update && apt-get install -y --no-install-recommends \
        build-essential cmake curl git ca-certificates pkg-config python3 \
        libmicrohttpd-dev libjansson-dev libcurl4-openssl-dev \
        libgcrypt20-dev libsodium-dev \
    && rm -rf /var/lib/apt/lists/*

# iohzrd Blake2b DATUM: header-v2 (56c31f4) + 164-byte coinbase weight fix (7491a50).
ARG DATUM_REPO=https://github.com/iohzrd/datum_gateway.git
ARG DATUM_REF=7491a5099dd5d887a027c812f71de63e0d5986a3

WORKDIR /src
COPY patches/json_username_modifiers.c patches/apply_json_username_modifiers.py /tmp/datum-patches/
RUN git clone "$DATUM_REPO" datum_gateway \
 && cd datum_gateway \
 && git checkout "$DATUM_REF" \
 && git rev-parse HEAD > /src/PINNED_COMMIT \
 && test "$(cat /src/PINNED_COMMIT)" = "$DATUM_REF" \
 && python3 /tmp/datum-patches/apply_json_username_modifiers.py \
      /src/datum_gateway/src/datum_api.c \
      /tmp/datum-patches/json_username_modifiers.c \
 && grep -q datum_api_config_post_json src/datum_api.c \
 && cmake -B build -DCMAKE_BUILD_TYPE=Release \
 && cmake --build build -j"$(nproc)" \
 && strip build/datum_gateway

FROM debian:bookworm-slim AS final

RUN apt-get update && \
     apt-get install -y --no-install-recommends curl netcat-traditional \
        libmicrohttpd12 libjansson4 libsodium23 jq ca-certificates \
    && rm -rf /var/lib/apt/lists/*

ENV yq_sha256_amd64=c0eb42f6fbf928f0413422967983dcdf9806cc4dedc9394edc60c0dfb4a98529
ENV yq_sha256_arm64=4ab0b301059348d671fc1833e99903c1fecc7ca287ac131f72dca0eb9a6ba87a

ARG ARCH
ARG TARGETARCH
ARG PLATFORM=${TARGETARCH:-amd64}
RUN curl -sLo /usr/local/bin/yq https://github.com/mikefarah/yq/releases/download/v4.46.1/yq_linux_${PLATFORM} \
 && eval echo "\${yq_sha256_${PLATFORM}} */usr/local/bin/yq" | sha256sum -c \
 && chmod +x /usr/local/bin/yq

WORKDIR /root

COPY --from=build /src/datum_gateway/build/datum_gateway /usr/local/bin/datum_gateway
COPY --from=build /src/PINNED_COMMIT /etc/datum-pinned-commit
RUN chmod +x /usr/local/bin/datum_gateway
ADD ./docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
RUN chmod a+x /usr/local/bin/docker_entrypoint.sh
ADD ./check-stratum.sh /usr/local/bin/check-stratum.sh
RUN chmod a+x /usr/local/bin/check-stratum.sh
ADD ./check-bitcoin.sh /usr/local/bin/check-bitcoin.sh
RUN chmod a+x /usr/local/bin/check-bitcoin.sh
ADD ./check-dashboard.sh /usr/local/bin/check-dashboard.sh
RUN chmod a+x /usr/local/bin/check-dashboard.sh
ADD ./check-blocknotify.sh /usr/local/bin/check-blocknotify.sh
RUN chmod a+x /usr/local/bin/check-blocknotify.sh

# StartOS 4 destroyFs rms these bind-mount targets; they must exist in the image.
RUN mkdir -p \
      /media/startos/volumes/main \
      /media/startos/assets \
      /usr/lib/startos/package \
      /mnt/bitcoind \
      /mnt/knots \
      /data \
      /root/start9

WORKDIR /root
