import { useCallback, useState } from 'react';
import { BookSearchType } from '@shared/types/book';
import { useBookHistory } from '@client/entities';
import { useDeleteBookHistory } from '@client/entities';

export type UseBookSearchParams = {
  onSubmit: (params: { search: string; searchType: BookSearchType }) => void;
};

export function useBookSearch({ onSubmit }: UseBookSearchParams) {
  const [searchInput, setSearchInput] = useState('');
  const [searchType, setSearchType] = useState<BookSearchType>(BookSearchType.TITLE);

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverSearch, setPopoverSearch] = useState('');
  const [popoverSearchType, setPopoverSearchType] = useState<BookSearchType>(searchType);

  const handlePopoverOpenChange = useCallback((next: boolean) => {
    setPopoverOpen(next);
    if (!next) {
      setPopoverSearch('');
    }
  }, []);

  const resetPopoverInput = useCallback(() => setPopoverSearch(''), []);

  const { getBookHistory } = useBookHistory();
  const { deleteBookHistory } = useDeleteBookHistory();
  const [history, setHistory] = useState<string[]>([]);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const refreshHistory = useCallback(() => {
    setHistory(getBookHistory());
  }, [getBookHistory]);

  const openOverlay = useCallback(() => {
    refreshHistory();
    setIsOverlayOpen(true);
  }, [refreshHistory]);

  const closeOverlay = useCallback(() => setIsOverlayOpen(false), []);

  const handleInputFocus = useCallback(() => {
    openOverlay();
  }, [openOverlay]);

  const handleDeleteHistory = useCallback(
    (item: string) => {
      deleteBookHistory(item);
      refreshHistory();
    },
    [deleteBookHistory, refreshHistory],
  );

  const handleQuickSearch = useCallback(
    (value: string) => {
      setSearchType(BookSearchType.TITLE);
      setSearchInput(value);
      onSubmit({ search: value, searchType: BookSearchType.TITLE });
      closeOverlay();
    },
    [onSubmit, closeOverlay],
  );

  const handleHistoryClick = useCallback(
    (item: string) => {
      setSearchInput(item);
      onSubmit({ search: item, searchType: BookSearchType.TITLE });
      closeOverlay();
    },
    [onSubmit, closeOverlay],
  );

  const handlePopoverSubmit = useCallback(() => {
    onSubmit({ search: popoverSearch, searchType: popoverSearchType });
    resetPopoverInput();
    handlePopoverOpenChange(false);
  }, [onSubmit, popoverSearch, popoverSearchType, resetPopoverInput, handlePopoverOpenChange]);

  return {
    // SearchInput props
    searchInput,
    setSearchInput,
    isOverlayOpen,
    history,
    onOverlayClose: closeOverlay,
    onInputFocus: handleInputFocus,
    onHistoryClick: handleHistoryClick,
    onDeleteHistory: handleDeleteHistory,
    onQuickSearch: handleQuickSearch,

    // Popover props
    popoverOpen,
    popoverSearch,
    popoverSearchType,
    setPopoverSearch,
    setPopoverSearchType: (nextType: BookSearchType) => {
      setPopoverSearchType(nextType);
      setSearchType(nextType);
    },
    handlePopoverOpenChange: (open: boolean) => {
      handlePopoverOpenChange(open);
      if (open) {
        setSearchInput('');
      }
    },
    handlePopoverSubmit,
  };
}
