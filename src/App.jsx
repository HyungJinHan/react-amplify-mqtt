import { PubSub } from "@aws-amplify/pubsub";
import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import awsconfig from "./aws-exports";
import Chart from "./components/Chart";
import Main from "./components/Main";
import AWSIotConfiguration from "./config/aws-iot-config";

Amplify.configure(awsconfig);

const pubsub = new PubSub({
  region: AWSIotConfiguration.region,
  endpoint: AWSIotConfiguration.endpoint,
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main pubsub={pubsub} />,
  },
  {
    path: "/chart/:sensor",
    element: <Chart pubsub={pubsub} />,
  },
]);

function App() {
  return (
    <Authenticator>
      <RouterProvider router={router} />
    </Authenticator>
  );
}

export default withAuthenticator(App);
