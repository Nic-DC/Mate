import Register from "./Register";
const Home = ({ socket }) => {
  const passedSocket = socket;
  console.log("HOME SOCKET: ", passedSocket);
  return <Register />;
};
export default Home;
