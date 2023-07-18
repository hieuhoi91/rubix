import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { CmsApi } from '@/api/cms-api';
import { ROUTES } from '@/constant';
import { ResLogin } from '@/shared/types/authType';

// const handleRefreshToken = async (token: JWT) => {
//   try {
//     const tokenData = await CmsApi.refreshToken({
//       refresh_token: token.refreshToken,
//     });

//     const {
//       access_token: accessToken,
//       refresh_token: refreshToken,
//       expiresIn: accessTokenExpires,
//     } = tokenData.data;

//     return {
//       ...token,
//       accessToken,
//       accessTokenExpires,
//       refreshToken: refreshToken ?? token.refreshToken, // Fall back to old refresh token
//     };
//   } catch (error) {
//     return {
//       ...token,
//       error: ERROR_TOKEN,
//     };
//   }
// };

export default NextAuth({
  providers: [
    CredentialsProvider({
      type: 'credentials',
      name: 'crcedentials',
      // init object credentials for authorize
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Mật khẩu',
          type: 'password',
        },
      },
      authorize: async (credentials) => {
        try {
          const data: ResLogin = await CmsApi.login({
            email: credentials!.email,
            password: credentials!.password,
            requestFrom: 'CMS',
          }).then((res) => {
            return res.data; // return the data from the server response (token, user) as a object (token, user) with the type ResLogin
          });

          if (data) {
            const { access_token: accessToken, refresh_token: refreshToken } =
              data.token; // We get the access token and the refresh token from the data object.

            // const accessTokenExpirationTime =
            //   (jwt_decode<JwtPayload>(accessToken).exp as number) * 1000 - 10;
            // minus 10 seconds before expiration time to prevent token expiration error in the browser side unit ms

            return {
              ...data.user,
              accessToken,
              // accessTokenExpires: accessTokenExpirationTime,
              refreshToken,
            };
            // return new object user contain token
          }
          return null; // if the data is null, return null
        } catch (e: any) {
          throw new Error(e.response.data.message); // if the server response is an error, throw an error with the message from the server
        }
      },
    }),
  ],

  callbacks: {
    // The jwt() callback is called when a new token is created.
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          user,
        };
      }
      return token;
    },
    // The session() callback is called when a user logs in or log out
    async session({ session, token }) {
      if (session) {
        return {
          ...session,
          token,
          expires: token.accessTokenExpires as string,
        };
      }

      console.log('session', session);

      return session;
    },
  },
  // The signIn page is the page that the user is redirected to when they are not logged in.
  pages: {
    signIn: ROUTES.LOGIN,
  },
  secret: 'next-auth-secret', // The secret is used to sign the tokens. It should be a long random string.
});
