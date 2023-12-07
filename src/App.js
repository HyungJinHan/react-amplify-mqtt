import { PubSub } from "@aws-amplify/pubsub";
import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { fetchAuthSession } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import { JSONTree } from "react-json-tree";
import "./App.css";
import awsconfig from "./aws-exports";
import AWSIotConfiguration from "./config/aws-iot-config";

Amplify.configure(awsconfig);

function App() {
  const [dataArray, setDataArray] = useState([]);

  const pubsub = new PubSub({
    region: AWSIotConfiguration.region,
    endpoint: AWSIotConfiguration.endpoint,
  });

  useEffect(() => {
    pubsub
      .subscribe({
        topics: ["odn/+/sensors/#", "odn/+/photovoltaics/#", "odn/+/sensors"],
      })
      .subscribe({
        next: (data) => {
          setDataArray((prevState) => [...prevState, data]);
          window.scrollTo(0, document.body.scrollHeight);
        },
        complete: () => {},
        error: (error) => {
          console.log(error);
        },
      });
    // console.log("first");
    return console.log("Subscribe Complete");
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

  // const uniqueArray = [
  //   ...new Map(dataArray.map((data) => [data, data])).values(),
  // ];

  console.log(dataArray);

  return (
    <div className="App">
      <Authenticator>
        {({ signOut, user }) => (
          <div className="App-header">
            <p>
              user.username : <code>{user.username}</code>
            </p>

            {user.signInDetails ? (
              <p>
                user.signInDetails.loginId :{" "}
                <code>{user.signInDetails.loginId}</code>
              </p>
            ) : (
              ""
            )}

            <p>
              PubSub.connectionState : <code>{pubsub.connectionState}</code>
            </p>

            <button style={{ cursor: "pointer" }} onClick={signOut}>
              Logout
            </button>

            {dataArray.length === 0 ? null : (
              <div style={{ textAlign: "left", width: "80%" }}>
                <JSONTree
                  // hideRoot
                  data={dataArray}
                  labelRenderer={([key]) => <strong>{key}</strong>}
                  valueRenderer={(raw) => <em>{raw}</em>}
                  theme={{
                    extend: "google",
                    valueLabel: {
                      textDecoration: "underline",
                    },
                  }}
                  keyPath={["ODN MQTT"]}
                />
              </div>
            )}
          </div>
        )}
      </Authenticator>
    </div>
  );
}

export default withAuthenticator(App);
