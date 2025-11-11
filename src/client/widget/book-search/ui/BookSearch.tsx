'use client';

import { BookSearchType } from '@shared/types/book';
import { BookSearchPopover } from '@client/entities';
import { cn } from '@client/shared';
import { SearchInput } from './SearchInput';
import { useBookSearch } from '../hooks';

type BookSearchSubmitParams = {
  search: string;
  searchType: BookSearchType;
};

export function BookSearch({
  className,
  onSubmit,
}: {
  className?: string;
  onSubmit: (params: BookSearchSubmitParams) => void;
}) {
  const { popover, searchInput } = useBookSearch({ onSubmit });

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <SearchInput
        onSearch={searchInput.onQuickSearch}
        value={searchInput.inputValue}
        onChange={searchInput.setInputValue}
        isOverlayOpen={searchInput.isOverlayOpen}
        history={searchInput.history}
        onOverlayClose={searchInput.onOverlayClose}
        onInputFocus={searchInput.onInputFocus}
        onHistoryClick={searchInput.onHistoryClick}
        onDeleteHistory={searchInput.onDeleteHistory}
      />
      <BookSearchPopover
        open={popover.open}
        search={popover.search}
        searchType={popover.popoverSearchType}
        onOpenChange={popover.handlePopoverOpenChange}
        onSearchChange={popover.setSearch}
        onSearchTypeChange={popover.setPopoverSearchType}
        onSubmit={popover.handlePopoverSubmit}
      />
    </div>
  );
}
