/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  FormControl,
//   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormFieldType } from "./forms/PatientForms";
import Image from "next/image";
import PhoneInput from "react-phone-number-input/input"
import {E164Number} from "libphonenumber-js/core"
import { Select, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";

interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType,
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any) => React.ReactNode,
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
    const { fieldType, iconSrc, iconAlt, placeholder, disabled } = props;

    switch (fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {iconSrc && (
                        <Image
                            src={iconSrc}
                            height={24}
                            width={24}
                            alt={iconAlt || 'icon'}
                            className="ml-2"
                        />
                    )}
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            {...field}
                            disabled={disabled}
                            className="shad-input border-0"
                        />
                    </FormControl>
                </div>
            );
        case FormFieldType.PHONE_INPUT:
            return (
                <FormControl>
                    <PhoneInput
                        country="ID"
                        international
                        withCountryCallingCode
                        placeholder={placeholder}
                        value={field.value as E164Number | undefined}
                        onChange={field.onChange}
                        className=" input-phone w-full rounded-md border border-dark-500 bg-dark-400 p-2"
                        disabled={disabled}
                        
                    />
                </FormControl>
            );
        case FormFieldType.SELECT:
            return (
                <FormControl>
                    <Select onValueChange={field.onChange} value={field.value} disabled={disabled}>
                        <SelectTrigger>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {props.children}
                        </SelectContent>
                    </Select>
                </FormControl>
            );
        // Add more cases for other field types (e.g., TEXTAREA, DATE_PICKER, CHECKBOX, etc.)
        default:
            return null;
    }
};

const CustomFormFields = (props: CustomProps) => {
    const { control, fieldType, name, label } = props;

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1">
                    {fieldType !== FormFieldType.CHECKBOX && label && (
                        <FormLabel className="form-label-white">{label}</FormLabel>
                    )}

                    <RenderField field={field} props={props} />

                    <FormMessage className="shad-error" />
                </FormItem>
            )}
        />
    );
};

export default CustomFormFields;