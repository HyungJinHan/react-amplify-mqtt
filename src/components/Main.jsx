import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { fetchAuthSession } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { CURRENT_TIME } from "../utils/timestamp";
import JsonView from "./JsonView";

const params = [
  {
    sensor: "oxygen",
    topics: ["odn/+/sensors/oxygen", "odn/test/sensors/oxygen"],
  },
  {
    sensor: "conductivity",
    topics: ["odn/+/sensors/conductivity", "odn/test/sensors/conductivity"],
  },
  { sensor: "ph", topics: ["odn/+/sensors/ph", "odn/test/sensors/ph"] },
];

function Main({ pubsub }) {
  const [dataArray, setDataArray] = useState([]);
  const navigation = useNavigate();

  useEffect(() => {
    pubsub
      .subscribe({
        topics: ["odn/+/sensors/#", "odn/+/photovoltaics/#", "odn/+/sensors"],
      })
      .subscribe({
        next: (data) => {
          data.timestamp = CURRENT_TIME();
          setDataArray((prevState) => [...prevState, data]);
          window.scrollTo(0, document.body.scrollHeight);
        },
        complete: () => {},
        error: (error) => {
          console.log(error);
        },
      });

    return console.log("Subscribe Complete");
  }, [pubsub]);

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

  return (
    <div className="App">
      <Authenticator>
        {({ signOut, user }) => (
          <div className="App-header">
            <div>
              <div style={{ paddingBottom: "20px" }}>
                <code className="title">MQTT Checker</code>
                <code className="logout" onClick={signOut}>
                  Logout
                </code>
              </div>

              <div>
                {params.map((param) => (
                  <code
                    key={param.sensor}
                    className="logout"
                    onClick={() =>
                      navigation(`/chart/${param.sensor}`, {
                        state: { topics: param.topics, id: param.sensor },
                      })
                    }
                  >
                    {param.sensor} Chart
                  </code>
                ))}
              </div>
            </div>

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

export default withAuthenticator(Main);
