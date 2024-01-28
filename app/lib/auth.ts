import { anonymousSignIn as anonymousSignInApi } from '../lib/api';

export const anonymousSignIn = async () => {
    try {
        let userId = window.localStorage.getItem("userId");
        if (userId) {
            return userId;
        }
        const res = await anonymousSignInApi();
        userId = res.data.userId;
        window.localStorage.setItem("userId", userId!);
    } catch (e) {
        console.error(e);
    }
}