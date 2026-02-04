"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

// Field Item styling variants
const fieldItemVariants = cva("", {
  variants: {
    variant: {
      editable: "",
      readonly: "pointer-events-none select-none opacity-90",
      compact: "space-y-1",
    },
    size: {
      default: "",
      sm: "text-sm",
      lg: "text-lg",
    },
    orientation: {
      vertical: "flex flex-col gap-2",
      horizontal: "flex items-center gap-4",
    },
  },
  defaultVariants: {
    variant: "editable",
    size: "default",
    orientation: "vertical",
  },
});

// Field value display styling
const fieldValueVariants = cva("", {
  variants: {
    size: {
      default: "text-base",
      sm: "text-sm",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

// Type definitions
export interface FieldItemData {
  id?: string | number;
  label?: string;
  value?: string | number;
  description?: string;
  placeholder?: string;
  type?:
    | "text"
    | "number"
    | "email"
    | "tel"
    | "url"
    | "date"
    | "textarea"
    | "select";
  required?: boolean;
  disabled?: boolean;
  error?: string;

  // For select type
  options?: { label: string; value: string }[];

  // For textarea
  rows?: number;

  // Custom render
  render?: (field: FieldItemData) => React.ReactNode;
}

export interface FieldItemProps
  extends Omit<VariantProps<typeof fieldItemVariants>, "orientation"> {
  field: FieldItemData;
  orientation?: "vertical" | "horizontal";

  // Callbacks
  onChange?: (id: string | number, value: string) => void;
  onBlur?: (id: string | number) => void;

  // Styling
  classNames?: {
    root?: string;
    label?: string;
    input?: string;
    description?: string;
    error?: string;
  };
}

export function FieldItem({
  field,
  variant = "editable",
  size = "default",
  orientation = "vertical",
  onChange,
  onBlur,
  classNames,
}: FieldItemProps) {
  const fieldId = field.id !== undefined ? String(field.id) : undefined;
  const isReadonly = variant === "readonly";

  // Handle change events
  const handleChange = (value: string) => {
    if (fieldId !== undefined && onChange) {
      onChange(field.id as string | number, value);
    }
  };

  // Handle blur events
  const handleBlur = () => {
    if (fieldId !== undefined && onBlur) {
      onBlur(field.id as string | number);
    }
  };

  // Custom render function takes precedence
  if (field.render) {
    return (
      <div
        className={cn(
          fieldItemVariants({ variant, size, orientation }),
          classNames?.root
        )}
      >
        {field.render(field)}
      </div>
    );
  }

  // Readonly variant - display only
  if (isReadonly) {
    return (
      <Field
        className={cn(
          fieldItemVariants({ variant, size, orientation }),
          classNames?.root
        )}
        data-invalid={!!field.error}
        orientation={orientation}
      >
        {field.label && (
          <Label className={cn("font-medium", classNames?.label)}>
            {field.label}
            {field.required && <span className="ml-1 text-destructive">*</span>}
          </Label>
        )}
        <div className="flex flex-col gap-1.5">
          <p className={cn(fieldValueVariants({ size }), "leading-relaxed")}>
            {field.value || "—"}
          </p>
          {field.description && (
            <FieldDescription className={classNames?.description}>
              {field.description}
            </FieldDescription>
          )}
        </div>
      </Field>
    );
  }

  // Editable variant - form inputs
  const inputType = field.type || "text";

  // Render textarea
  if (inputType === "textarea") {
    return (
      <Field
        className={cn(
          fieldItemVariants({ variant, size, orientation }),
          classNames?.root
        )}
        data-invalid={!!field.error}
        orientation={orientation}
      >
        {field.label && (
          <FieldLabel className={classNames?.label} htmlFor={fieldId}>
            {field.label}
            {field.required && <span className="ml-1 text-destructive">*</span>}
          </FieldLabel>
        )}
        <div className="flex flex-col gap-1.5">
          <Textarea
            aria-describedby={
              field.description || field.error
                ? `${fieldId}-description`
                : undefined
            }
            aria-invalid={!!field.error}
            className={cn(
              field.error &&
                "border-destructive focus-visible:ring-destructive",
              classNames?.input
            )}
            disabled={field.disabled}
            id={fieldId}
            onBlur={handleBlur}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            rows={field.rows || 3}
            value={field.value}
          />
          {field.description && !field.error && (
            <FieldDescription
              className={classNames?.description}
              id={`${fieldId}-description`}
            >
              {field.description}
            </FieldDescription>
          )}
          {field.error && (
            <FieldError
              className={classNames?.error}
              id={`${fieldId}-description`}
            >
              {field.error}
            </FieldError>
          )}
        </div>
      </Field>
    );
  }

  // Render select
  if (inputType === "select" && field.options) {
    return (
      <Field
        className={cn(
          fieldItemVariants({ variant, size, orientation }),
          classNames?.root
        )}
        data-invalid={!!field.error}
        orientation={orientation}
      >
        {field.label && (
          <FieldLabel className={classNames?.label} htmlFor={fieldId}>
            {field.label}
            {field.required && <span className="ml-1 text-destructive">*</span>}
          </FieldLabel>
        )}
        <div className="flex flex-col gap-1.5">
          <Select
            disabled={field.disabled}
            onValueChange={handleChange}
            required={field.required}
            value={String(field.value || "")}
          >
            <SelectTrigger
              aria-describedby={
                field.description || field.error
                  ? `${fieldId}-description`
                  : undefined
              }
              aria-invalid={!!field.error}
              className={cn(
                field.error && "border-destructive focus:ring-destructive",
                classNames?.input
              )}
              id={fieldId}
            >
              <SelectValue
                placeholder={field.placeholder || "Select an option"}
              />
            </SelectTrigger>
            <SelectContent>
              {field.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {field.description && !field.error && (
            <FieldDescription
              className={classNames?.description}
              id={`${fieldId}-description`}
            >
              {field.description}
            </FieldDescription>
          )}
          {field.error && (
            <FieldError
              className={classNames?.error}
              id={`${fieldId}-description`}
            >
              {field.error}
            </FieldError>
          )}
        </div>
      </Field>
    );
  }

  // Render standard input (text, number, email, tel, url, date)
  return (
    <Field
      className={cn(
        fieldItemVariants({ variant, size, orientation }),
        classNames?.root
      )}
      data-invalid={!!field.error}
      orientation={orientation}
    >
      {field.label && (
        <FieldLabel className={classNames?.label} htmlFor={fieldId}>
          {field.label}
          {field.required && <span className="ml-1 text-destructive">*</span>}
        </FieldLabel>
      )}
      <div className="flex flex-col gap-1.5">
        <Input
          aria-describedby={
            field.description || field.error
              ? `${fieldId}-description`
              : undefined
          }
          aria-invalid={!!field.error}
          className={cn(
            field.error && "border-destructive focus-visible:ring-destructive",
            classNames?.input
          )}
          disabled={field.disabled}
          id={fieldId}
          onBlur={handleBlur}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={field.placeholder}
          required={field.required}
          type={inputType}
          value={field.value}
        />
        {field.description && !field.error && (
          <FieldDescription
            className={classNames?.description}
            id={`${fieldId}-description`}
          >
            {field.description}
          </FieldDescription>
        )}
        {field.error && (
          <FieldError
            className={classNames?.error}
            id={`${fieldId}-description`}
          >
            {field.error}
          </FieldError>
        )}
      </div>
    </Field>
  );
}
