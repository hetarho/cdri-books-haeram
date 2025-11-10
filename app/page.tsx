import { Button } from '@client/shared/ui/button';
import { Input } from '@client/shared/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@client/shared/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@client/shared/ui/select';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Button variant="primary" size="l">
        구매하기
      </Button>
      <Button variant="mono" size="l">
        구매하기
      </Button>

      <Input placeholder="검색어를 입력하세요"></Input>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outlineMono" size="s">
            상세검색
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
