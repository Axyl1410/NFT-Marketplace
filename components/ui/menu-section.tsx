import React from "react";

type MenuSectionProps = {
  items: string[]; // Danh sách các menu item
  activeItem: string; // Menu item đang được chọn
  onItemSelect: (item: string) => void; // Hàm xử lý khi chọn menu
  layout: "horizontal" | "vertical"; // Chế độ hiển thị
};

const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  activeItem,
  onItemSelect,
  layout,
}) => {
  return (
    <div
      className={`flex ${layout === "horizontal" ? "flex-row space-x-4" : "flex-col space-y-2"} md:flex-row md:space-x-4 md:space-y-0  `}
    >
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onItemSelect(item)}
          className={`px-4 py-2 text-sm font-bold ${
            activeItem === item
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          } rounded-lg`}
        >
          {item}
        </button>
      ))}
    </div>
  );
};
export default MenuSection;
