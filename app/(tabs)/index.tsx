import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  H2,
  Input,
  Paragraph,
  Spinner,
  XStack,
  YStack,
} from "tamagui";
// import {
//   BedrockRuntimeClient,
//   ConverseCommand,
//   ConverseCommandOutput,
// } from "@aws-sdk/client-bedrock-runtime";
// import { ConverseCommandInput } from "@aws-sdk/client-bedrock-runtime/dist-types/commands/ConverseCommand";
// import { Message } from "@aws-sdk/client-bedrock-runtime/dist-types/models/models_0";

// TODO: consider switching to claude instant, or something cheap
// const HAIKU_MODEL_ID = "anthropic.claude-3-haiku-20240307-v1:0";

export default function HomeScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [pages, setPages] = useState<number[]>([]);

  // FIXME: DO NOT STORE SECRETS IN .ENV FILES - THEY ARE COMPILED AND PUBLICLY ACCESSIBLE
  //        USE A BETTER STORAGE MECHANISM. EXPO DOCS ARE HELPFUL.
  // FIXME: bedrock exception causes the splash screen to indefinitely load when creds & region aren't' accessible (eas cloud build) - I need to use an error view
  // const client = new BedrockRuntimeClient({
  //   region: process.env.EXPO_PUBLIC_AWS_REGION_NAME || "",
  //   credentials: {
  //     accessKeyId: process.env.EXPO_PUBLIC_AWS_ACCESS_KEY_ID || "",
  //     secretAccessKey: process.env.EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY || "",
  //   },
  // });

  // TODO: optimise claude's message so that it's given a template and provides only the filled responses.
  // TODO: extract to a hook and also play around with the API
  // const message: Message = {
  //   role: "user",
  //   content: [{ text: question }],
  // };

  // const params: ConverseCommandInput = {
  //   modelId: HAIKU_MODEL_ID,
  //   messages: [message],
  // };

  // const command = new ConverseCommand(params);

  const sendToBedrock = async () => {
    try {
      // const response: ConverseCommandOutput = await client.send(command);
      // const messages = response.output?.message?.content ?? [];
      // const msg = messages.length > 0 ? messages[0]?.text : "UNKNOWN";
      // setSummary(msg ?? "UNKNOWN");
      setSummary("TODO");
    } catch (error) {
      console.error(error);
    } finally {
      // TODO:
    }
  };

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => setLoading(false), 2000);
      return () => {
        clearTimeout(timer);
      };
    }

    return undefined;
  }, [loading]);

  const btnIcon = loading ? <Spinner /> : undefined;

  return (
    <XStack
      alignSelf="center"
      fullscreen
      height={"100%"}
      marginTop={"$10"}
      padding="$2"
    >
      <YStack
        borderColor="$color"
        borderRadius="$4"
        borderWidth={2}
        flex={1}
        fullscreen
        gap="$4"
        height={"100%"}
        marginTop={"$2"}
        padding="$2"
      >
        <Card height={"80%"}>
          <Card.Header padded>
            <H2>Pilot App</H2>
          </Card.Header>
          <Paragraph>Question: {question}</Paragraph>
          <Paragraph>Summary: {summary}</Paragraph>
          <Paragraph>Pages: {pages}</Paragraph>
        </Card>
        <Form
          gap="$2"
          onSubmit={() => {
            setPages([1, 2]);
            setLoading(true);
            sendToBedrock();
          }}
        >
          <XStack alignItems="center" gap="$2">
            <Input
              flex={1}
              onChangeText={setQuestion}
              placeholder={`Enter your question`}
              size={"$4"}
              value={question}
            />
            <Form.Trigger asChild disabled={loading}>
              <Button icon={btnIcon}>Submit</Button>
            </Form.Trigger>
          </XStack>
        </Form>
      </YStack>
    </XStack>
  );
}
