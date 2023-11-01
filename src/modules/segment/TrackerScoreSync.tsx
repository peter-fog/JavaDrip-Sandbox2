import { useCallback, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { useScores } from '@uniformdev/context-react';
import { getHighestScoredInterestEnrichment } from './utilities';

const TrackerScoreSync = () => {
  const scores = useScores();
  const [cookies] = useCookies();
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const orderCompletedListener = useCallback((ev: CustomEvent<{ cartItems: Record<string, any>[] }>) => {
    const { cartItems = [] } = ev.detail;

    const payload: Segment.OrderCompletedEvent = {
      products: cartItems.map(item => item?.product?.id)?.join(','),
      amount: cartItems.map(item => (item?.product?.price || 0) * item?.quantity).reduce((a, b) => a + b),
      categories: cartItems
        .map(item => item?.product?.categories)
        .filter(Boolean)
        .join(','),
    };
    global?.analytics?.track('Order Completed', payload);
    console.info(`The event 'Order complete' has been sent (amount: ${payload.amount})`);
  }, []);

  const addToCartListener = useCallback((ev: CustomEvent) => {
    const { product = {} } = ev.detail;
    const payload: Segment.SelectProductEvent = {
      product: product?.id,
      categories: product?.categories?.join(',') || '',
    };
    global?.analytics?.track('Add to cart', payload);
    console.info(`The event 'Add to cart' has been sent`);
  }, []);

  const addFavoriteProductListener = useCallback((ev: CustomEvent<Segment.SelectProductEvent>) => {
    global?.analytics?.track('Product Favorited', ev.detail);
    console.info(`The event 'Product Favorited' has been sent`);
  }, []);

  // Sending custom events
  useEffect(() => {
    window.addEventListener('Order Completed', orderCompletedListener as EventListener);
    window.addEventListener('Add to cart', addToCartListener as EventListener);
    window.addEventListener('Product Favorited', addFavoriteProductListener as EventListener);
    return () => {
      window.removeEventListener('Order Completed', orderCompletedListener as EventListener);
      window.removeEventListener('Add to cart', addToCartListener as EventListener);
      window.removeEventListener('Product Favorited', addFavoriteProductListener as EventListener);
    };
  }, [orderCompletedListener, addToCartListener, addFavoriteProductListener]);

  // Sending events based on visitor navigation
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      global?.analytics?.page({
        path: url,
        referrer: window.location.origin,
        url: window.location.origin + url,
        search: '',
      });
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  // Interest update on the Segment side based on the highest Enrichment
  useEffect(() => {
    const interest = getHighestScoredInterestEnrichment(scores || {});
    if (!interest) return;
    global?.analytics?.identify('', { interest });
  }, [scores, cookies]);

  return null;
};

export default TrackerScoreSync;
