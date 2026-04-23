import {useEffect,useState }from"react";
importapifrom"../api";

functionAuth({ onLogin, setCsrfToken }) {
const [formData,setFormData]=useState({
    username:"",
    password:"",
  });
const [message,setMessage]=useState("");

useEffect(() => {
constfetchToken=async () => {
try {
constres=awaitapi.get("/api/csrf-token");
setCsrfToken(res.data.csrfToken);
      }catch (error) {
setMessage("Failed to fetch CSRF token");
      }
    };

fetchToken();
  }, [setCsrfToken]);

consthandleChange= (e) => {
setFormData((prev) => ({
      ...prev,
      [e.target.name]:e.target.value,
    }));
  };

consthandleLogin=async (e) => {
e.preventDefault();

try {
consttokenRes=awaitapi.get("/api/csrf-token");
consttoken=tokenRes.data.csrfToken;
setCsrfToken(token);

constres=awaitapi.post("/api/login",formData, {
        headers: {
"x-csrf-token":token,
        },
      });

setMessage(res.data.message);
onLogin(res.data.user);
    }catch (error) {
setMessage(error.response?.data?.message||"Login failed");
    }
  };

return (
<divclassName="card">
<h2>Login</h2>
<formonSubmit={handleLogin}className="form">
<input
type="text"
name="username"
placeholder="Username"
value={formData.username}
onChange={handleChange}
/>
<input
type="password"
name="password"
placeholder="Password"
value={formData.password}
onChange={handleChange}
/>
<buttontype="submit">Login</button>
</form>
      {message&&<p>{message}</p>}
<pclassName="hint">Use username: admin | password: 1234</p>
</div>
  );
}

exportdefaultAuth;