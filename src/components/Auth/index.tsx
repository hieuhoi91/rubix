import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}
const Auth = ({ children }: Props) => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') signOut();
  }, [status]);
  return <>{children}</>;
};

export default Auth;
