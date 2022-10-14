import React, { useState } from "react";
import MultiSelect from "./MultiSelect";

const options = [
  { label: "foo", value: "foo" },
  { label: "bar", value: "bar" },
  { label: "jar", value: "jar" },
  { label: "nar", value: "nar" },
  { label: "mar", value: "mar" },
  { label: "far", value: "far" }
];
const Demo = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const getOptionLabel = option => `${option.label}`;
  const getOptionDisabled = option => option.value === "foo";
  const handleToggleOption = selectedOptions =>
    setSelectedOptions(selectedOptions);
  const handleClearOptions = () => setSelectedOptions([]);
  const handleSelectAll = isSelected => {
    if (isSelected) {
      setSelectedOptions(options);
    } else {
      handleClearOptions();
    }
  };
  return (
    <MultiSelect
      items={options}
      getOptionLabel={getOptionLabel}
      getOptionDisabled={getOptionDisabled}
      selectedValues={selectedOptions}
      label="Select complex values"
      placeholder="Placeholder for textbox"
      selectAllLabel="Select all"
      onToggleOption={handleToggleOption}
      onClearOptions={handleClearOptions}
      onSelectAll={handleSelectAll}
    />
  );
};

export default Demo;
