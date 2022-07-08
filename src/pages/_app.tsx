import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import 'tailwindcss/tailwind.css';
import '../styles/navbar.css';

// --- Configs ---
import SEO from '@root/next-seo.config';
import { useEffect, useState } from 'react';
import { AppLayout } from '../components/layout';
import { sleepFn } from '../utils/async';

export default function App({ Component, pageProps, router }: AppProps) {
	const [loading, setLoading] = useState(true);
	//Binding events.
	router.events?.on('routeChangeStart', () => NProgress.start());
	router.events?.on('routeChangeComplete', () => NProgress.done());
	router.events?.on('routeChangeError', () => NProgress.done());

	// after ssr finish fetching data will show loading
	useEffect(() => {
		if (router?.isReady) {
			//delay for smooth loading
			sleepFn(500).then(() => {
				setLoading(false);
			});
		} else {
			setLoading(false);
		}
	}, [router?.isReady]);

	return (
		<div className="relative">
			{/* --------- AppLayout will be apply all related with layout and logic or init for entire app */}
			<DefaultSeo {...SEO} />
			<AppLayout ssrLoading={loading}>
				<Component {...pageProps} key={router?.route} />
			</AppLayout>
		</div>
	);
}
