import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

export interface FilterState {
  priceRange: [number, number];
  colors: string[];
  materials: string[];
  sortBy: "price-low" | "price-high" | "newest" | "popular";
}

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onReset: () => void;
}

const COLORS = [
  { id: "purple", label: "Фиолетовый" },
  { id: "pink", label: "Розовый" },
  { id: "gold", label: "Золотой" },
  { id: "black", label: "Чёрный" },
  { id: "green", label: "Зелёный" },
  { id: "blue", label: "Синий" },
  { id: "red", label: "Красный" },
  { id: "multicolor", label: "Мультиколор" },
  { id: "brown", label: "Коричневый" },
];

const MATERIALS = [
  { id: "recycled-plastic", label: "Переработанный пластик" },
  { id: "silver-hardware", label: "Серебристая фурнитура" },
  { id: "gold-hardware", label: "Золотистая фурнитура" },
  { id: "leather", label: "Кожа" },
  { id: "beads", label: "Бусины" },
];

const SORT_OPTIONS = [
  { id: "newest", label: "Новые" },
  { id: "popular", label: "Популярные" },
  { id: "price-low", label: "Цена: от низкой к высокой" },
  { id: "price-high", label: "Цена: от высокой к низкой" },
];

export default function FilterSidebar({ filters, onFiltersChange, onReset }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    colors: true,
    materials: false,
    sort: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handlePriceChange = (value: [number, number]) => {
    onFiltersChange({ ...filters, priceRange: value });
  };

  const handleColorToggle = (colorId: string) => {
    const newColors = filters.colors.includes(colorId)
      ? filters.colors.filter((c) => c !== colorId)
      : [...filters.colors, colorId];
    onFiltersChange({ ...filters, colors: newColors });
  };

  const handleMaterialToggle = (materialId: string) => {
    const newMaterials = filters.materials.includes(materialId)
      ? filters.materials.filter((m) => m !== materialId)
      : [...filters.materials, materialId];
    onFiltersChange({ ...filters, materials: newMaterials });
  };

  const handleSortChange = (sortId: string) => {
    onFiltersChange({
      ...filters,
      sortBy: sortId as FilterState["sortBy"],
    });
  };

  const activeFiltersCount =
    (filters.colors.length > 0 ? 1 : 0) +
    (filters.materials.length > 0 ? 1 : 0) +
    (filters.priceRange[0] !== 10 || filters.priceRange[1] !== 100 ? 1 : 0);

  return (
    <div className="w-full md:w-64 bg-card rounded-xl border border-border p-6 h-fit sticky top-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-lg text-foreground">Фильтры</h3>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-xs h-auto p-0 text-accent hover:text-accent/80"
          >
            Сбросить
          </Button>
        )}
      </div>

      {/* Sort */}
      <div className="mb-6 pb-6 border-b border-border">
        <button
          onClick={() => toggleSection("sort")}
          className="flex items-center justify-between w-full mb-3 hover:text-accent transition-colors"
        >
          <span className="font-medium text-foreground">Сортировка</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${expandedSections.sort ? "rotate-180" : ""}`}
          />
        </button>
        {expandedSections.sort && (
          <div className="space-y-2">
            {SORT_OPTIONS.map((option) => (
              <label key={option.id} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="sort"
                  value={option.id}
                  checked={filters.sortBy === option.id}
                  onChange={() => handleSortChange(option.id)}
                  className="w-4 h-4 accent-accent"
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6 pb-6 border-b border-border">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full mb-3 hover:text-accent transition-colors"
        >
          <span className="font-medium text-foreground">Цена</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${expandedSections.price ? "rotate-180" : ""}`}
          />
        </button>
        {expandedSections.price && (
          <div className="space-y-4">
            <Slider
              min={10}
              max={100}
              step={5}
              value={filters.priceRange}
              onValueChange={handlePriceChange}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {filters.priceRange[0]} ₽
              </span>
              <span className="text-muted-foreground">
                {filters.priceRange[1]} ₽
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Colors */}
      <div className="mb-6 pb-6 border-b border-border">
        <button
          onClick={() => toggleSection("colors")}
          className="flex items-center justify-between w-full mb-3 hover:text-accent transition-colors"
        >
          <span className="font-medium text-foreground">Цвет</span>
          {filters.colors.length > 0 && (
            <span className="text-xs bg-accent text-accent-foreground rounded-full w-5 h-5 flex items-center justify-center">
              {filters.colors.length}
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 transition-transform ${expandedSections.colors ? "rotate-180" : ""}`}
          />
        </button>
        {expandedSections.colors && (
          <div className="space-y-3">
            {COLORS.map((color) => (
              <label key={color.id} className="flex items-center gap-3 cursor-pointer group">
                <Checkbox
                  checked={filters.colors.includes(color.id)}
                  onCheckedChange={() => handleColorToggle(color.id)}
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {color.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Materials */}
      <div>
        <button
          onClick={() => toggleSection("materials")}
          className="flex items-center justify-between w-full mb-3 hover:text-accent transition-colors"
        >
          <span className="font-medium text-foreground">Материал</span>
          {filters.materials.length > 0 && (
            <span className="text-xs bg-accent text-accent-foreground rounded-full w-5 h-5 flex items-center justify-center">
              {filters.materials.length}
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 transition-transform ${expandedSections.materials ? "rotate-180" : ""}`}
          />
        </button>
        {expandedSections.materials && (
          <div className="space-y-3">
            {MATERIALS.map((material) => (
              <label key={material.id} className="flex items-center gap-3 cursor-pointer group">
                <Checkbox
                  checked={filters.materials.includes(material.id)}
                  onCheckedChange={() => handleMaterialToggle(material.id)}
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {material.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
