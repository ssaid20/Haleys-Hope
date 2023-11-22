// import React from 'react';

// import { useHistory } from 'react-router-dom';
// import RegisterForm from '../RegisterForm/RegisterForm';

// function RegisterPage() {
//   const history = useHistory();

//   return (
//     <div>
//       <RegisterForm />

//       <center>
//         <button
//           type="button"
//           className="btn btn_asLink"
//           onClick={() => {
//             history.push('/login');
//           }}
//         >
//           Login
//         </button>
//       </center>
//     </div>
//   );
// }

// export default RegisterPage;
import React from "react";
import { useHistory } from "react-router-dom";
import RegisterForm from "../RegisterForm/RegisterForm";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function RegisterPage() {
  const history = useHistory();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-14 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-4">Welcome!</h1>

        <RegisterForm />
        <div className="mt-6">
          <Button
            type="button"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
            onClick={() => {
              history.push("/login");
            }}
          >
            Login
          </Button>
        </div>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
