import React from "react";

// Interface defintion for each rule
export interface Rule {
  id: number;
  field: string; // The field/qualifier in question eg language, user
  operator: string; // Operator for the qualifer (likely :)
  value: string; // Value of current rule
}

// Rule props
interface RuleProps {
  rule: Rule;
  onRuleChange: (rule: Rule) => void; //update the rule state
  onRuleDelete: (id: number) => void; //delete the rule
}

const FIELD_OPTIONS = [
  "stars",
  "language",
  "topic",
  "user",
  "size",
  "forks",
  "is",
];

// Operators for different types of queries
const OPERATOR_OPTIONS = {
  default: [":"], // For simple key:value, e.g., language:javascript
  numeric: [":", ">", "<", ">=", "<="], // For numeric values, e.g., stars:>100
};

const Rule = ({ rule, onRuleChange, onRuleDelete }: RuleProps) => {
  const handleChange = (key: keyof Omit<Rule, "id">, newValue: string) => {
    const updatedRule = { ...rule, [key]: newValue };
    onRuleChange(updatedRule);
  };

  // Determine which operators to show based on the selected field
  const currentOperators =
    rule.field === "stars" || rule.field === "size" || rule.field === "forks"
      ? OPERATOR_OPTIONS.numeric
      : OPERATOR_OPTIONS.default;

  return (
    <div className="field has-addons">
      <div className="control">
        <div className="select">
          <select
            value={rule.field}
            onChange={(e) => handleChange("field", e.target.value)}
          >
            <option value="">Select Field</option>
            {FIELD_OPTIONS.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="control">
        <div className="select">
          <select
            value={rule.operator}
            onChange={(e) => handleChange("operator", e.target.value)}
            disabled={!rule.field}
          >
            {currentOperators.map((op) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="control is-expanded">
        <input
          className="input"
          type="text"
          placeholder="Value"
          value={rule.value}
          onChange={(e) => handleChange("value", e.target.value)}
          disabled={!rule.field || !rule.operator}
        />
      </div>

      <div className="control">
        <button
          className="button is-danger"
          onClick={() => onRuleDelete(rule.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default Rule;
