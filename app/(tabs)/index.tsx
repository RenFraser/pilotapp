import {
  Button,
  Input,
  XStack,
  YStack,
  Form,
  Spinner,
  Card,
  H2,
  Paragraph,
} from "tamagui";

import React, { useEffect, useState } from "react";
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
  InvokeModelCommandOutput,
} from "@aws-sdk/client-bedrock-runtime";

export const CLAUDE_MAX_TOKENS = 4096;
export const APPLICATION_JSON = "application/json";
export const BEDROCK_VERSION = "bedrock-2023-05-31";

export default function HomeScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [pages, setPages] = useState<number[]>([]);

  const client = new BedrockRuntimeClient({
    region: process.env.AWS_REGION_NAME || "",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
  });

  // TODO: consider switching to claude instant, or something cheap
  const HAIKU_MODEL_ID = "anthropic.claude-3-haiku-20240307-v1:0";

  // TODO: optimise claude's message so that it's given a template and provides only the filled responses.
  const body = JSON.stringify({
    messages: [
      {
        role: "user",
        content: question,
      },
    ],
    anthropic_version: BEDROCK_VERSION,
    max_tokens: CLAUDE_MAX_TOKENS,
    system: "", // TODO:
  });

  const params = {
    modelId: HAIKU_MODEL_ID,
    contentType: APPLICATION_JSON,
    accept: APPLICATION_JSON,
    body,
  };

  const request = new InvokeModelCommand(params);

  const sendToBedrock = async () => {
    console.log("in sending...");
    try {
      console.log("send now");
      const response: InvokeModelCommandOutput = await client.send(request);

      const decodedResponse = new TextDecoder().decode(response.body);

      const reply = JSON.parse(decodedResponse || "{}");
      const claudesReply = reply.content[0].text;
      setSummary(claudesReply);
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
  }, [loading]);

  return (
    <XStack
      marginTop={"$10"}
      height={"100%"}
      fullscreen
      padding="$2"
      alignSelf="center"
    >
      <YStack
        flex={1}
        gap="$4"
        height={"100%"}
        borderWidth={2}
        borderColor="$color"
        borderRadius="$4"
        padding="$2"
        marginTop={"$2"}
        fullscreen
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
            setQuestion("test question");
            setPages([1, 2]);
            setLoading(true);
            sendToBedrock();
          }}
        >
          <XStack alignItems="center" gap="$2">
            <Input
              value={question}
              onChangeText={setQuestion}
              flex={1}
              size={"$4"}
              placeholder={`Enter your question`}
            />
            <Form.Trigger asChild disabled={loading}>
              <Button icon={loading ? () => <Spinner /> : undefined}>
                Submit
              </Button>
            </Form.Trigger>
          </XStack>
        </Form>
      </YStack>
    </XStack>
  );
}
