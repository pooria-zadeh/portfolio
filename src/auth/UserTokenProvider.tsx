import { useRedirectOnToken } from 'src/auth/useRedirectOnToken';
import { createContext, useContext, useEffect, useState } from 'react';
import { UserType } from 'src/@types/user.type';
import { observeMessages, getMessagesObserver } from 'src/graphql/message/messages.observer';

type MaybeUser = Partial<UserType> | 'NO_USER' | 'LOADING';

export const UserContext = createContext<MaybeUser>('LOADING');

export const SetUserContext = createContext({} as React.Dispatch<React.SetStateAction<MaybeUser>>);

function UserTokenProvider({ children }: any) {
    const [user, setUser] = useState<MaybeUser>('LOADING');
    return (
        <SetUserContext.Provider value={setUser}>
            <UserContext.Provider value={user}>
                <TokenHandler />
                {children}
            </UserContext.Provider>
        </SetUserContext.Provider>
    );
}

function TokenHandler() {
    useRedirectOnToken();
    return null;
}

export default UserTokenProvider;

export const useSetUser = () => {
    const setUser = useContext(SetUserContext);
    if (setUser === undefined) {
        throw new Error('use set user inside context');
    }
    return setUser;
};

var previousUser;

export const useGetUser = () => {
    const user = useContext(UserContext);

    // if (user === undefined) {
    //   throw new Error("");
    // }

    useEffect(() => {
        let stringUser = JSON.stringify(typeof user === 'string' ? { user } : user);

        if (previousUser === stringUser) return;

        previousUser = stringUser;

        let userId = JSON.parse(previousUser).id;

        observeMessages(userId);

        return () => {
            let observer = getMessagesObserver();

            if (observer) observer.disconnect();
        };
    }, [user]);

    return user as UserType;
};
export const useGetMaybeUser = () => {
    const user = useContext(UserContext);
    // if (user === undefined) {
    //   throw new Error("");
    // }
    return user;
};
