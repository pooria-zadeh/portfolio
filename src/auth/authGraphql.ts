import { useRouter } from 'next/router';

import { useCallback, useRef } from 'react';

import { graphqlFetcher } from 'src/utils/http/swr';
import { setAuthHeader } from 'src/utils/http/swr.client';

import { mutate } from 'swr';

import { useSetUser } from 'src/auth/UserTokenProvider';
import { user_signIn, user_signInType, user_signUp, user_signUpType } from './gql';
import { fbGetToken, fbSignOut } from './firebase';
import { UserType } from 'src/@types/user.type';

import { getInitialLocale } from '@/i18n/getInitialLocale';
import { clearCookie } from '@/utils/storage';
import { ACCESS_TOKEN_KEY } from '@/utils/storage/constant';
import { useRouteLinks } from 'src/routes';

export function useAuthMutation() {
    const router = useRouter();
    const setUser = useSetUser();
    const { redirectUserOnSignup } = useRouteLinks();

    const onIdTokenFailed = useCallback(() => {
        setUser('NO_USER');
    }, [router]);

    const onIdToken = useCallback(
        (idToken: any, isLogin?: boolean): Promise<user_signInType['res'] | undefined> => {
            return new Promise(async (resolve, reject) => {
                try {
                    if (typeof idToken === 'string') {
                        setAuthHeader(idToken);

                        let res: user_signInType['res'] = await mutate(
                            user_signIn.key,
                            () => graphqlFetcher<user_signInType>(user_signIn.gql),
                            false
                        );
                        console.log('userSignInuser', res);
                        if (res.user_signIn.status === 'SUCCESS') {
                            setUserIfSuccess(res.user_signIn.result);
                        }

                        resolve(res);
                    }
                } catch (err) {
                    if (err?.user_signIn?.status === 'USER_NOT_FOUND') {
                        onSignupToken(idToken);
                    } else {
                        console.log(err?.user_signIn?.status);
                    }
                }
            });
        },
        []
    );

    const onSignupToken = useCallback(async (idToken) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (typeof idToken === 'string') {
                    setAuthHeader(idToken);

                    const res: user_signUpType['res'] = await mutate(
                        user_signUp.key,
                        () => graphqlFetcher<user_signUpType>(user_signUp.gql),
                        false
                    );

                    if (res.user_signUp.status === 'SUCCESS') {
                        setUserIfSuccess(res.user_signUp.result);
                        resolve(res);
                        redirectUserOnSignup();
                    }
                }
                reject('Failed');
            } catch (err) {
                reject(err);
            }
        });
    }, []);

    const setUserIfSuccess = useCallback((user: UserType) => {
        setUser(user);
    }, []);

    const refreshToken = useCallback(async () => {
        try {
            const idToken = await fbGetToken();

            if (typeof idToken === 'string') {
                onIdToken(idToken);
            } else {
                onIdTokenFailed();
            }
        } catch (err) {
            onIdTokenFailed();
            // authSnack("AUTHENTICATION_FAILED", onErrorMessage(err));
            console.error(err);
        } finally {
        }
    }, []);

    const signOut = useCallback(async () => {
        try {
            const lang = getInitialLocale();
            // setLoading(SIGNOUT_KEY);
            await fbSignOut();
            clearCookie(ACCESS_TOKEN_KEY);
            setUser && setUser('NO_USER');
            router.push(`/${lang}/auth/login/`, undefined, { shallow: true });
        } catch (err) {
            // authSnack('AUTHENTICATION_FAILED', onErrorMessage(err));
            console.error(err);
        } finally {
            // finishLoadingState(SIGNOUT_KEY);
        }
    }, []);

    return {
        onIdToken,
        onSignupToken,
        onIdTokenFailed,
        refreshToken,
        signOut
    };
}
