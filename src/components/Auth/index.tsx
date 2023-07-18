import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}
const Auth = ({ children }: Props) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;
  }, [session]);
  return <>{children}</>;
};

export default Auth;
