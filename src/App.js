import { PubSub } from "@aws-amplify/pubsub";
import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { fetchAuthSession } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import "./App.css";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

// const GetCognitoId = () => {
//   const [cognitoId, setCognitoId] = useState("");

//   fetchAuthSession()
//     .then((info) => {
//       const cognitoIdentityId = info.identityId;
//       setCognitoId(cognitoIdentityId);
//     })
//     .catch((err) => console.log(err));

//   return (
//     <p>
//       aws-cli bash :{" "}
//       <code style={{ fontSize: "15px" }}>
//         aws iot attach-policy --policy-name 'clientMqttConnect' --target '
//         {cognitoId}'
//       </code>
//     </p>
//   );
// };

function App() {
  const [dataArray, setDataArray] = useState([]);
  const [etc, setEtc] = useState({
    subscribeMsg: "Disconnected",
  });

  const getCognitoId = () => {
    fetchAuthSession()
      .then((info) => {
        const cognitoIdentityId = info.identityId;
        console.log();
        console.log(
          "Install aws-cli first and use script\n\n" +
            `aws iot attach-policy --policy-name 'clientMqttConnect' --target '${cognitoIdentityId}'`
        );
      })
      .catch((err) => {
        if (err) {
          console.log("Logout");
        }
      });
  };

  const pubsub = new PubSub({
    region: "ap-northeast-2",
    endpoint: "wss://a3jmtb9lvgjr1c-ats.iot.ap-northeast-2.amazonaws.com/mqtt",
  });

  useEffect(() => {
    pubsub.subscribe({ topics: "odn/+/sensors" }).subscribe({
      next: (data) => {
        console.log(data);
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

  const uniqueArray = [
    ...new Map(dataArray.map((data) => [data.measure_time, data])).values(),
  ];

  console.log(uniqueArray);

  return (
    <div className="App">
      <Authenticator>
        {({ signOut, user }) => (
          <div className="App-header">
            {getCognitoId()}

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
