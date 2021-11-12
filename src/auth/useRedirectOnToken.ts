import { useGetMaybeUser } from './UserTokenProvider';
import { useAuthMutation } from 'src/auth/authGraphql';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { isTokenExpired } from 'src/utils/http/token';
import { getCookieStorage } from 'src/utils/storage';
import { ACCESS_TOKEN_KEY } from 'src/utils/storage/constant';
import { getInitialLocale } from '@/i18n/getInitialLocale';

export function useRedirectOnToken() {
    const { refreshToken } = useAuthMutation();
    const { onIdToken,onIdTokenFailed } = useAuthMutation();

    const router = useRouter();
    const isByPassUrls = useCallback(() => {
        //these urls are public no authorization should be included
    }, [router]);

    const isAuthUrls = useCallback(() => {
        return router.asPath.includes('/auth/');
    }, [router]);

    useEffect(() => {
        // if (isByPassUrls()) return;
        const idToken = getCookieStorage(ACCESS_TOKEN_KEY);
        const lang = getInitialLocale();

        if (idToken) {
            if (isTokenExpired(idToken)) {
                refreshToken();
            } else {
                onIdToken(idToken);
            }
        } else if (!isAuthUrls()) {
            onIdTokenFailed()
            // refreshToken();
            // router.push(`/${lang}/auth/login/`, undefined, { shallow: true });
        }
    }, []);
}

export function useOnUserStateChanged() {
    const user = useGetMaybeUser();
    const router = useRouter();

    useEffect(() => {
        const lang = getInitialLocale();

        if (user === 'NO_USER') {
            router.push(`/${lang}/auth/login/`, undefined, { shallow: true });
        }
    }, [user]);
}

export function useOnUserEnter() {
    const router = useRouter();

    useEffect(() => {
        const idToken = getCookieStorage(ACCESS_TOKEN_KEY);

        if (idToken) {
            if (!isTokenExpired(idToken)) {
                router.push(`/${getInitialLocale()}/home`, undefined, { shallow: true });
            } else {
                router.push(`/${getInitialLocale()}/auth/login/`, undefined, { shallow: true });
            }
        } else if (router.asPath === '/') {
            router.push(`/${getInitialLocale()}`, undefined, { shallow: true });
        }
    }, []);
}
