type VaultListLoadingGridProps = {
    count?: number;
    renderItem: (index: number) => React.ReactNode;
};

export function VaultListLoadingGrid({ count = 6, renderItem }: VaultListLoadingGridProps) {
    return (
        <>
            <section className='grid gap-3 sm:grid-cols-2' aria-live='polite' aria-busy>
                {Array.from({ length: count }).map((_, index) => (
                    <div
                        key={index}
                        className='motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-500'
                        style={{ animationDelay: `${Math.min(index, 9) * 65}ms` }}
                    >
                        {renderItem(index)}
                    </div>
                ))}
            </section>

            <style>{`@keyframes shimmer{100%{transform:translateX(100%)}}`}</style>
        </>
    );
}
