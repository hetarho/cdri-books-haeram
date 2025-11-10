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
  const {
    searchInput,
    setSearchInput,
    isOverlayOpen,
    history,
    onOverlayClose,
    onInputFocus,
    onInputBlur,
    onMouseEnter,
    onMouseLeave,
    onHistoryClick,
    onDeleteHistory,
    onQuickSearch,
    popoverOpen,
    popoverSearch,
    popoverSearchType,
    setPopoverSearch,
    setPopoverSearchType,
    handlePopoverOpenChange,
    handlePopoverSubmit,
  } = useBookSearch({ onSubmit });

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <SearchInput
        onSearch={onQuickSearch}
        value={searchInput}
        onChange={setSearchInput}
        isOverlayOpen={isOverlayOpen}
        history={history}
        onOverlayClose={onOverlayClose}
        onInputFocus={onInputFocus}
        onInputBlur={onInputBlur}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onHistoryClick={onHistoryClick}
        onDeleteHistory={onDeleteHistory}
      />
      <BookSearchPopover
        open={popoverOpen}
        search={popoverSearch}
        searchType={popoverSearchType}
        onOpenChange={handlePopoverOpenChange}
        onSearchChange={setPopoverSearch}
        onSearchTypeChange={setPopoverSearchType}
        onSubmit={handlePopoverSubmit}
      />
    </div>
  );
}


