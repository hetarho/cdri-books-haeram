import {
  Button,
  cn,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@client/shared';
import { BookSearchType } from '@shared/types/book';

export function BookSearchPopover({
  open,
  search,
  searchType,
  onOpenChange,
  onSearchChange,
  onSearchTypeChange,
  onSubmit,
}: {
  open: boolean;
  search: string;
  searchType: BookSearchType;
  onOpenChange: (open: boolean) => void;
  onSearchChange: (value: string) => void;
  onSearchTypeChange: (searchType: BookSearchType) => void;
  onSubmit: () => void;
}) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button variant={'outlineMono'} size={'s'}>
          상세검색
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={16}
        className="w-90 border-none bg-white px-9 py-6 shadow-[0px_4px_14px_6px_#97979726]"
      >
        <div className="flex gap-1">
          <Select value={searchType} onValueChange={(value) => onSearchTypeChange(value as BookSearchType)}>
            <SelectTrigger className="w-25 shrink-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.values(BookSearchType).map((type) => (
                <SelectItem key={type} value={type} className={cn(searchType === type && 'hidden')}>
                  {BOOK_SEARCH_TYPE_LABELS[type]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="검색어 입력"
            className="border-primary h-9 w-52 shrink-0 rounded-none border-b bg-transparent focus:outline-none"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Button variant={'primary'} className="mt-4 w-full" onClick={onSubmit}>
          검색하기
        </Button>
      </PopoverContent>
    </Popover>
  );
}

const BOOK_SEARCH_TYPE_LABELS = {
  [BookSearchType.TITLE]: '제목',
  [BookSearchType.PUBLISHER]: '출판사',
  [BookSearchType.PERSON]: '저자',
};
