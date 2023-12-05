import { PubSub } from "@aws-amplify/pubsub";
import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { useEffect, useState } from "react";
import "./App.css";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

function App() {
  const [message, setMessage] = useState("");

  const pubsub = new PubSub({
    region: "ap-northeast-2",
    endpoint:
      // "mqtts://a3jmtb9lvgjr1c-ats.iot.ap-northeast-2.amazonaws.com:8883",
      "wss://a3jmtb9lvgjr1c-ats.iot.ap-northeast-2.amazonaws.com/mqtt",
  });

  console.log(pubsub);

  // fetchAuthSession().then((info) => {
  //   const cognitoIdentityId = info.identityId;
  //   console.log(cognitoIdentityId);
  // });

  useEffect(() => {
    pubsub.subscribe({ topics: "odn/+/sensors" }).subscribe({
      next: (data) => {
        console.log(data);
        setMessage(data.msg);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }, []);

  return (
    <div className="App">
      <Authenticator>
        {({ signOut, user }) => (
          <div className="App-header">
            {/* test */}
            <p>
              Welcome <code>{user.username}</code>
            </p>

            <p>
              email : <code>{user.signInDetails.loginId}</code>
            </p>

            <p>
              Connecting State : <code>{pubsub.connectionState}</code>
              {console.log(pubsub.connectionState)}
            </p>

            <p>
              MQTT Message : <code>{message}</code>
            </p>

            <button style={{ cursor: "pointer" }} onClick={signOut}>
              Sign out
            </button>
          </div>
        )}
      </Authenticator>
    </div>
  );
}

export default withAuthenticator(App);
