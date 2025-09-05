'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface DateWithCurrentInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export function DateWithCurrentInput({ value, onChange, placeholder }: DateWithCurrentInputProps) {
  const handleCurrentClick = () => {
    onChange('現在');
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <div className="flex">
        <Input
          type={value === '現在' ? 'text' : 'month'}
          value={value}
          onChange={handleDateChange}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleCurrentClick}
          className="ml-2 px-3"
        >
          現在
        </Button>
      </div>
    </div>
  );
}