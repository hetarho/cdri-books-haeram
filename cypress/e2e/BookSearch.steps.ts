import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// 검색 입력  
When('검색 인풋에 {string}를 입력합니다', (searchTerm: string) => {
  cy.get('input[placeholder*="검색"]').clear().type(searchTerm);
  cy.wait(200); // 입력 안정화 대기
});

When('엔터 키를 누릅니다', () => {
  cy.get('input[placeholder*="검색"]').type('{enter}');
  cy.wait(1000); // API 응답 대기
});

// 검색 완료
Given('검색어 {string}로 검색을 완료합니다', (searchTerm: string) => {
  cy.get('input[placeholder*="검색"]').clear().type(searchTerm);
  cy.get('input[placeholder*="검색"]').type('{enter}');
  cy.wait(2000); // API 응답 대기
  cy.get('[data-testid="book-card"]').should('exist');
});

Given('검색 결과가 10개 이상 존재합니다', () => {
  cy.get('[data-testid="book-card"]').should('have.length.greaterThan', 0);
});

// 스크롤
When('페이지를 스크롤하여 끝까지 내립니다', () => {
  cy.get('[data-testid="book-card"]').last().scrollIntoView();
  cy.wait(1000); // API 응답 대기
});

// 검증
Then('검색 결과는 최대 10개가 표시되어야 합니다', () => {
  cy.get('[data-testid="book-card"]').should('have.length.lte', 10);
});

Then('다음 페이지의 검색 결과가 추가로 표시되어야 합니다', () => {
  cy.get('[data-testid="book-card"]').should('have.length.greaterThan', 10);
});

Then('검색 결과가 10개 이상이어야 합니다', () => {
  cy.get('[data-testid="book-card"]').should('have.length.gte', 10);
});

Then('검색 결과 총 개수가 표시되어야 합니다', () => {
  cy.contains(/총.*건/).should('be.visible');
});

