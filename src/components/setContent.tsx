import Spinner from "./spinner/Spinner";
import Error from "./Error/Error";
import NotFound from "./NotFound/NotFound";

const setContent = (process:string, Component) => {
 
  switch (process) {
    case "loading":
      return <Spinner />;
    case "confirmed":
      return Component;
    case "error":
      return <Error />;
    case "founding":
      return <NotFound />;
  }
};

export default setContent;
