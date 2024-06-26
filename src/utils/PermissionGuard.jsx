import { useAuth0 } from '@auth0/auth0-react';
import useSWR from 'swr';

export default function PermissionGuard({permission, children}) {
    const { getAccessTokenSilently } = useAuth0();

    const fetcher = async (url) => {
        const accessToken = await getAccessTokenSilently();
        return fetch(url, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${accessToken}`,
            }
        }).then((r) => r.json())
    };
    const { data, isLoading, error } = useSWR('/api/permissions', fetcher);

    if (isLoading) return <p>Chargement...</p>;
    if (error) return <p>Erreur</p>;

    if (data.includes(permission)) {
        return children;
    } else {
        return null;
    }
}