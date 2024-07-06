import { Triangle } from "react-loader-spinner";

const Loader = () => (
  <div className="flex-center w-full">
    <Triangle
      visible={true}
      height="35"
      width="35"
      color="#FFA500"
      ariaLabel="triangle-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  </div>
);

export default Loader;
