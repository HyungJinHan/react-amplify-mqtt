import AWS from "aws-sdk";
import AWSIotConfiguration from "../config/aws-iot-config";

export default function attachPolicy(id) {
  const Iot = new AWS.Iot({
    region: AWSIotConfiguration.region,
    // apiVersion: AWSIotConfiguration.apiVersion,
    endpoint: AWSIotConfiguration.endpoint,
  });
  const policyName = "clientMqttConnect";
  const params = { policyName: policyName, target: id };

  console.log(
    "Attach IoT Policy: " + policyName + " with cognito identity id: " + id
  );

  Iot.attachPolicy(params, function (err, data) {
    if (err) {
      //console.error(err);
      if (err.code !== "ResourceAlreadyExistsException") {
        console.log(err);
      }
    } else {
      console.log("Successfully attached policy with the identity", data);
    }
  });

  // Iot.getPolicy(params, (err, data) => {
  //   if (err) {
  //     const policy = {
  //       Version: "2012-10-17",
  //       Statement: [{ Effect: "Allow", Action: ["*"], Resource: ["*"] }],
  //     };
  //     const policyDoc = JSON.stringify(policy);
  //     console.log("Creating policy: " + policyName + " with doc: " + policyDoc);

  //     const params = {
  //       policyName: policyName,
  //       policyDocument: policyDoc,
  //     };

  //     Iot.createPolicy(params, (err, data) => {
  //       if (err) {
  //         if (err.code !== "ResourceAlreadyExistsException") {
  //           console.log(err);
  //         }
  //       } else {
  //         console.log("CreatePolicy response=" + data);
  //         attachPolicy(id, policyName);
  //       }
  //     });
  //   }
  // });
}
