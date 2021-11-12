import { CCFullpageLottieLoader } from '@/components/base/netstate-ui/fullpageLoader';
import { useOnUserStateChanged } from 'src/auth/useRedirectOnToken';
import { useGetMaybeUser } from './UserTokenProvider';

function AuthenticationProvider({ children }: any) {
    const user = useGetMaybeUser();

    useOnUserStateChanged();

    return <>{typeof user === 'object' ? children : <CCFullpageLottieLoader />}</>;
}


export default AuthenticationProvider;
