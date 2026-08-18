# Stage 1: Dependencies
FROM node:24-alpine AS deps
WORKDIR /app

# ติดตั้ง dependencies ที่จำเป็นสำหรับ native modules
RUN apk add --no-cache libc6-compat

# คัดลอก package files
COPY package.json package-lock.json ./

# ติดตั้ง dependencies ทั้งหมด (รวม devDependencies สำหรับ build)
RUN npm ci && npm cache clean --force

# Stage 2: Builder
FROM node:24-alpine AS builder
WORKDIR /app

# คัดลอก dependencies จาก deps stage
COPY --from=deps /app/node_modules ./node_modules

# คัดลอก source code ทั้งหมด
COPY . .

# Generate Prisma Client (v7 ใช้ driver adapter)
RUN npx prisma generate

# Build Next.js application
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Stage 3: Runner
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# สร้าง non-root user สำหรับรัน application
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# คัดลอก public assets
COPY --from=builder /app/public ./public

# คัดลอก standalone output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# คัดลอก Prisma v7 generated client และ schema
COPY --from=builder --chown=nextjs:nodejs /app/generated ./generated
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]