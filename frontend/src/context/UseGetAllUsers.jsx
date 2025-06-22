import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const useGetAllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch("/api/user/allusers", {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${Cookies.get("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) setAllUsers(data);
      })
      .catch((error) => {
        if (isMounted) setAllUsers([]);
        // Optionally log error
        console.error("Error fetching all users:", error);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return [allUsers, loading];
};

export default useGetAllUsers;