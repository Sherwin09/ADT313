import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./Main.css";

function MainClient() {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
  };

  useEffect(() => {
    if (
      accessToken === undefined ||
      accessToken === "" ||
      accessToken === null
    ) {
      handleLogout();
    }
  }, []);
  return (
    <div className="Main">
      <div className="container">
        <div className="navigation">
          <ul>
              <a className="site-title" >
                Dream
              </a>
            <li>
              <a onClick={() => navigate("/")}>Movies</a>
            </li>
            {accessToken ? (
              <li className="logout">
                <a onClick={handleLogout}>Logout</a>
              </li>
            ) : (
              <li className="login">
                <a onClick={() => navigate("/login")}>Login</a>
              </li>
            )}
          </ul>
        </div>
        <div className="outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainClient;
