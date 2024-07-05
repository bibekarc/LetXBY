import { ProgressBar } from "react-loader-spinner";

const Loader = () => (
  <div className="flex-center w-full">
    <ProgressBar
      visible={true}
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="progress-bar-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  </div>
);

export default Loader;
