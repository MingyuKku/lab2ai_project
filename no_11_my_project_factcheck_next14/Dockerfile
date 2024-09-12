# Base 빌드 이미지
FROM node:18-alpine AS base

# 필요한 의존성 패키지 설치
FROM base AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile


# 소스 코드의 변경이 있을 때에만 재빌드를 수행
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build



# 운영 환경에 배포될 이미지
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_SHARP_PATH=/app/node_modules/sharp


# 시스템 사용자 추가
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 빌드 결과 복사
COPY --from=builder /app/public ./public

# 프리렌더 캐시의 올바른 권한 설정
RUN mkdir .next
RUN chown nextjs:nodejs .next

# 이미지 크기를 줄이기 위해 출력 추적 활용
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# 포트 노출
EXPOSE 32001
ENV PORT 32001


CMD ["node", "server.js"]