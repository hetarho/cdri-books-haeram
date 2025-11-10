import { cn, Icon, Input, Typography } from '@client/shared';
import React from 'react';

export function SearchInput({
  onSearch,
  value,
  onChange,
  isOverlayOpen,
  history,
  onOverlayClose,
  onInputFocus,
  onInputBlur,
  onMouseEnter,
  onMouseLeave,
  onHistoryClick,
  onDeleteHistory,
}: {
  onSearch: (search: string) => void;
  value: string;
  onChange: (value: string) => void;
  isOverlayOpen: boolean;
  history: string[];
  onOverlayClose: () => void;
  onInputFocus: () => void;
  onInputBlur: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onHistoryClick: (item: string) => void;
  onDeleteHistory: (item: string) => void;
}) {
  const handleSubmit = () => {
    onSearch(value);
    onOverlayClose();
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative w-120" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Icon.Search className="absolute top-1/2 left-2.5 -translate-y-1/2 fill-[#353C49]" />
      <Input
        type="text"
        className={cn('pl-[51px]', {
          'rounded-t-3xl rounded-b-none': isOverlayOpen,
        })}
        placeholder="검색어를 입력해주세요."
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
      />
      {history.length > 0 && isOverlayOpen && (
        <div
          className="bg-light-gray absolute top-full left-0 flex w-full flex-col gap-4 rounded-b-3xl py-6 pr-6 pl-[51px]"
          onClick={(e) => {
            e.stopPropagation();
            onOverlayClose();
          }}
        >
          {history.map((item) => (
            <div key={item} className="flex justify-between">
              <Typography.Caption
                className="text-text-subtitle flex-1 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onHistoryClick(item);
                }}
              >
                {item}
              </Typography.Caption>
              <Icon.Close
                className="shrink-0 cursor-pointer fill-[#222222]"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteHistory(item);
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
