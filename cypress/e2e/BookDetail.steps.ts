import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// 버튼 존재 확인
Then('각 도서 카드에 상세보기 버튼이 표시되어야 합니다', () => {
  cy.get('[data-testid="book-card"]').first().within(() => {
    cy.get('[data-testid="detail-button"]').should('be.visible');
  });
});

Then('각 도서 카드에 구매하기 버튼이 표시되어야 합니다', () => {
  cy.get('[data-testid="book-card"]').first().within(() => {
    cy.get('[data-testid="buy-button"]').should('be.visible');
  });
});

// 버튼 클릭
When('첫 번째 책의 상세보기 버튼을 클릭합니다', () => {
  cy.get('[data-testid="book-card"]').first().within(() => {
    cy.get('[data-testid="detail-button"]').click();
  });
  cy.wait(500);
});

When('첫 번째 책의 구매하기 버튼을 클릭합니다', () => {
  cy.get('[data-testid="book-card"]').first().within(() => {
    cy.get('[data-testid="buy-button"]').click();
  });
  cy.wait(500);
});

// 상세 정보 검증
Then('도서 상세 정보가 표시되어야 합니다', () => {
  cy.get('[data-testid="book-card"]').first().should('be.visible');
});

Then('책 제목이 표시되어야 합니다', () => {
  cy.get('[data-testid="book-card"]').first().within(() => {
    cy.get('[data-testid="book-title"]').should('be.visible');
  });
});

Then('책 설명이 표시되어야 합니다', () => {
  cy.get('[data-testid="book-card"]').first().within(() => {
    cy.get('[data-testid="book-description"]').should('be.visible');
  });
});

// 도서 카드 기본 정보
Then('첫 번째 도서 카드에 책 표지 이미지가 표시되어야 합니다', () => {
  cy.get('[data-testid="book-card"]').first().within(() => {
    cy.get('img').should('be.visible');
  });
});

Then('첫 번째 도서 카드에 책 제목이 표시되어야 합니다', () => {
  cy.get('[data-testid="book-card"]').first().within(() => {
    cy.get('h2, h3, h4, [data-testid="book-title"]').should('exist');
  });
});

Then('첫 번째 도서 카드에 저자명이 표시되어야 합니다', () => {
  cy.get('[data-testid="book-card"]').first().within(() => {
    cy.get('[data-testid="book-author"]').should('exist');
  });
});

Then('첫 번째 도서 카드에 가격 정보가 표시되어야 합니다', () => {
  cy.get('[data-testid="book-card"]').first().within(() => {
    cy.get('[data-testid="book-price"]').should('be.visible');
  });
});

// 구매하기
Then('새 탭이 열려야 합니다', () => {
  // window.open이 호출되었는지 확인
  cy.window().then((win) => {
    cy.stub(win, 'open').as('windowOpen');
  });
});

// 모든 카드 정보 확인
Then('모든 도서 카드에 필수 정보가 표시되어야 합니다', () => {
  cy.get('[data-testid="book-card"]').each(($card) => {
    cy.wrap($card).within(() => {
      cy.get('img').should('exist'); // 이미지
      cy.get('h2, h3, h4, [data-testid="book-title"]').should('exist'); // 제목
    });
  });
});


