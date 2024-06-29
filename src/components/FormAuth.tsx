import { FC } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

interface IFormAuth {
  handleSubmit: (e: React.FormEvent) => void;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  type: string;
}

const FormAuth: FC<IFormAuth> = (props) => {
  const { handleSubmit, setEmail, setPassword, type } = props;
  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col py-4">
      <input
        onChange={(e) => setEmail(e.target.value)}
        className="p-3 my-2 bg-gray-500 rounded"
        type="email"
        placeholder="Email"
        autoComplete="email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        className="p-3 my-2 bg-gray-500 rouded"
        type="password"
        placeholder="Password"
        autoComplete="current-password"
      />
      <Button className=" w-full bg-red-600 my-10 text-center text-white">
        <p className="text-center">{type === "signUp" ? "Sign Up" : "Sign In"}</p>
      </Button>
      <div className="flex justify-between items-center text-sm text-gray-600">
        <p>
          <input className="mr-2" type="checkbox" />
          Remember me
        </p>
        <p>Need Help?</p>
      </div>
      <p className="py-8">
        <span className="text-gray-600">
          <span className="text-gray-600">New to Netflix?</span>{" "}
        </span>{" "}
        <Link to={type === "signUp" ? "/login" : "/signUp"}>
          {type === "signUp" ? "Sign In" : "Sign Up"}
        </Link>
      </p>
    </form>
  );
};

export default FormAuth;
