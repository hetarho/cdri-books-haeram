# 📚 도서 검색 애플리케이션

> 확장 가능하고 유지보수하기 쉬운 아키텍처를 기반으로 한 도서 검색 서비스

## 🎯 프로젝트 개요

카카오 도서 API를 활용하여 도서를 검색하고 관리할 수 있는 웹 애플리케이션입니다. 
실무 환경을 고려한 확장 가능한 아키텍처 설계와 현대적인 프론트엔드 기술 스택을 적용하였으며,
특히 **Feature-Sliced Design(FSD)** 아키텍처와 **Clean Architecture** 원칙을 기반으로 
비즈니스 로직과 UI를 명확하게 분리하여 설계했습니다.

## 🚀 실행 방법

### 환경 요구사항

- Node.js 20.x 이상
- pnpm 8.x 이상 (권장)

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행 (http://localhost:3000)
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start

# 린트 검사
pnpm lint

# 단위 테스트 실행
pnpm test

# E2E 테스트 실행 (Cypress GUI)
pnpm cypress open

# E2E 테스트 실행 (헤드리스)
pnpm cypress run
```

### 환경 변수 설정

```env
# .env.local (예시)
NEXT_PUBLIC_KAKAO_API_KEY=your_api_key_here
```

## 📁 폴더 구조

프로젝트는 **Feature-Sliced Design(FSD)** 아키텍처를 기반으로 구성되어 있습니다.

```
src/
├── client/                    # 클라이언트 사이드 코드
│   ├── app/                   # 앱 레벨 설정 (Providers, Global Styles)
│   │   ├── providers/         # React Query Provider 등
│   │   └── styles/           # 전역 스타일
│   │
│   ├── entities/             # 비즈니스 엔티티 (도서)
│   │   └── book/
│   │       ├── api/          # 서버 액션 (Server Actions)
│   │       ├── hooks/        # React Query 훅
│   │       ├── ui/           # 도서 관련 UI 컴포넌트
│   │       └── utils/        # LocalStorage 관리 유틸
│   │
│   ├── features/             # 기능 단위 모듈
│   │   └── management-book-history/
│   │       ├── api/          # 검색 히스토리 관리 API
│   │       ├── hooks/        # 검색 히스토리 훅
│   │       └── utils/        # 히스토리 저장소 유틸
│   │
│   ├── widgets/              # 독립적인 위젯 (헤더, 검색바)
│   │   ├── header/           # 네비게이션 헤더
│   │   └── book-search/      # 도서 검색 위젯
│   │
│   ├── pages/                # 페이지 컴포넌트
│   │   ├── home/             # 홈 페이지
│   │   └── like/             # 좋아요 페이지
│   │
│   └── shared/               # 공유 리소스
│       ├── ui/               # 공통 UI 컴포넌트 (Button, Input 등)
│       └── utils/            # 유틸리티 함수
│
├── server/                   # 서버 사이드 코드
│   ├── domain/               # 도메인 계층 (Clean Architecture)
│   │   └── book/
│   │       ├── repository/   # 데이터 접근 계층
│   │       └── usecases/     # 비즈니스 로직
│   │           ├── interfaces/  # 인터페이스 정의
│   │           └── list-book.usecase.ts
│   │
│   ├── model/                # 도메인 모델
│   │   └── book.model.ts
│   │
│   ├── shared/               # 서버 공유 리소스
│   │   ├── config/           # 설정 (API Keys, URLs)
│   │   └── utils/            # 유틸리티
│   │
│   └── book-service.ts       # 서비스 계층 (TypeDI)
│
└── shared/                   # 클라이언트-서버 공유 타입
    └── types/
        └── book.ts           # 도서 타입 정의
```

### 주요 디렉토리 설명

#### 1. **Entities** (`src/client/entities`)
- 비즈니스 엔티티의 핵심 로직을 포함
- 도서 검색, 좋아요/좋아요 취소 등의 기능을 관리
- React Query를 활용한 서버 상태 관리

#### 2. **Features** (`src/client/features`)
- 특정 사용자 시나리오를 처리하는 기능 모듈
- 검색 히스토리 관리 기능 구현
- LocalStorage를 통한 데이터 영속화

#### 3. **Widgets** (`src/client/widgets`)
- 여러 entities와 features를 조합한 독립적인 UI 블록
- 재사용 가능한 복합 컴포넌트 (헤더, 검색 위젯)

#### 4. **Server Domain** (`src/server/domain`)
- Clean Architecture의 Domain Layer 구현
- Repository Pattern과 UseCase Pattern 적용
- TypeDI를 활용한 의존성 주입

## 🛠 기술 스택 및 선택 이유

### 핵심 프레임워크

**Next.js 16 + React 19**
- Server Actions로 API 라우트 없이 서버 로직 호출
- App Router를 통한 직관적인 파일 시스템 기반 라우팅
- SSR/SSG 지원으로 SEO 최적화

### 상태 관리

**TanStack Query (React Query) v5**
- 서버 상태 관리 및 자동 캐싱
- `useInfiniteQuery`를 활용한 무한 스크롤 구현
- Optimistic Update로 즉각적인 UI 피드백

### 프론트엔드 아키텍처

**Feature-Sliced Design (FSD)**
- 계층별 명확한 책임 분리 (app → pages → widgets → features → entities → shared)
- 기능 단위 모듈화로 확장성과 유지보수성 극대화
- 각 레이어 간 단방향 의존성으로 코드 충돌 최소화
- 대규모 팀 협업에 최적화된 구조

### UI/UX 라이브러리

**shadcn/ui**
- Radix UI + Tailwind CSS 기반의 컴포넌트 시스템
- 복사-붙여넣기 방식으로 완전한 코드 소유권
- 접근성(A11y) 보장 및 자유로운 커스터마이징

**react-intersection-observer**
- Intersection Observer API를 활용한 무한 스크롤 구현
- 스크롤 이벤트 리스너 대비 높은 성능 (메인 스레드 부하 감소)
- 선언적 API로 간편한 사용성

**Tailwind CSS v4**
- 유틸리티 우선 접근으로 빠른 개발
- 일관된 디자인 시스템 구축

### 개발 도구

**TypeScript**
- 타입 안정성으로 런타임 에러 사전 방지
- IDE 자동완성으로 개발 생산성 향상

**Vitest**
- Vite 기반의 빠른 테스트 러너
- Jest 호환 API 및 ESM 네이티브 지원

**Cypress + Cucumber**
- BDD 방식의 E2E 테스트
- Gherkin 문법으로 가독성 높은 테스트 시나리오
- 실제 사용자 관점의 통합 테스트

## ⭐ 강조하고 싶은 기능

### 1. **Feature-Sliced Design 아키텍처**

프론트엔드 확장성을 고려한 계층형 구조로, 각 레이어가 명확한 책임을 가집니다.

```
app → pages → widgets → features → entities → shared
```

**핵심 장점:**
- 새로운 기능 추가 시 기존 코드 영향 최소화
- 단방향 의존성으로 예측 가능한 코드 흐름
- 팀 협업 시 모듈별 독립적인 개발 가능

### 2. **React Query 기반 서버 상태 관리**

`useInfiniteQuery`를 활용한 무한 스크롤과 Optimistic Update로 즉각적인 사용자 경험을 제공합니다.

**구현 특징:**
- 자동 캐싱으로 불필요한 API 재호출 방지
- 백그라운드 자동 리페칭으로 데이터 최신성 유지
- 낙관적 업데이트로 체감 성능 개선

### 3. **성능 최적화**

Intersection Observer API를 활용하여 스크롤 이벤트 리스너 없이 효율적인 무한 스크롤을 구현했습니다.

**성능 개선:**
- 메인 스레드 부하 감소
- 불필요한 리렌더링 최소화
- React Query 캐싱 전략과 결합하여 최적의 사용자 경험

### 4. **TypeScript 타입 안정성**

클라이언트-서버 간 공유 타입 정의와 엄격한 타입 체크로 런타임 에러를 사전에 방지합니다.

**이점:**
- 컴파일 타임에 타입 에러 발견
- IDE 자동완성으로 개발 생산성 향상
- 리팩토링 시 안전성 보장

### 5. **BDD 기반 E2E 테스트**

Cypress와 Cucumber를 활용한 행동 주도 개발(BDD) 방식의 E2E 테스트를 구현했습니다.

**테스트 범위:**
- 도서 검색 및 무한 스크롤
- 상세 검색 및 검색 히스토리
- 찜하기 기능 및 네비게이션
- Gherkin 문법으로 작성된 읽기 쉬운 시나리오
- 6개 feature 파일, 40+ 시나리오

## 📝 라이센스

이 프로젝트는 개인 포트폴리오 목적으로 제작되었습니다.
