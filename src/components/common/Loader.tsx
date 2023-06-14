import loading from "../../assets/loading.svg";

function Loader() {
  return (
    <div
      style={{
        zIndex: 9999,
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <img src={loading} alt="loading" />
    </div>
  );
}

export default Loader;
