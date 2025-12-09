import React, { useState, useEffect } from "react";
import Rule, { type Rule as RuleType } from "../../atoms/Rules/Rule"; // Assuming Rule.tsx is in the same directory

interface RuleSetProps {
  onQualifiersChange: (qualifierString: string) => void;
}

// Simple ID generator for unique key/deletion
let nextId = 0;

const RuleSet = ({ onQualifiersChange }: RuleSetProps) => {
  const [rules, setRules] = useState<RuleType[]>([]);

  // Function to convert the array of rules into a single GitHub query string
  const generateQueryString = (currentRules: RuleType[]): string => {
    return currentRules
      .map((rule) => {
        // Only include rules that have all three parts filled
        if (rule.field && rule.operator && rule.value) {
          // Format as 'field:value' or 'field>value' etc.
          return `${rule.field}${rule.operator}${rule.value}`;
        }
        return "";
      })
      .filter(Boolean) // Remove empty strings
      .join(" "); // Join with a space, which is the AND operator in GitHub search
  };

  // Effect to call the prop function whenever the rules change
  useEffect(() => {
    const qualifierString = generateQueryString(rules);
    onQualifiersChange(qualifierString);
  }, [rules, onQualifiersChange]);

  const handleAddRule = () => {
    setRules((prevRules) => [
      ...prevRules,
      { id: nextId++, field: "", operator: ":", value: "" }, // Add new default rule
    ]);
  };

  const handleRuleChange = (updatedRule: RuleType) => {
    setRules((prevRules) =>
      prevRules.map((r) => (r.id === updatedRule.id ? updatedRule : r))
    );
  };

  const handleRuleDelete = (idToDelete: number) => {
    setRules((prevRules) => prevRules.filter((r) => r.id !== idToDelete));
  };

  return (
    <div className="container">
      <label className="label">Search Qualifiers</label>
      {rules.map((rule) => (
        <Rule
          key={rule.id}
          rule={rule}
          onRuleChange={handleRuleChange}
          onRuleDelete={handleRuleDelete}
        />
      ))}
      <div className="control">
        <button
          type="button"
          className="button is-link "
          onClick={handleAddRule}
        >
          + Add Filter Rule
        </button>
      </div>
    </div>
  );
};

export default RuleSet;
