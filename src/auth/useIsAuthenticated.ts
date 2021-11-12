import { useGetUser } from './UserTokenProvider';

export function useIsAuthenticated() {
    const user = useGetUser();
    
}
