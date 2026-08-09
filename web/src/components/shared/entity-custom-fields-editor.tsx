'use client';

import { Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { entityFormControlClass } from '@/components/shared/entity-form-ui';

export type EntityCustomFieldItem = {
    id: string;
    key: string;
    value: string;
};

type EntityCustomFieldsEditorProps = {
    fields: EntityCustomFieldItem[];
    keyMaxLength?: number;
    valueMaxLength?: number;
    emptyStateText?: string;
    addButtonLabel?: string;
    createId: () => string;
    onChange: (next: EntityCustomFieldItem[]) => void;
    onTouched?: () => void;
};

export function EntityCustomFieldsEditor({
    fields,
    keyMaxLength = 60,
    valueMaxLength = 240,
    emptyStateText = 'No custom fields added yet.',
    addButtonLabel = 'Add custom field',
    createId,
    onChange,
    onTouched,
}: EntityCustomFieldsEditorProps) {
    const markTouched = () => {
        onTouched?.();
    };

    const updateField = (fieldId: string, fieldKey: 'key' | 'value', nextValue: string) => {
        const nextFields = fields.map((field) =>
            field.id === fieldId ? { ...field, [fieldKey]: nextValue } : field,
        );
        onChange(nextFields);
        markTouched();
    };

    const removeField = (fieldId: string) => {
        onChange(fields.filter((field) => field.id !== fieldId));
        markTouched();
    };

    const addField = () => {
        onChange([...fields, { id: createId(), key: '', value: '' }]);
        markTouched();
    };

    return (
        <div className='space-y-3'>
            {fields.length === 0 ? (
                <p className='text-xs text-text-subtle'>{emptyStateText}</p>
            ) : (
                fields.map((item, index) => (
                    <div key={item.id} className='grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_40px]'>
                        <Input
                            id={`custom-key-${item.id}`}
                            value={item.key}
                            onChange={(event) => updateField(item.id, 'key', event.target.value)}
                            placeholder={`Field name ${index + 1}`}
                            className={entityFormControlClass}
                            maxLength={keyMaxLength}
                        />
                        <Input
                            id={`custom-value-${item.id}`}
                            value={item.value}
                            onChange={(event) => updateField(item.id, 'value', event.target.value)}
                            placeholder={`Field value ${index + 1}`}
                            className={entityFormControlClass}
                            maxLength={valueMaxLength}
                        />
                        <Button
                            type='button'
                            variant='ghost'
                            size='icon'
                            className='h-10 w-10 rounded-xl text-text-subtle hover:text-destructive'
                            onClick={() => removeField(item.id)}
                            aria-label={`Remove custom field ${index + 1}`}
                        >
                            <Trash2 className='h-4 w-4' />
                        </Button>
                    </div>
                ))
            )}

            <Button type='button' variant='outline' className='h-10 rounded-xl' onClick={addField}>
                <Plus className='mr-2 h-4 w-4' />
                {addButtonLabel}
            </Button>
        </div>
    );
}
