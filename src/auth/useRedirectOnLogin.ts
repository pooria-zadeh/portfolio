import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { getInitialLocale } from '@/i18n/getInitialLocale';

export function useRedirectOnLogin() {
    const router = useRouter();

    const lang = getInitialLocale();

    const redirectUserOnSignup = useCallback(() => {
        router.push(`/${lang}/onboarding/profile-setup/`, undefined, { shallow: true });
    }, [lang]);

    const redirectUserOnRole = useCallback(
        (isFirstTime?: boolean) => {
            // if (is404Page(router)) return;

            const redirectUrl = router.asPath;

            if (isFirstTime) {
                // router.push(`${initLang}/${ONBOARDING_ROUTE}/`, undefined, {
                //     shallow: true
                // });
            } else if (redirectUrl?.includes('manager') || redirectUrl?.includes('onboarding'))
                router.push(redirectUrl, undefined, { shallow: true });
            else {
                // router.push(`${initLang}/${INITIAL_MANAGER_ROUTE}`, undefined, {
                //     shallow: true
                // });
            }
        },
        [router]
    );

    return { redirectUserOnRole, redirectUserOnSignup };
}
