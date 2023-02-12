import { ActionPanel, Action, List, Detail } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { useState } from "react";
import { load_qalc } from "./lib/manager";
import { ParseOptions, PrintOptions } from "./lib/qalc/qalc";

export default function Command() {
  const [calcText, setCalcText] = useState("");

  const { isLoading, data } = usePromise(load_qalc);

  if (data === undefined) {
    return <Detail isLoading markdown={"# Loading your calculator..."} />;
  }

  const parse_config: ParseOptions = {
    base: 10,
    preserve_format: true,
  };

  const print_config: PrintOptions = {
    base: 10,
    preserve_format: true,
    use_reference_names: true,
    use_unicode_signs: true,
    use_unit_prefixes: true,
    abbreviate_names: false,
    allow_factorization: false,
    spell_out_logical_operators: true,
  };

  const result = data.calculateAndPrint(calcText, 1000);
  const input_resp = data.print(data.parse(calcText, parse_config), 100, print_config);

  if (calcText === "") {
    return (
      <List
        isLoading={isLoading}
        searchBarPlaceholder="Calculate something..."
        onSearchTextChange={setCalcText}
        throttle
      >
        <List.Item title={"Type something ^^"} />
      </List>
    );
  }

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Calculate something..." onSearchTextChange={setCalcText} throttle>
      <CalculationItem searchResult={{ result, parsing: input_resp }} />
    </List>
  );
}

function CalculationItem({ searchResult }: { searchResult: CalculationItem }) {
  return (
    <List.Item
      title={searchResult.result}
      subtitle={searchResult.parsing}
      actions={
        <ActionPanel>
          <ActionPanel.Section>
            <Action.CopyToClipboard
              title="Copy Result"
              content={searchResult.result}
              shortcut={{ modifiers: ["cmd"], key: "c" }}
            />
          </ActionPanel.Section>
        </ActionPanel>
      }
    />
  );
}

interface CalculationItem {
  result: string;
  parsing: string;
}
