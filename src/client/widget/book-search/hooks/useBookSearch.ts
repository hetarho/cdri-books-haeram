import { useCallback, useState } from 'react';
import { BookSearchType } from '@shared/types/book';
import { useBookHistory, useDeleteBookHistory } from '@client/features';

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

  const { data: history = [] } = useBookHistory();
  const { mutate: deleteBookHistory } = useDeleteBookHistory();
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const openOverlay = useCallback(() => {
    setIsOverlayOpen(true);
  }, []);

  const closeOverlay = useCallback(() => setIsOverlayOpen(false), []);

  const handleInputFocus = useCallback(() => {
    openOverlay();
  }, [openOverlay]);

  const handleDeleteHistory = useCallback(
    (item: string) => {
      deleteBookHistory(item);
    },
    [deleteBookHistory],
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

  const handlePopoverSearchTypeChange = useCallback((nextType: BookSearchType) => {
    setPopoverSearchType(nextType);
    setSearchType(nextType);
  }, []);

  return {
    searchInput: {
      inputValue: searchInput,
      setInputValue: setSearchInput,
      isOverlayOpen,
      history,
      onOverlayClose: closeOverlay,
      onInputFocus: handleInputFocus,
      onHistoryClick: handleHistoryClick,
      onDeleteHistory: handleDeleteHistory,
      onQuickSearch: handleQuickSearch,
    },

    popover: {
      open: popoverOpen,
      search: popoverSearch,
      popoverSearchType,
      setSearch: setPopoverSearch,
      setPopoverSearchType: handlePopoverSearchTypeChange,
      handlePopoverOpenChange: handlePopoverOpenChange,
      handlePopoverSubmit,
    },
  };
}
