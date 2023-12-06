import { PubSub } from "@aws-amplify/pubsub";
import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { fetchAuthSession } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import "./App.css";
import awsconfig from "./aws-exports";

import AWSIotConfiguration from "./config/aws-iot-config";

Amplify.configure(awsconfig);

function App() {
  const [dataArray, setDataArray] = useState([]);
  const [etc, setEtc] = useState({
    subscribeMsg: "Disconnected",
  });

  const pubsub = new PubSub({
    region: AWSIotConfiguration.region,
    endpoint: AWSIotConfiguration.endpoint,
  });

  useEffect(() => {
    pubsub.subscribe({ topics: "odn/+/sensors" }).subscribe({
      next: (data) => {
        setDataArray((prevState) => [...prevState, data]);
      },
      complete: () =>
        setEtc({
          subscribeMsg: 'Subscribed to "odn/+/sensors"',
        }),
      error: (error) => {
        console.log(error);
      },
    });
  }, []);

  useEffect(() => {
    fetchAuthSession()
      .then((info) => {
        const cognitoIdentityId = info.identityId;
        // attachPolicy(cognitoIdentityId);

        console.log(
          "Install aws-cli first and use script\n\n" +
            `aws iot attach-policy --policy-name 'clientMqttConnect' --target '${cognitoIdentityId}'`
        );
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          console.log("Logout");
        }
      });
  }, []);

  const uniqueArray = [
    ...new Map(dataArray.map((data) => [data.measure_time, data])).values(),
  ];

  console.log(uniqueArray);

  return (
    <div className="App">
      <Authenticator>
        {({ signOut, user }) => (
          <div className="App-header">
            {/* {policyAttach()} */}

            <p>
              UserID : <code>{user.username}</code>
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
              Subscribe State : <code>{etc.subscribeMsg}</code>
            </p>

            <button style={{ cursor: "pointer" }} onClick={signOut}>
              Logout
            </button>

            {uniqueArray.length === 0 ? null : (
              <>
                <p>MQTT Message</p>

                {uniqueArray.map((data, index) => (
                  <div key={index}>
                    <code style={{ fontSize: "15px" }}>
                      {data.device_id} | {data.serial_number} |{" "}
                      {data.measure_time}
                    </code>
                    <br />
                    <br />
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </Authenticator>
    </div>
  );
}

export default withAuthenticator(App);
