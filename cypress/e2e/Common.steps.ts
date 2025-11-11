import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';

// 공통 Background
Given('사용자가 홈페이지에 접속합니다', () => {
  cy.visit('/', { failOnStatusCode: false });
  cy.wait(1000); // 페이지 로드 대기
});

// 공통 메시지 표시 검증 (따옴표 포함)
Then('{string} 메시지가 표시되어야 합니다', (message: string) => {
  // overflow로 잘릴 수 있으므로 scrollIntoView 사용
  cy.contains(message).scrollIntoView().should('be.visible');
});

// 공통 검색 결과 표시
Then('검색 결과가 표시되어야 합니다', () => {
  cy.get('[data-testid="book-card"]').should('exist');
  cy.get('[data-testid="book-card"]').should('have.length.greaterThan', 0);
});

