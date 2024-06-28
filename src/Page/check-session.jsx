import { useEffect, useState } from "react";
import axios from "axios";

function CheckSession() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get("/check-session");
        setSession(response.data);
      } catch (error) {
        console.error("Error checking session:", error);
      }
    };

    checkSession();
  }, []);

  if (session === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {session.loggedIn ? (
        <div>
          <h1>Welcome, {session.user.email}</h1>
        </div>
      ) : (
        <h1>You are not logged in.</h1>
      )}
    </div>
  );
}

export default CheckSession;
