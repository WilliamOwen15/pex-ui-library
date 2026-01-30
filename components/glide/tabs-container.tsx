"use client";

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// TabItem interface
export interface TabItem {
  id: string | number;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
  visible?: boolean | ((tab: TabItem, allTabs: TabItem[]) => boolean);
  ariaLabel?: string;
}

// Container styling variants
const tabsContainerVariants = cva("w-full", {
  variants: {
    containerVariant: {
      default: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
      narrow: "mx-auto max-w-3xl px-4 sm:px-6",
      fullMobile: "w-full md:mx-auto md:max-w-7xl md:px-8",
      full: "w-full",
    },
    padding: {
      none: "py-0",
      sm: "py-4",
      md: "py-8",
      lg: "py-12",
      xl: "py-16",
    },
    background: {
      none: "",
      card: "bg-card",
      accent: "bg-accent",
      dark: "bg-slate-900 text-white",
    },
  },
  defaultVariants: {
    containerVariant: "default",
    padding: "md",
    background: "none",
  },
});

// TabsContainer props
export interface TabsContainerProps
  extends VariantProps<typeof tabsContainerVariants> {
  tabs: TabItem[];
  defaultValue?: string | number;
  value?: string | number;
  onValueChange?: (value: string | number) => void;
  onTabsReorder?: (reorderedTabs: TabItem[]) => void;

  // Layout & Styling
  variant?: "default" | "line";
  orientation?: "horizontal" | "vertical";
  draggable?: boolean;
  showSeparators?: boolean;
  separatorClassName?: string;

  // Accessibility & Semantic HTML
  as?: "div" | "section" | "article";
  className?: string;
}

// Internal DraggableTabTrigger component
interface DraggableTabTriggerProps {
  tab: TabItem;
  isDraggable: boolean;
}

function DraggableTabTrigger({ tab, isDraggable }: DraggableTabTriggerProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: String(tab.id),
    disabled: !isDraggable || tab.disabled,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: isDraggable && !tab.disabled ? "grab" : "default",
  };

  return (
    <TabsTrigger
      aria-label={tab.ariaLabel || tab.label}
      disabled={tab.disabled}
      ref={setNodeRef}
      style={style}
      value={String(tab.id)}
      {...(isDraggable && !tab.disabled ? attributes : {})}
      {...(isDraggable && !tab.disabled ? listeners : {})}
    >
      {tab.icon && <span className="mr-1.5">{tab.icon}</span>}
      {tab.label}
      {tab.badge !== undefined && (
        <span className="ml-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-xs">
          {tab.badge}
        </span>
      )}
    </TabsTrigger>
  );
}

// Main TabsContainer component
export function TabsContainer({
  tabs,
  defaultValue,
  value: controlledValue,
  onValueChange,
  onTabsReorder,
  variant = "default",
  orientation = "horizontal",
  draggable = false,
  showSeparators = false,
  separatorClassName,
  containerVariant,
  padding,
  background,
  as: Component = "div",
  className,
}: TabsContainerProps) {
  // State for tab order (when draggable)
  const [orderedTabs, setOrderedTabs] = useState<TabItem[]>(tabs);
  const [internalValue, setInternalValue] = useState<string | undefined>(
    defaultValue !== undefined ? String(defaultValue) : undefined
  );

  // Sync orderedTabs when tabs prop changes
  useEffect(() => {
    setOrderedTabs(tabs);
  }, [tabs]);

  // Filter visible tabs
  const visibleTabs = useMemo(() => {
    return orderedTabs.filter((tab) => {
      if (tab.visible === undefined) {
        return true;
      }
      if (typeof tab.visible === "boolean") {
        return tab.visible;
      }
      if (typeof tab.visible === "function") {
        return tab.visible(tab, orderedTabs);
      }
      return true;
    });
  }, [orderedTabs]);

  // Ensure active tab is visible
  const currentValue = controlledValue ?? internalValue;
  useEffect(() => {
    if (!currentValue) {
      return;
    }

    const isActiveTabVisible = visibleTabs.some(
      (tab) => String(tab.id) === String(currentValue)
    );

    if (!isActiveTabVisible && visibleTabs.length > 0) {
      const firstVisibleTab = String(visibleTabs[0].id);
      if (controlledValue === undefined) {
        setInternalValue(firstVisibleTab);
      }
      onValueChange?.(firstVisibleTab);
    }
  }, [currentValue, visibleTabs, controlledValue, onValueChange]);

  // Set default value to first visible tab if not provided
  let effectiveValue: string | undefined;
  if (currentValue !== undefined) {
    effectiveValue = String(currentValue);
  } else if (visibleTabs.length > 0) {
    effectiveValue = String(visibleTabs[0].id);
  } else {
    effectiveValue = undefined;
  }

  // Handle value change
  const handleValueChange = (newValue: string) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  // Drag-and-drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setOrderedTabs((items) => {
        const oldIndex = items.findIndex(
          (item) => String(item.id) === String(active.id)
        );
        const newIndex = items.findIndex(
          (item) => String(item.id) === String(over.id)
        );
        const reordered = arrayMove(items, oldIndex, newIndex);
        onTabsReorder?.(reordered);
        return reordered;
      });
    }
  };

  // Empty state when no tabs are visible
  if (visibleTabs.length === 0) {
    return (
      <Component
        className={cn(
          tabsContainerVariants({
            containerVariant,
            padding,
            background,
          }),
          className
        )}
      >
        <div className="flex items-center justify-center py-12 text-muted-foreground">
          No tabs available
        </div>
      </Component>
    );
  }

  // Sortable IDs for drag-and-drop
  const sortableIds = visibleTabs.map((tab) => String(tab.id));

  // Choose sorting strategy based on orientation
  const sortingStrategy =
    orientation === "vertical"
      ? verticalListSortingStrategy
      : horizontalListSortingStrategy;

  return (
    <Component
      className={cn(
        tabsContainerVariants({
          containerVariant,
          padding,
          background,
        }),
        className
      )}
    >
      <Tabs
        onValueChange={handleValueChange}
        orientation={orientation}
        value={effectiveValue}
      >
        {draggable ? (
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            sensors={sensors}
          >
            <SortableContext items={sortableIds} strategy={sortingStrategy}>
              <TabsList variant={variant}>
                {visibleTabs.map((tab, index) => (
                  <Fragment key={tab.id}>
                    <DraggableTabTrigger isDraggable={draggable} tab={tab} />
                    {showSeparators && index < visibleTabs.length - 1 && (
                      <Separator
                        className={cn(
                          orientation === "vertical"
                            ? "my-1 w-full"
                            : "mx-1 h-6",
                          separatorClassName
                        )}
                        orientation={
                          orientation === "vertical" ? "horizontal" : "vertical"
                        }
                      />
                    )}
                  </Fragment>
                ))}
              </TabsList>
            </SortableContext>
          </DndContext>
        ) : (
          <TabsList variant={variant}>
            {visibleTabs.map((tab, index) => (
              <Fragment key={tab.id}>
                <DraggableTabTrigger isDraggable={false} tab={tab} />
                {showSeparators && index < visibleTabs.length - 1 && (
                  <Separator
                    className={cn(
                      orientation === "vertical" ? "my-1 w-full" : "mx-1 h-6",
                      separatorClassName
                    )}
                    orientation={
                      orientation === "vertical" ? "horizontal" : "vertical"
                    }
                  />
                )}
              </Fragment>
            ))}
          </TabsList>
        )}

        {visibleTabs.map((tab) => (
          <TabsContent key={tab.id} value={String(tab.id)}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </Component>
  );
}
