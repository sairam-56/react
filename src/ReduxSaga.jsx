import { useDispatch, useSelector } from "react-redux";
import { getDataFetch } from "./redux/slice";
import { useEffect } from "react";
import Header from "./Header";

function ReduxSaga() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.counter?.data);
  const loading = useSelector((state) => state?.counter?.loading);
  const error = useSelector((state) => state?.counter?.error);
  useEffect(() => {
    dispatch(getDataFetch());
  }, []);
  return (
    <div className="pt-16 grid justify-items-center">
      <Header item={{ item: "saga" }} />
      <div className="mt-7 font-semibold text-lg ">ReduxSaga</div>

      <div className="mt-4 space-y-1 grid justify-items-center ">
        {loading ? <p className="my-2 ">loading.....</p> : null}
        {error ? <p className="my-2 text-red-900">{error}</p> : null}
        {data?.data?.children.map((item, i) => (
          <div key={i} className="p-4 space-y-4">
            <h1 className=" flex align-middle justify-center w-full  ">
              {item.data.selftext}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReduxSaga;
