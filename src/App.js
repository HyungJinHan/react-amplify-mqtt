import { PubSub } from "@aws-amplify/pubsub";
import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { useEffect, useState } from "react";
import "./App.css";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

function App() {
  const [dataArray, setDataArray] = useState([]);
  const [message, setMessage] = useState({
    subscribeMsg: "Disconnected",
  });

  const pubsub = new PubSub({
    region: "ap-northeast-2",
    endpoint: "wss://a3jmtb9lvgjr1c-ats.iot.ap-northeast-2.amazonaws.com/mqtt",
  });

  useEffect(() => {
    pubsub.subscribe({ topics: "odn/+/sensors" }).subscribe({
      next: (data) => {
        console.log(data, typeof data);
        setDataArray((prevState) => ({
          ...prevState,
          data,
        }));
      },
      complete: () =>
        setMessage({
          subscribeMsg: 'Subscribed to "odn/+/sensors"',
        }),
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
            <p>
              Welcome <code>{user.username}</code>
            </p>
            {user.signInDetails ? (
              <p>
                email : <code>{user.signInDetails.loginId}</code>
              </p>
            ) : (
              ""
            )}

            <p>
              Connecting State : <code>{pubsub.connectionState}</code>
            </p>

            <p>
              Subscribe State : <code>{message.subscribeMsg}</code>
            </p>

            {!dataArray === "" ? (
              <>
                <p>MQTT Message</p>
                <div>
                  {dataArray.map((data) => (
                    <code>
                      {data.device_id} | {data.serial_number} |{" "}
                      {data.measure_time}
                    </code>
                  ))}
                </div>
              </>
            ) : null}

            <br />

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
