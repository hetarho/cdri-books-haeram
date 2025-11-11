import { useEffect, useEffectEvent } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '../utils';

export function InfinityContainer({
  children,
  className,
  onReachBottom,
}: {
  children: React.ReactNode;
  className?: string;
  onReachBottom?: () => void;
}) {
  const { ref, inView } = useInView();

  const onReachBottomCallback = useEffectEvent(() => {
    onReachBottom?.();
  });

  useEffect(() => {
    if (inView) {
      onReachBottomCallback();
    }
  }, [inView]);

  return (
    <div className={cn('flex flex-col', className)}>
      {children}
      <div ref={ref} className="h-[0.1px]" />
    </div>
  );
}
