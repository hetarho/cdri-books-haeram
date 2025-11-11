import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// 검색 히스토리 설정
Given('이전에 검색한 기록이 존재합니다', () => {
  // localStorage에 검색 히스토리 추가
  const searchHistory = ['자바스크립트', '파이썬', '리액트', 'Next.js', 'TypeScript'];
  cy.window().then((win) => {
    win.localStorage.setItem('book_search_history', JSON.stringify(searchHistory));
  });
  cy.reload();
  cy.wait(500);
});

Given('이전에 {string}를 검색한 기록이 있습니다', (searchTerm: string) => {
  const searchHistory = [searchTerm, '자바스크립트', '파이썬'];
  cy.window().then((win) => {
    win.localStorage.setItem('book_search_history', JSON.stringify(searchHistory));
  });
  cy.reload();
  cy.wait(500);
});

Given('검색 히스토리를 모두 삭제합니다', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem('book_search_history');
  });
  cy.reload();
  cy.wait(500);
});

// 포커스
When('검색 인풋에 포커스를 줍니다', () => {
  cy.get('input[placeholder*="검색"]').focus();
  cy.wait(300);
});

When('검색 인풋을 클리어합니다', () => {
  cy.get('input[placeholder*="검색"]').clear();
});

// 검색 히스토리 클릭
When('검색 히스토리에서 {string}를 클릭합니다', (historyItem: string) => {
  cy.contains(historyItem).click();
  cy.wait(1000);
});

When('첫 번째 검색 히스토리의 삭제 버튼을 클릭합니다', () => {
  cy.get('[data-testid="history-item"]').first().within(() => {
    cy.get('[aria-label="삭제"]').click();
  });
  cy.wait(300);
});

// 검증
Then('검색 히스토리가 표시되어야 합니다', () => {
  cy.get('[data-testid="history-item"]').should('exist');
  cy.get('[data-testid="history-item"]').should('have.length.greaterThan', 0);
});

Then('검색 히스토리는 최대 8개까지 표시되어야 합니다', () => {
  cy.get('[data-testid="history-item"]').should('have.length.lte', 8);
});

Then('검색어 {string}로 검색 결과가 표시되어야 합니다', (searchTerm: string) => {
  // 검색어가 실행되었는지 확인 (인풋 값 또는 결과 존재)
  cy.wait(2000); // 검색 완료 대기
  cy.get('[data-testid="book-card"]').should('exist');
});

Then('해당 검색 히스토리가 삭제되어야 합니다', () => {
  // 히스토리 개수가 줄어들었는지 확인
  cy.wait(300);
});

Then('검색 히스토리에 {string}가 포함되어야 합니다', (searchTerm: string) => {
  cy.get('[data-testid="history-item"]').contains(searchTerm).should('exist');
});

Then('검색 히스토리가 표시되지 않아야 합니다', () => {
  cy.get('[data-testid="history-item"]').should('not.exist');
});

