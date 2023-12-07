import { PubSub } from "@aws-amplify/pubsub";
import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { fetchAuthSession } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import "./App.css";
import awsconfig from "./aws-exports";
import JsonView from "./components/JsonView";
import AWSIotConfiguration from "./config/aws-iot-config";

Amplify.configure(awsconfig);

const pubsub = new PubSub({
  region: AWSIotConfiguration.region,
  endpoint: AWSIotConfiguration.endpoint,
});

function App() {
  const [dataArray, setDataArray] = useState([]);

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
            <code className="title">MQTT Checker</code>

            <button className="logout" onClick={signOut}>
              Logout
            </button>

            <div className="json-section">
              <JsonView data={user} keyPath="Authenticator.user Info" />
              <JsonView data={pubsub} keyPath="PubSub Info" />
              <JsonView data={dataArray} keyPath="ODN MQTT" />
            </div>
          </div>
        )}
      </Authenticator>
    </div>
  );
}

export default withAuthenticator(App);
