# Cypress E2E 테스트

이 프로젝트는 Cypress와 Cucumber를 사용한 BDD(Behavior-Driven Development) 스타일의 E2E 테스트를 포함합니다.

## 테스트 구조

### Feature 파일 (`.feature`)

Gherkin 문법으로 작성된 시나리오 파일들이 `cypress/features/` 디렉토리에 위치합니다:

- **BookSearch.feature** - 기본 검색 및 무한 스크롤 테스트
- **AdvancedSearch.feature** - 상세 검색 팝오버 테스트
- **SearchHistory.feature** - 검색 히스토리 관리 테스트
- **BookLike.feature** - 찜하기 기능 테스트
- **BookDetail.feature** - 도서 상세보기 및 구매하기 테스트
- **Navigation.feature** - 페이지 네비게이션 테스트

### Step 정의 파일 (`.steps.ts`)

각 feature에 대응하는 step 정의 파일들이 `cypress/e2e/` 디렉토리에 위치합니다:

- **BookSearch.steps.ts**
- **AdvancedSearch.steps.ts**
- **SearchHistory.steps.ts**
- **BookLike.steps.ts**
- **BookDetail.steps.ts**
- **Navigation.steps.ts**

## 실행 방법

### 개발 서버 실행

먼저 개발 서버를 실행해야 합니다:

```bash
pnpm dev
```

### Cypress 테스트 실행

#### 1. Cypress GUI로 실행 (권장)

```bash
pnpm cypress open
```

그 후:
1. "E2E Testing" 선택
2. 브라우저 선택 (Chrome 권장)
3. 실행할 feature 파일 선택

#### 2. 헤드리스 모드로 실행

```bash
pnpm cypress run
```

#### 3. 특정 feature만 실행

```bash
pnpm cypress run --spec "cypress/features/BookSearch.feature"
```

#### 4. 특정 브라우저로 실행

```bash
pnpm cypress run --browser chrome
```

## 테스트 시나리오 개요

### 1. 도서 검색 (BookSearch)
- ✅ 검색 인풋에 검색어 입력 후 엔터
- ✅ 검색 결과 10개씩 표시
- ✅ 무한 스크롤로 다음 페이지 로드
- ✅ 검색 결과 없을 때 처리
- ✅ 검색 결과 카운트 표시

### 2. 상세 검색 (AdvancedSearch)
- ✅ 상세검색 팝오버 열기/닫기
- ✅ 제목으로 검색
- ✅ 저자로 검색
- ✅ 출판사로 검색
- ✅ 검색타입 선택 및 실행

### 3. 검색 히스토리 (SearchHistory)
- ✅ 검색 인풋 포커스시 히스토리 표시
- ✅ 히스토리 최대 8개 제한
- ✅ 히스토리 항목 클릭하여 재검색
- ✅ 히스토리 삭제
- ✅ 새로운 검색시 자동 추가

### 4. 찜하기 (BookLike)
- ✅ 찜하지 않은 책 찜하기
- ✅ 찜한 책 찜 해제
- ✅ 여러 책 찜하기
- ✅ 찜한 책 목록 확인
- ✅ 찜한 책 목록에서 찜 해제

### 5. 도서 상세보기 (BookDetail)
- ✅ 상세보기 버튼 표시
- ✅ 상세 정보 모달 표시
- ✅ 도서 카드 기본 정보 표시
- ✅ 구매하기 버튼 클릭

### 6. 네비게이션 (Navigation)
- ✅ 헤더 메뉴 표시
- ✅ 도서검색 페이지 이동
- ✅ 내가 찜한 책 페이지 이동
- ✅ 현재 페이지 활성화 표시

## 데이터 테스트 속성

테스트의 안정성을 위해 다음 `data-testid` 속성들을 사용합니다:

```tsx
// 도서 카드
data-testid="book-card"
data-testid="book-title"
data-testid="book-author"
data-testid="book-publisher"
data-testid="book-price"

// 검색 히스토리
data-testid="history-item"

// 도서 상세
data-testid="book-detail"
data-testid="book-description"
```

## 주요 특징

### BDD (Behavior-Driven Development)
- **Gherkin 문법**으로 비즈니스 요구사항을 명확히 표현
- 개발자와 비개발자 모두가 이해할 수 있는 테스트 시나리오
- `Given-When-Then` 패턴으로 테스트 의도 명확화

### 재사용 가능한 Steps
- 공통 step 정의를 여러 시나리오에서 재사용
- 파라미터화된 step으로 유연한 테스트 작성

### LocalStorage 테스트
- 찜하기 기능과 검색 히스토리는 LocalStorage 사용
- 테스트 전후 데이터 초기화 및 검증

## 트러블슈팅

### 테스트가 실패하는 경우

1. **개발 서버가 실행 중인지 확인**
   ```bash
   pnpm dev
   ```

2. **포트 확인**
   - `cypress.config.ts`의 `baseUrl`이 올바른지 확인
   - 기본값: `http://localhost:3000`

3. **캐시 삭제**
   ```bash
   pnpm cypress cache clear
   ```

4. **의존성 재설치**
   ```bash
   pnpm install
   ```

### API 응답 대기 시간 조정

테스트 속도나 네트워크 상황에 따라 대기 시간을 조정해야 할 수 있습니다:

```typescript
cy.wait(1000); // 1초 대기 (필요시 조정)
```

## 베스트 프랙티스

1. **data-testid 사용**: CSS 클래스나 텍스트 대신 `data-testid` 사용
2. **명확한 시나리오 작성**: 하나의 시나리오는 하나의 기능만 테스트
3. **Background 활용**: 공통 설정은 Background에 작성
4. **독립적인 테스트**: 각 시나리오는 독립적으로 실행 가능해야 함
5. **적절한 대기**: API 응답이나 애니메이션을 고려한 `cy.wait()` 사용

## 향후 개선 사항

- [ ] 시각적 회귀 테스트 (Percy 또는 Applitools)
- [ ] API 모킹을 통한 더 빠른 테스트 실행
- [ ] CI/CD 파이프라인 통합
- [ ] 테스트 커버리지 리포트
- [ ] 크로스 브라우저 테스트 확대

## 참고 자료

- [Cypress 공식 문서](https://docs.cypress.io/)
- [Cucumber 공식 문서](https://cucumber.io/docs/cucumber/)
- [@badeball/cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor)
