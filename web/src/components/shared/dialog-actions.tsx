'use client';

import { HeartIcon, Trash2, Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { responsiveIconSizes } from '../ui/icon-sizes';

type DialogActionsProps = {
    isProcessing?: boolean;
    isSelectedFavorite?: boolean;
    handleToggleFavorite: () => void;
    handleEdit: () => void;
    handleDelete: () => void;
};

export function DialogActions({
    isProcessing = false,
    isSelectedFavorite = false,
    handleToggleFavorite,
    handleEdit,
    handleDelete,
}: DialogActionsProps) {
    return (
        <>
            <Button
                type="button"
                variant="action"
                size="action"
                onClick={handleToggleFavorite}
            >
                <HeartIcon
                    className={cn(
                        responsiveIconSizes.action,
                        'text-muted-foreground',
                        isSelectedFavorite ? 'fill-rose-500 text-rose-500' : '',
                    )}
                />
            </Button>

            <Button type="button" variant="action" size="action" onClick={handleEdit}>
                <Pencil
                    className={cn(responsiveIconSizes.action, 'text-muted-foreground')}
                />
            </Button>

            <Button
                type="button"
                variant="action"
                size="action"
                className="justify-start flex-col items-center gap-1"
                onClick={handleDelete}
                disabled={isProcessing}
            >
                <Trash2
                    className={cn(responsiveIconSizes.action, 'text-muted-foreground')}
                />
            </Button>
        </>
    );
}
