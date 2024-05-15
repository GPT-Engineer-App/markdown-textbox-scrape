import React, { useState } from "react";
import { Container, VStack, Input, Button, Textarea, Text, useToast } from "@chakra-ui/react";

const Index = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const toast = useToast();

  const handleScrape = async () => {
    try {
      const response = await fetch("https://api.firecrawl.dev/v0/scrape", {
        method: "POST",
        headers: {
          "Authorization": "Bearer fc-1a67435fe4b54212b98f775c0d8fbc21",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          url: url,
          pageOptions: {
            onlyMainContent: true,
            includeHtml: true
          },
          timeout: 30000
        })
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data.markdown);
      } else {
        toast({
          title: "Error",
          description: "Failed to scrape the URL.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while scraping the URL.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">URL Scraper</Text>
        <Input
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button onClick={handleScrape} colorScheme="blue">Scrape URL</Button>
        <Textarea
          placeholder="Scraped Markdown Content"
          value={result}
          readOnly
          height="300px"
        />
      </VStack>
    </Container>
  );
};

export default Index;