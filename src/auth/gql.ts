import { CommonResponse } from 'src/@types/graphql.type';
import { UserType } from 'src/@types/user.type';

export const SIGN_IN_USER_KEY = 'user_signIn';
export const user_signIn = {
    key: SIGN_IN_USER_KEY,
    gql: /* GraphQL */ `
        query {
            ${SIGN_IN_USER_KEY} {
                status
                result{
                    email
                    fullName
                    username
                    id
                    bio
                }
            }
        }
    `
};

export type user_signInType = {
    args: {};
    res: CommonResponse<typeof SIGN_IN_USER_KEY, UserType>;
};

export const SIGN_UP_USER_KEY = 'user_signUp';
export const user_signUp = {
    key: SIGN_UP_USER_KEY,
    gql: /* GraphQL */ `
        mutation {
            ${SIGN_UP_USER_KEY} {
                status
                result{
                    email
                    fullName
                    username
                    id
                }
            }
        }
    `
};

export type user_signUpType = {
    args: {};
    res: CommonResponse<typeof SIGN_UP_USER_KEY, UserType>;
};

