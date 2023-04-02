import { Link } from "react-router-dom";
import Button from "Components/UI/Button/Button";

const Error = () => {
  return (
    <div className="bg-primary h-screen p-10 pt-40">
      <div>
        <span className="text-white text-9xl my-10">404</span>
        <p className="text-white text-xl my-5">...Oops! Something went wrong</p>
        <p className="text-white my-5 max-w-sm text-sm">
          Unfortunately we've not been able to the find the page you are looking
          for.
        </p>
        <Link to="/">
          <Button>HOME</Button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
