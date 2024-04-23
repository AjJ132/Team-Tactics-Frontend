import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren;


export default function ProtectedRoute({children} : ProtectedRouteProps) {
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(auth.user === null){
            navigate('/signin', { replace: true });
        }
    }, [navigate, auth.user]);

    return children;
};