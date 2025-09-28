import { useRouteError } from "react-router";

const Error = () => {
  const err = useRouteError();
  console.log(err);
  return (
    <>
      <div>Oops!!!</div>
      <div>{err.data}</div>
      <div>
        <strong style={{ color: "red"  }}>{err.status}</strong> {err.statusText}
      </div>
    </>
  );
};

export default Error;
