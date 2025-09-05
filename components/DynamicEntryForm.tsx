'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField } from './FormField';
import { DateWithCurrentInput } from './DateWithCurrentInput';
import { Plus, Trash2 } from 'lucide-react';

import { DynamicEntryBase } from '@/types/profile';

interface DynamicEntryFormProps<T extends DynamicEntryBase> {
  title: string;
  entries: T[];
  onUpdate: (entries: T[]) => void;
  maxEntries: number;
  fields: {
    key: string;
    label: string;
    placeholder: string;
    type?: string;
  }[];
  createNew: () => T;
}

export function DynamicEntryForm<T extends DynamicEntryBase>({
  title,
  entries,
  onUpdate,
  maxEntries,
  fields,
  createNew,
}: DynamicEntryFormProps<T>) {
  const [currentEntry, setCurrentEntry] = useState<T>(createNew());

  const handleAddEntry = () => {
    if (entries.length >= maxEntries) return;
    
    const newEntries = [...entries, currentEntry];
    onUpdate(newEntries);
    setCurrentEntry(createNew());
  };

  const handleRemoveEntry = (id: string) => {
    const newEntries = entries.filter(entry => entry.id !== id);
    onUpdate(newEntries);
  };

  const updateCurrentEntry = (field: string, value: string) => {
    setCurrentEntry(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const isFormValid = fields.every(field => 
    field.key === 'id' || currentEntry[field.key]?.trim()
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <span className="text-sm text-gray-500">
          ({entries.length}/{maxEntries})
        </span>
      </div>

      {/* 既存のエントリー一覧 */}
      {entries.length > 0 && (
        <div className="space-y-3">
          {entries.map((entry, index) => (
            <div
              key={entry.id}
              className="p-4 border border-gray-200 rounded-lg bg-gray-50 flex items-center justify-between"
            >
              <div className="flex-1">
                <p className="font-medium text-gray-900">
                  {fields[0] && entry[fields[0].key]}
                </p>
                {fields.slice(1).map(field => (
                  entry[field.key] && (
                    <p key={field.key} className="text-sm text-gray-600">
                      {field.label}: {entry[field.key]}
                    </p>
                  )
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleRemoveEntry(entry.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* 新規追加フォーム */}
      {entries.length < maxEntries && (
        <div className="space-y-4 p-4 border-2 border-dashed border-gray-300 rounded-lg">
          <h4 className="text-md font-medium text-gray-700">
            {title === '資格・免許' ? '資格・免許を追加' : `${title}を追加`}
          </h4>
          
          <div className="grid gap-4">
            {fields.filter(field => field.key !== 'id').map(field => (
              <div key={field.key}>
                <FormField label={field.label}>
                  {field.key === 'endDate' && (title === '学歴' || title === '職歴') ? (
                    <DateWithCurrentInput
                      value={currentEntry[field.key] || ''}
                      onChange={(value) => updateCurrentEntry(field.key, value)}
                      placeholder={`${field.placeholder} または 現在`}
                    />
                  ) : (
                    <Input
                      type={field.type || 'text'}
                      value={currentEntry[field.key] || ''}
                      onChange={(e) => updateCurrentEntry(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full"
                    />
                  )}
                </FormField>
              </div>
            ))}
          </div>

          <Button
            type="button"
            onClick={handleAddEntry}
            disabled={!isFormValid}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            追加
          </Button>
        </div>
      )}
    </div>
  );
}