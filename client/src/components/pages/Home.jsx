const Home = ({ socket }) => {
  const passedSocket = socket;
  console.log("HOME SOCKET: ", passedSocket);
  return <h1>Welcome home!</h1>;
};
export default Home;
