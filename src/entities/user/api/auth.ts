import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

interface Response {
   token: string;
   displayName: string;
   photoURL: string;
}

export const Auth = createAsyncThunk<Response, void, { rejectValue: string }>(
   'user/auth',
   async (_, { rejectWithValue }) => {
      try {
         const auth = getAuth();
         const provider = new GoogleAuthProvider();
         provider.addScope('https://www.googleapis.com/auth/youtube.force-ssl');
         const result = await signInWithPopup(auth, provider).then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            const {
               user: { displayName, photoURL },
            } = result;

            return { token, displayName, photoURL };
         });

         localStorage.setItem('access-token', result.token!);
         localStorage.setItem(
            'user',
            JSON.stringify({ name: result.displayName, imgURL: result.photoURL }),
         );

         return result as Response;
      } catch (error) {
         return rejectWithValue('Ошибка при попытке залогиниться');
      }
   },
);
