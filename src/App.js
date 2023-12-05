import "@aws-amplify/ui-react/styles.css";
import "./App.css";

function App() {
  // const pubsub = new PubSub({
  //   region: "ap-northeast-2",
  //   endpoint: "mqtts://a3jmtb9lvgjr1c-ats.iot.ap-northeast-2.amazonaws.com",
  // });

  // Amplify.configure({
  //   Auth: {
  //     region: "us-east-1",
  //     userPoolId: "us-east-1_XvwB4sIGO",
  //     userPoolWebClientId: "react-mqtt-test-hhj",
  //   },
  // });

  return (
    // <Authenticator>
    //   {({ signOut, user }) => (
    //     <div>
    //       <p>Welcome {user.username}</p>
    //       <button onClick={signOut}>Sign out</button>
    //     </div>
    //   )}
    // </Authenticator>
    <p>Hello World</p>
  );
}

export default App;
