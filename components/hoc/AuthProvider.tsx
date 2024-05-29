import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchCurrentUser as getUser } from '@/services/apis';


const withAuth = (WrappedComponent: React.ComponentType) => {
  const ComponentWithAuth = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const user = getUser(); 
      console.log('user', user);

      if (!user) {
        router.replace('/login'); // Redirect to login page if user is not authenticated
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
