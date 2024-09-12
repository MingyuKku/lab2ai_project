FROM node:18.18.2 as build-stage

ENV IMAGE_URL https://kr.object.ncloudstorage.com/cosign/
ENV API_URL https://content.cosign.cc
ENV GTM_ID G-DQ27XJPBPY
ENV AUTH_API_URL https://authorization.cosign.cc
ENV PAY_API_URL https://purchase-api.cosign.cc
ENV CHAT_API_URL https://chat.cosign.cc
ENV CHAT_SOCKET_URL https://chat.cosign.cc/cg
ENV DEPLOY_TYPE main
ENV NITRO_PORT 22001
ENV NODE_TLS_REJECT_UNAUTHORIZED 0

WORKDIR /www
COPY . ./
RUN yarn install
RUN yarn build


ENV HOST 0.0.0.0
EXPOSE 22001
CMD ["node", ".output/server/index.mjs", "--max_old_space_size=10240"]