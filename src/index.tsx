import { ActionPanel, Action, List, Detail } from "@raycast/api";
import { Response, usePromise } from "@raycast/utils";
import { useState } from "react";
import { load_qalc } from "./lib/manager";

export default function Command() {
  const [calcText, setCalcText] = useState("");

  const { isLoading, data } = usePromise(load_qalc);

  if (data === undefined) {
    return <Detail isLoading />;
  }

  const result = data.calculateAndPrint(calcText, 1000);
  const input_resp = data.print(data.parse(calcText, { base: 10}), 100, {base: 10})

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Calculate something..." onSearchTextChange={setCalcText} throttle >
      <List.Item title={result} subtitle={{value: input_resp}} />
    </List>
  );
}

function SearchListItem({ searchResult }: { searchResult: SearchResult }) {
  return (
    <List.Item
      title={searchResult.name}
      subtitle={searchResult.description}
      accessoryTitle={searchResult.username}
      actions={
        <ActionPanel>
          <ActionPanel.Section>
            <Action.OpenInBrowser title="Open in Browser" url={searchResult.url} />
          </ActionPanel.Section>
          <ActionPanel.Section>
            <Action.CopyToClipboard
              title="Copy Install Command"
              content={`npm install ${searchResult.name}`}
              shortcut={{ modifiers: ["cmd"], key: "." }}
            />
          </ActionPanel.Section>
        </ActionPanel>
      }
    />
  );
}

/** Parse the response from the fetch query into something we can display */
async function parseFetchResponse(response: Response) {
  const json = (await response.json()) as
    | {
        results: {
          package: {
            name: string;
            description?: string;
            publisher?: { username: string };
            links: { npm: string };
          };
        }[];
      }
    | { code: string; message: string };

  if (!response.ok || "message" in json) {
    throw new Error("message" in json ? json.message : response.statusText);
  }

  return json.results.map((result) => {
    return {
      name: result.package.name,
      description: result.package.description,
      username: result.package.publisher?.username,
      url: result.package.links.npm,
    } as SearchResult;
  });
}

interface SearchResult {
  name: string;
  description?: string;
  username?: string;
}
