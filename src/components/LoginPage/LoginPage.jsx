// import React from "react";
// import LoginForm from "../LoginForm/LoginForm";
// import { useHistory } from "react-router-dom";
// import { Button } from "../ui/button";

// function LoginPage() {
//   const history = useHistory();

//   return (
//     <div>
//       <LoginForm />

//       <center>
//         <Button
//           type="button"
//           className="px-5 py-2 text-white hover:bg-blue-500 bg-primary-100 shadow-lg mr-4"
//           onClick={() => {
//             history.push("/registration");
//           }}
//         >
//           Register
//         </Button>
//       </center>
//     </div>
//   );
// }

// export default LoginPage;
import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import { useHistory } from "react-router-dom";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const history = useHistory();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-14 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-4">Welcome!</h1>
        <LoginForm />
        <div className="mt-6">
          <Button
            type="button"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
            onClick={() => {
              history.push("/registration");
            }}
          >
            Register
          </Button>
        </div>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/registration" className="text-blue-500 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
