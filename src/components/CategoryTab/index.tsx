import React from 'react';

type CategoryTabProps = {
  name: string;
  isSelected: boolean;
  onClick: () => void;
};

const CategoryTab: React.FC<CategoryTabProps> = ({
  name,
  isSelected,
  onClick,
}) => {
  return (
    <button
      className={`btn btn-secondary ${
        isSelected
          ? 'bg-secondary-focus text-white'
          : 'bg-base-100 text-secondary-content'
      }`}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default CategoryTab;
