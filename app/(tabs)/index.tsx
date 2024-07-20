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

export default function HomeScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [pages, setPages] = useState<number[]>([]);

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
            setSummary("Test summary");
            setQuestion("test question");
            setPages([1, 2]);
            setLoading(true);
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
