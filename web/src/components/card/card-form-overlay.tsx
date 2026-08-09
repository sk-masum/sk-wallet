import { useFormStatus } from "react-dom";

export function CardFormPendingOverlay() {
    const { pending } = useFormStatus();

    if (!pending) return null;

    return (
        <div className='absolute inset-0 z-20 flex items-center justify-center rounded-lg bg-background/70 backdrop-blur-[1px]'>
            <div className='flex flex-col items-center gap-3'>
                <div className='relative h-24 w-40'>
                    <div className='absolute left-2 top-3 h-20 w-32 rounded-xl border border-border/50 bg-muted/50' />
                    <div className='absolute left-4 top-1 h-20 w-32 rounded-xl border border-cyan-300/70 bg-linear-to-br from-cyan-600 via-blue-700 to-indigo-800 shadow-lg animate-bounce' />
                    <div className='absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground'>
                        <span className='absolute inline-flex h-full w-full rounded-full bg-primary opacity-40 animate-ping' />
                        <span className='relative text-sm font-bold'>+</span>
                    </div>
                </div>
                <p className='text-sm font-medium text-foreground'>Saving card...</p>
            </div>
        </div>
    );
}