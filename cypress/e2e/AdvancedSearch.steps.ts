import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// 상세검색 버튼 클릭 (중복 제거 - When만 사용)
When('상세검색 버튼을 클릭합니다', () => {
  cy.contains('button', '상세검색').click();
  cy.wait(300);
});

// 팝오버 검증
Then('상세검색 팝오버가 열려야 합니다', () => {
  cy.get('[role="dialog"]').should('be.visible');
});

Then('검색타입 선택 옵션이 표시되어야 합니다', () => {
  cy.get('select, [role="combobox"]').should('be.visible');
});

Then('검색어 입력 필드가 표시되어야 합니다', () => {
  cy.get('[role="dialog"]').find('input').should('be.visible');
});

Then('검색하기 버튼이 표시되어야 합니다', () => {
  cy.get('[role="dialog"]').contains('button', '검색하기').should('be.visible');
});

// 검색타입 선택
When('검색타입을 {string}으로 선택합니다', (searchType: string) => {
  // Select 또는 Combobox 찾기
  cy.get('[role="dialog"]').within(() => {
    cy.get('select, [role="combobox"]').first().click({ force: true });
  });
  cy.wait(300);
  // 옵션 선택 (pointer-events 문제 해결을 위해 force 사용)
  cy.contains(searchType).click({ force: true });
  cy.wait(300);
});

// 팝오버 내 검색어 입력  
When('팝오버 검색어 입력 필드에 {string}를 입력합니다', (searchTerm: string) => {
  cy.get('[role="dialog"]').find('input').clear().type(searchTerm);
  cy.wait(200); // 입력 안정화 대기
});

// 팝오버 검색하기 버튼
When('팝오버 검색하기 버튼을 클릭합니다', () => {
  cy.get('[role="dialog"]').contains('button', '검색하기').click();
  cy.wait(1000);
});

// 팝오버 닫힘 검증
Then('상세검색 팝오버가 닫혀야 합니다', () => {
  cy.get('[role="dialog"]').should('not.exist');
});

// 팝오버 외부 클릭
When('팝오버 외부를 클릭합니다', () => {
  cy.get('body').click(0, 0);
  cy.wait(300);
});

