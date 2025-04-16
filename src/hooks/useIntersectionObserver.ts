import { useState, useEffect, useRef, RefObject } from 'react';

interface IntersectionOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

function useIntersectionObserver<T extends Element>(
  options: IntersectionOptions = {}
): [RefObject<T>, boolean, IntersectionObserverEntry | null] {
  const { 
    threshold = 0, 
    root = null, 
    rootMargin = '0px', 
    freezeOnceVisible = false 
  } = options;
  
  const ref = useRef<T>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  
  const frozen = isIntersecting && freezeOnceVisible;

  useEffect(() => {
    const node = ref.current;
    
    // Early exit if the ref isn't populated or we've frozen the state
    if (!node || frozen) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry);
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold, root, rootMargin }
    );
    
    observer.observe(node);
    
    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, frozen]);
  
  return [ref as RefObject<T>, isIntersecting, entry];
}

export default useIntersectionObserver;