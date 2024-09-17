import { Button } from './ui/button';

interface LoadMoreButtonProps {
    onLoadMore: () => void;
    loading: boolean;
}

export function LoadMoreButton({ onLoadMore, loading }: LoadMoreButtonProps) {
    return (
        <div className="m-4 text-3xl">
            <Button onClick={onLoadMore} disabled={loading} className='bg-yellow-300 animation-blink hover:bg-green-400'>
                {loading ? 'Loading...' : 'Load more!'}
            </Button>
        </div>
    );
}
