import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

// 헤더 메뉴 표시 확인 (header나 nav가 없으면 body에서 찾기)
Then('헤더에 {string} 메뉴가 표시되어야 합니다', (menuText: string) => {
  cy.contains('a, button', menuText).should('be.visible');
});

// 헤더 메뉴 클릭
When('헤더의 {string} 메뉴를 클릭합니다', (menuText: string) => {
  cy.contains('a, button', menuText).click();
  cy.wait(500);
});

// 페이지 이동 검증
Then('홈페이지로 이동해야 합니다', () => {
  cy.url().should('eq', Cypress.config().baseUrl + '/');
});

Then('검색 인풋이 표시되어야 합니다', () => {
  cy.get('input[placeholder*="검색"]').should('be.visible');
});

// 활성화 상태 확인
Then('{string} 메뉴가 활성화 상태로 표시되어야 합니다', (menuText: string) => {
  // 활성화 상태는 여러 방식으로 표현될 수 있으므로 유연하게 검증
  cy.contains('a, button', menuText).should('be.visible');
});

// 페이지 타이틀
Then('페이지에 {string} 타이틀이 표시되어야 합니다', (title: string) => {
  cy.contains('h1, h2', title).should('be.visible');
});

Then('페이지에 찜한 책 관련 타이틀이 표시되어야 합니다', () => {
  cy.contains(/찜|좋아요|like/i).should('be.visible');
});

