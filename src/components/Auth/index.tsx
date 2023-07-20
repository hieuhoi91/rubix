import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}
const Auth = ({ children }: Props) => {
  const { data: session } = useSession();
  console.log(session);

  useEffect(() => {
    if (!session) signOut();
  }, [session]);
  return <>{children}</>;
};

export default Auth;
