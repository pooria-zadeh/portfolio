import { useSetUser } from 'src/auth/UserTokenProvider';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { AuthWithPassword, AuthWithProvider } from 'src/auth/auth.type';

import { useNetState } from 'src/graphql/useNetState';

import {
    fbSignInGoogleToken,
    fbSignInFacebookToken,
    fbGetToken,
    fbSignInToken,
    fbPasswordReset,
    fbSignOut,
    fbSignUpToken
} from './firebase';
import { clearCookie } from 'src/utils/storage';
import { ACCESS_TOKEN_KEY } from 'src/utils/storage/constant';

import { useAuthMutation } from './authGraphql';
import { getInitialLocale } from '@/i18n/getInitialLocale';

export const authFormInitialValues = {
    email: '',
    password: ''
};

const SIGNUP_KEY = 'FB_SIGN_UP';
const SIGNIN_KEY = 'FB_SIGN_IN';
const SIGNOUT_KEY = 'FB_SIGN_OUT';
const REFERESH_KEY = 'FB_REFERESH_TOKEN';

export function useFirebaseAuth() {
    
    const setUser = useSetUser();
    const router = useRouter();

    const { mutateState: isLoading, setLoading, finishLoading: finishLoadingState } = useNetState();

    const [error, setError] = useState('');

    const onLoading = (key: string) => {
        setError('');
        setLoading(SIGNUP_KEY);
    };

    const signInGoogle: AuthWithProvider = async () => {
        try {
            setLoading(SIGNIN_KEY);
            const idToken = await fbSignInGoogleToken();
            if (typeof idToken === 'string') {
                // onLogin(idToken);
            }
        } catch (err) {
            // authSnack('AUTHENTICATION_FAILED', onErrorMessage(err));
            console.error(err);
        } finally {
            finishLoadingState(SIGNIN_KEY);
        }
    };

    const signInFacebook: AuthWithProvider = async () => {
        try {
            setLoading(SIGNIN_KEY);
            const idToken = await fbSignInFacebookToken();
            if (typeof idToken === 'string') {
                // onLogin(idToken);
            }
        } catch (err) {
            // authSnack('AUTHENTICATION_FAILED', onErrorMessage(err));
            console.error(err);
        } finally {
            finishLoadingState(SIGNIN_KEY);
        }
    };

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
        signInGoogle,
        signInFacebook,

        signOut,
        // signUpLoading: isLoading[SIGNUP_KEY] || loadingIdToken,
        // signInLoading: isLoading[SIGNIN_KEY] || loadingIdToken,
        // refreshLoadin: isLoading[REFERESH_KEY] || loadingIdToken,
        // signoutLoadin: isLoading[SIGNOUT_KEY] || loadingIdToken
    };
}

export function useFirebaseResetPassword() {
    const { mutateState: isLoading, setLoading, finishLoading: finishLoadingState } = useNetState();
    const resetPassword = useCallback(async (email: string, onSuccess: () => void) => {
        try {
            setLoading('resetpassword');
            const res = await fbPasswordReset(email);

            onSuccess();
        } catch (err) {
        } finally {
            finishLoadingState('resetpassword');
        }
    }, []);

    return { resetPassword, loading: isLoading['resetpassword'] };
}
