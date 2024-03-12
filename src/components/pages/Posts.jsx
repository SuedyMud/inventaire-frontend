import {useQuery} from "@tanstack/react-query";
import {useAuth0} from "@auth0/auth0-react";


export function Posts(){
    const {
        status,
        error,
        data: posts,
    } = useQuery({
        queryKey:["posts"],
        queryFn:getPosts,
    })

    if(status === "loading") return <p>Loading...</p>
    if(status === "error") return <p>{JSON.stringify(error)}</p>

    return (
        <>
            <h1>Posts</h1>
            <PostsList posts={posts}/>
        </>
    )
}