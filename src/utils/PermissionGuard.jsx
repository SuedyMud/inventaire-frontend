import {useAuth0} from "@auth0/auth0-react";
import useSWR from 'swr';
import { Spinner } from 'react-bootstrap';
import React from 'react';
import axios from 'axios';

function PermissionGuard({permission, children}){
    const {getAccessTokenSilently} = useAuth0;

    const fetcher = async (url)=>{
        const accessToken = await getAccessTokenSilently();
        const response = await axios.get(url,{
            headers:{
                Accept: 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
        });

        return response.data;
    };

    const {data, error } = useSWR('/api/permissions', fetcher);

    if(!data && !error ) return <Spinner animation="Border"/>;

    if(error) return <p></p>;

    if (data.includes(permission)){
        return children;
    }else{
        return null;
    }

}
export default PermissionGuard;