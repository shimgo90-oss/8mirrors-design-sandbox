<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# 8mirrors 랜딩 — 공유 브레인 (Codex · Claude 공통)

이 파일은 **모든 AI 에이전트가 읽는 단일 소스**다. (Claude는 `CLAUDE.md`가 이 파일을 `@import`, Codex는 `AGENTS.md`를 직접 읽음.) 전략이 바뀌면 **여기와 `context/`만** 고친다.

## 이 저장소가 하는 일
8mirrors 마케팅 **랜딩 사이트** (Next.js 16 App Router). 같은 광고를 여러 랜딩 변형에 보내 전환을 비교하는 **A/B 테스트 환경**.
- 변형 URL: `/lp/<slug>` (예: `/lp/original`, `/lp/lean`, `/lp/redness`, `/lp/routine`)
- 제품 앱(진단·로그인·리포트)은 **별도**(`eightmirrors.com`, glassy-web). 이 사이트는 마케팅 랜딩만. CTA는 제품 앱 진단 진입으로 핸드오프.

## 서비스 맥락 (카피·디자인 전에 반드시)
- **브랜드 보이스**: [context/brand-voice.md](context/brand-voice.md) — "동료의 메시지" 톤, '리포트'로 팔지 말 것
- **타깃**: [context/audience.md](context/audience.md) — 미국 30대 여성, 노출 카피는 **영어(US)**
- **가치 구조**: [context/value-prop.md](context/value-prop.md) — 무료진단=입구 / 맞춤 루틴·결과=핵심가치 / $9.99 인식 문제
- **변형 만드는 법·테스트 원칙**: [context/variant-playbook.md](context/variant-playbook.md)

## 2-에이전트 레인 (역할 분담)
- **마케터 레인 (Codex)** — 변형 조립/복제, 카피(`copy` 오버라이드), 섹션 순서, 실험 운영. **만지는 곳: `app/landing/_variants.tsx`, 카피.** React 컴포넌트 **신규 작성 금지** → 필요하면 이슈로 Claude에 넘김.
- **개발 레인 (Claude)** — React 컴포넌트, 새 섹션·커스텀 변형(`Custom`), 셸/스캐폴딩, 렌더 이슈. **만지는 곳: `app/landing/_variant-*.tsx`, `app/landing/page.tsx`, 신규 컴포넌트.**
- 한 줄: **Claude가 레고 블록을 만들고, 마케터가 블록으로 랜딩을 쌓는다. 블록 없으면 Claude에 주문.**

## 변형 시스템 구조
- [app/landing/_variants.tsx](app/landing/_variants.tsx) — 변형 레지스트리. 상단 주석에 "만드는 법". 변형 = `{ slug, note, sections?, copy?, Custom? }`.
- `sections` = 공유 블록 순서/부분집합 (`hero · what-you-get · report-archive · team · stories · offer · footer`).
- `copy` = i18n 키 → 텍스트 **노코드 오버라이드** (React 안 건드리고 문구 변경). 키는 [app/landing/_i18n.tsx](app/landing/_i18n.tsx).
- `Custom` = 완전 커스텀 레이아웃 컴포넌트 (개발 레인 전용, 예: [app/landing/_variant-redness.tsx](app/landing/_variant-redness.tsx)).
- 셸(헤더·스크롤·구매바)은 `LandingExperience`가 공유 — 모든 변형 동일 동작.

## 디자인 시스템 (UI 작업 시 반드시 준수)
전체 스펙: **[DESIGN.md](DESIGN.md)** (repo 내). 생성·수정 후 Do/Don't로 자가검수.

**Non-negotiable:**
- **디스플레이 폰트**: Fraunces (`--font-display`, [app/layout.tsx](app/layout.tsx)). 20px+ 헤딩, weight 400–500.
- **본문 폰트**: Inter (`--font-body`).
- **주 액센트**: Mirror Cyan `#62d8f4` — **항상 검정 텍스트(`#111111`)**, 흰색 금지.
- **보조 액센트**: Lumen Lime `#ecff8c` — **항상 검정 텍스트**, 하이라이터로만(배경 채움 X). 섹션당 1곳 max.
- Mirror Cyan ↔ Lumen Lime **인접 금지** (48px+ 중립 간격).
- 입체감은 **섀도 스택**(`var(--shadow-card)`, [app/globals.css](app/globals.css))으로 — CSS `border` 금지.
- 그라데이션·글로우·추가 브랜드 색 금지.
- 토큰: `bg-mirror-cyan`, `text-charcoal`, `bg-lumen-lime`, `text-mid-gray`, `bg-canvas` 등 ([app/globals.css](app/globals.css)). 레퍼런스 구현: [app/design-test/page.tsx](app/design-test/page.tsx).
- 셸은 maxWidth 480 모바일 캔버스 — <480 폭에서 우측 잘림은 정상(버그 아님), 480에서 검수.

## 배포·안전 (반드시)
- **main = production** (Vercel 자동 배포). 변형/실험은 `variant/<slug>` 브랜치 → push → **Vercel 프리뷰 URL**.
- **main 직접 머지·push 금지** (마케터 레인). PR 올리고 **고고가 디자인 검토 후 머지**.
- push 전 `npm run build`(=`next build`) 통과 확인 — 깨진 배포 금지.
- 변형은 **새 파일/레지스트리 1줄로 격리** → 기존 변형 안 건드림(blast radius 최소).
