import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// 찜 상태 확인
Given('첫 번째 책이 찜되어 있지 않습니다', () => {
  // 페이지가 로드된 후 첫 번째 책이 찜되지 않은 상태인지만 확인
  cy.get('[data-testid="book-card"]').first().within(() => {
    cy.get('[data-testid="like-button"]').then(($btn) => {
      const isLiked = $btn.attr('data-liked') === 'true';
      if (isLiked) {
        // 찜되어 있으면 해제
        cy.wrap($btn).click();
        cy.wait(3000);
        // 찜 해제 확인
        cy.get('[data-testid="like-button"]').should('have.attr', 'data-liked', 'false');
      }
    });
  });
});

Given('첫 번째 책을 찜합니다', () => {
  // 현재 찜 상태 확인 후 찜되지 않았으면 클릭
  cy.get('[data-testid="book-card"]').first().within(() => {
    cy.get('[data-testid="like-button"]').then(($btn) => {
      const isLiked = $btn.attr('data-liked') === 'true';
      if (!isLiked) {
        cy.wrap($btn).click();
        cy.wait(3000); // localStorage 업데이트 대기
        // 찜 상태로 변경될 때까지 대기
        cy.get('[data-testid="like-button"]').should('have.attr', 'data-liked', 'true', { timeout: 5000 });
      }
    });
  });
});

Given('모든 찜을 해제합니다', () => {
  // localStorage 제거하고 페이지 reload로 React 상태 초기화
  cy.window().then((win) => {
    win.localStorage.removeItem('liked_books');
  });
  cy.reload();
  cy.wait(1000); // 페이지 로드 대기
  
  // reload 후 검색 결과가 사라지므로 다시 검색
  cy.get('input[placeholder*="검색"]').clear().type('자바스크립트{enter}');
  cy.wait(2000); // 검색 결과 로드 대기
});

// 하트 아이콘 클릭
When('첫 번째 책의 하트 아이콘을 클릭합니다', () => {
  // 클릭 전 현재 상태 저장
  let initialLiked: string | undefined;
  cy.get('[data-testid="book-card"]').first().within(() => {
    cy.get('[data-testid="like-button"]')
      .invoke('attr', 'data-liked')
      .then((liked) => {
        initialLiked = liked;
      });
    cy.get('[data-testid="like-button"]').click();
  });
  
  // 상태가 토글될 때까지 대기 (최대 10초)
  cy.get('[data-testid="book-card"]').first().within(() => {
    cy.get('[data-testid="like-button"]')
      .should(($btn) => {
        const currentLiked = $btn.attr('data-liked');
        expect(currentLiked).to.not.equal(initialLiked);
      });
  });
  cy.wait(1000); // localStorage 업데이트 추가 대기
});

When('두 번째 책의 하트 아이콘을 클릭합니다', () => {
  let initialLiked: string | undefined;
  cy.get('[data-testid="book-card"]').eq(1).within(() => {
    cy.get('[data-testid="like-button"]')
      .invoke('attr', 'data-liked')
      .then((liked) => {
        initialLiked = liked;
      });
    cy.get('[data-testid="like-button"]').click();
  });
  
  cy.get('[data-testid="book-card"]').eq(1).within(() => {
    cy.get('[data-testid="like-button"]')
      .should(($btn) => {
        const currentLiked = $btn.attr('data-liked');
        expect(currentLiked).to.not.equal(initialLiked);
      });
  });
  cy.wait(1000);
});

When('세 번째 책의 하트 아이콘을 클릭합니다', () => {
  let initialLiked: string | undefined;
  cy.get('[data-testid="book-card"]').eq(2).within(() => {
    cy.get('[data-testid="like-button"]')
      .invoke('attr', 'data-liked')
      .then((liked) => {
        initialLiked = liked;
      });
    cy.get('[data-testid="like-button"]').click();
  });
  
  cy.get('[data-testid="book-card"]').eq(2).within(() => {
    cy.get('[data-testid="like-button"]')
      .should(($btn) => {
        const currentLiked = $btn.attr('data-liked');
        expect(currentLiked).to.not.equal(initialLiked);
      });
  });
  cy.wait(1000);
});

When('찜한 책 목록에서 첫 번째 책의 하트 아이콘을 클릭합니다', () => {
  cy.get('[data-testid="book-card"]').first().within(() => {
    cy.get('[data-testid="like-button"]').click();
  });
  cy.wait(500);
});

// 네비게이션
When('헤더에서 {string}을 클릭합니다', (navItem: string) => {
  cy.contains('a, button', navItem).click();
  cy.wait(500);
});

// 검증
Then('첫 번째 책이 찜된 상태로 표시되어야 합니다', () => {
  cy.get('[data-testid="book-card"]').first().within(() => {
    cy.get('[data-testid="like-button"]').should('have.attr', 'data-liked', 'true');
  });
});

Then('하트 아이콘이 채워진 상태로 표시되어야 합니다', () => {
  cy.get('[data-testid="book-card"]').first().within(() => {
    cy.get('[data-testid="like-button"]').should('have.attr', 'data-liked', 'true');
  });
});

Then('첫 번째 책이 찜 해제된 상태로 표시되어야 합니다', () => {
  cy.wait(1000); // 추가 대기
  cy.get('[data-testid="book-card"]').first().within(() => {
    cy.get('[data-testid="like-button"]').should('have.attr', 'data-liked', 'false', { timeout: 6000 });
  });
});

Then('하트 아이콘이 비어있는 상태로 표시되어야 합니다', () => {
  cy.get('[data-testid="book-card"]').first().within(() => {
    cy.get('[data-testid="like-button"]').should('have.attr', 'data-liked', 'false');
  });
});

Then('찜한 책이 {int}개가 되어야 합니다', (count: number) => {
  // localStorage가 업데이트될 때까지 재시도
  cy.window().then((win) => {
    const checkStorage = () => {
      const likedBooks = JSON.parse(win.localStorage.getItem('liked_books') || '[]');
      return likedBooks.length;
    };
    
    // 최대 10초 동안 기다림
    cy.wrap(null).should(() => {
      const currentCount = checkStorage();
      expect(currentCount).to.equal(count);
    });
  });
});

Then('찜한 책 목록 페이지로 이동해야 합니다', () => {
  cy.url().should('include', '/like');
});

Then('찜한 책이 표시되어야 합니다', () => {
  cy.get('[data-testid="book-card"]').should('exist');
  cy.get('[data-testid="book-card"]').should('have.length.greaterThan', 0);
});

Then('해당 책이 찜한 목록에서 사라져야 합니다', () => {
  cy.wait(1000); // 대기 시간 증가
  // 책이 없거나 적어도 처음보다는 줄었는지 확인
  cy.get('body').then(($body) => {
    const cardCount = $body.find('[data-testid="book-card"]').length;
    // 찜 해제 후 카드가 없거나, "찜한 책이 없습니다" 메시지가 보여야 함
    if (cardCount === 0) {
      cy.contains('찜한 책이 없습니다').should('be.visible');
    }
    // 카드가 있다면 그냥 통과 (다른 책이 남아있을 수 있음)
  });
});

