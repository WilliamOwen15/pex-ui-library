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
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cva, type VariantProps } from "class-variance-authority";
import { GripVertical, Plus, X } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { FieldItem, type FieldItemData } from "./field-item";

// Fields container styling variants
const fieldsVariants = cva("w-full", {
  variants: {
    layout: {
      grid: "grid",
      stack: "flex flex-col",
      inline: "flex flex-wrap",
    },
    gap: {
      none: "gap-0",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    },
  },
  defaultVariants: {
    layout: "grid",
    gap: "md",
  },
});

const fieldsGridVariants = cva("", {
  variants: {
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      auto: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    },
  },
  defaultVariants: {
    columns: 2,
  },
});

// Props interface
export interface FieldsProps extends VariantProps<typeof fieldsVariants> {
  fields: FieldItemData[];

  // Layout
  columns?: 1 | 2 | 3 | 4 | "auto";

  // Field defaults (can be overridden per field)
  variant?: "editable" | "readonly" | "compact";
  size?: "default" | "sm" | "lg";
  orientation?: "vertical" | "horizontal";

  // Features
  enableReordering?: boolean;
  enableAddRemove?: boolean;
  showSeparators?: boolean;

  // Callbacks
  onChange?: (fields: FieldItemData[]) => void;
  onFieldChange?: (id: string | number, value: string) => void;
  onFieldsReorder?: (fields: FieldItemData[]) => void;
  onFieldAdd?: () => FieldItemData;
  onFieldRemove?: (id: string | number) => void;

  // Toolbar
  addFieldLabel?: string;
  showToolbar?: boolean;
  toolbarActions?: React.ReactNode;

  // Styling
  className?: string;
  classNames?: {
    container?: string;
    grid?: string;
    toolbar?: string;
    separator?: string;
  };
}

// Internal draggable field wrapper
interface DraggableFieldProps {
  field: FieldItemData;
  index: number;
  isDraggable: boolean;
  variant?: "editable" | "readonly" | "compact";
  size?: "default" | "sm" | "lg";
  orientation?: "vertical" | "horizontal";
  onFieldChange?: (id: string | number, value: string) => void;
  onFieldRemove?: (id: string | number) => void;
  showRemoveButton?: boolean;
}

function DraggableField({
  field,
  index,
  isDraggable,
  variant,
  size,
  orientation,
  onFieldChange,
  onFieldRemove,
  showRemoveButton,
}: DraggableFieldProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: field.id !== undefined ? String(field.id) : `field-${index}`,
    disabled: !isDraggable,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div className="group/draggable relative" ref={setNodeRef} style={style}>
      {isDraggable && (
        <button
          className="absolute top-3 -left-6 cursor-grab opacity-0 transition-opacity active:cursor-grabbing group-hover/draggable:opacity-100"
          type="button"
          {...attributes}
          {...listeners}
          aria-label="Drag to reorder"
        >
          <GripVertical className="size-4 text-muted-foreground" />
        </button>
      )}
      {showRemoveButton && field.id !== undefined && (
        <button
          aria-label="Remove field"
          className="absolute -top-2 -right-2 size-6 rounded-full bg-destructive text-destructive-foreground opacity-0 transition-opacity hover:bg-destructive/90 group-hover/draggable:opacity-100"
          onClick={() => onFieldRemove?.(field.id as string | number)}
          type="button"
        >
          <X className="mx-auto size-4" />
        </button>
      )}
      <FieldItem
        field={field}
        onChange={onFieldChange}
        orientation={orientation}
        size={size}
        variant={variant}
      />
    </div>
  );
}

// Main Fields component
export function Fields({
  fields,
  layout = "grid",
  columns = 2,
  gap = "md",
  variant = "editable",
  size = "default",
  orientation = "vertical",
  enableReordering = false,
  enableAddRemove = false,
  showSeparators = false,
  onChange,
  onFieldChange,
  onFieldsReorder,
  onFieldAdd,
  onFieldRemove,
  addFieldLabel = "Add Field",
  showToolbar = enableAddRemove,
  toolbarActions,
  className,
  classNames,
}: FieldsProps) {
  const [orderedFields, setOrderedFields] = useState<FieldItemData[]>(fields);

  // Sync with external fields prop
  useEffect(() => {
    setOrderedFields(fields);
  }, [fields]);

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
      setOrderedFields((items) => {
        const oldIndex = items.findIndex(
          (item) => String(item.id) === String(active.id)
        );
        const newIndex = items.findIndex(
          (item) => String(item.id) === String(over.id)
        );
        const reordered = arrayMove(items, oldIndex, newIndex);

        onChange?.(reordered);
        onFieldsReorder?.(reordered);

        return reordered;
      });
    }
  };

  // Handle field add
  const handleAddField = () => {
    if (onFieldAdd) {
      const newField = onFieldAdd();
      const updated = [...orderedFields, newField];
      setOrderedFields(updated);
      onChange?.(updated);
    }
  };

  // Handle field remove
  const handleRemoveField = (id: string | number) => {
    const updated = orderedFields.filter((f) => f.id !== id);
    setOrderedFields(updated);
    onChange?.(updated);
    onFieldRemove?.(id);
  };

  // Empty state
  if (orderedFields.length === 0) {
    return (
      <div className={cn("py-8 text-center text-muted-foreground", className)}>
        <p>No fields to display</p>
        {enableAddRemove && onFieldAdd && (
          <Button
            className="mt-4"
            onClick={handleAddField}
            size="sm"
            variant="outline"
          >
            <Plus className="mr-2 size-4" />
            {addFieldLabel}
          </Button>
        )}
      </div>
    );
  }

  const sortableIds = orderedFields.map((field, index) =>
    field.id !== undefined ? String(field.id) : `field-${index}`
  );

  const gridClassName = cn(
    fieldsVariants({ layout, gap }),
    layout === "grid" && fieldsGridVariants({ columns }),
    classNames?.grid
  );

  const renderFields = () => (
    <div className={gridClassName}>
      {orderedFields.map((field, index) => (
        <div key={field.id !== undefined ? field.id : index}>
          <DraggableField
            field={field}
            index={index}
            isDraggable={enableReordering}
            onFieldChange={onFieldChange}
            onFieldRemove={enableAddRemove ? handleRemoveField : undefined}
            orientation={orientation}
            showRemoveButton={enableAddRemove}
            size={size}
            variant={variant}
          />
          {showSeparators && index < orderedFields.length - 1 && (
            <Separator className={cn("my-4", classNames?.separator)} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className={cn("w-full", classNames?.container, className)}>
      {showToolbar && (
        <div
          className={cn(
            "mb-4 flex items-center justify-between",
            classNames?.toolbar
          )}
        >
          <div className="flex items-center gap-2">
            {enableAddRemove && onFieldAdd && (
              <Button onClick={handleAddField} size="sm" variant="outline">
                <Plus className="mr-2 size-4" />
                {addFieldLabel}
              </Button>
            )}
            {toolbarActions}
          </div>
        </div>
      )}

      {enableReordering ? (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <SortableContext
            items={sortableIds}
            strategy={verticalListSortingStrategy}
          >
            {renderFields()}
          </SortableContext>
        </DndContext>
      ) : (
        renderFields()
      )}
    </div>
  );
}

export type { FieldItemData };
