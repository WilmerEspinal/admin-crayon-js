import React, { useState } from "react";

import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";

export default function DynamicDropdownWithCheckboxes() {
  const categories = [
    { name: "Accounting", key: "A" },
    { name: "Marketing", key: "M" },
    { name: "Production", key: "P" },
    { name: "Research", key: "R" },
  ];

  const [selectedCategories, setSelectedCategories] = useState([categories[1]]);

  const onCategoryChange = (e) => {
    let _selectedCategories = [...selectedCategories];

    if (e.checked) _selectedCategories.push(e.value);
    else
      _selectedCategories = _selectedCategories.filter(
        (category) => category.key !== e.value.key
      );

    setSelectedCategories(_selectedCategories);
  };

  const selectedCategoriesLabel = selectedCategories.length
    ? selectedCategories.map((cat) => cat.name).join(", ")
    : "Seleccionar categorías";

  const customDropdownOption = (
    <div className="flex flex-column gap-3 p-2">
      {categories.map((category) => (
        <div key={category.key} className="flex align-items-center">
          <Checkbox
            inputId={category.key}
            name="category"
            value={category}
            onChange={onCategoryChange}
            checked={selectedCategories.some(
              (item) => item.key === category.key
            )}
          />
          <label htmlFor={category.key} className="ml-2">
            {category.name}
          </label>
        </div>
      ))}
    </div>
  );
}
