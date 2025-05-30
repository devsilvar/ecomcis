import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../AuthContext/AuthContext";

const PrivateRoute = ({ children, ...rest }) => {
  let { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/register");
    }
  }, [user, navigate]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PrivateRoute;
