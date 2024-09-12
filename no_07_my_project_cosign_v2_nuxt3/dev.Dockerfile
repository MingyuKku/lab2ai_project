FROM node:18.18.2 as build-stage

ENV IMAGE_URL https://kr.object.ncloudstorage.com/cosign/
ENV API_URL https://dev-content.cosign.cc
ENV GTM_ID G-2LPELSEQBZ
ENV AUTH_API_URL https://dev-authorization.cosign.cc
ENV PAY_API_URL https://dev-purchase-api.cosign.cc
ENV CHAT_API_URL https://dev-chat.cosign.cc
ENV CHAT_SOCKET_URL https://dev-chat.cosign.cc/cg
ENV DEPLOY_TYPE dev
ENV NITRO_PORT 22001
ENV NODE_TLS_REJECT_UNAUTHORIZED 0

WORKDIR /www
COPY . ./
RUN yarn install
RUN yarn build


ENV HOST 0.0.0.0
EXPOSE 22001
CMD ["node", ".output/server/index.mjs", "--max_old_space_size=10240"]