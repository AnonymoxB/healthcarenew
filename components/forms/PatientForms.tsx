"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormFields from "../CustomFormFields";

export enum FormFieldType {
    INPUT = "input",
    TEXTAREA = "textarea",
    PHONE_INPUT = "phoneInput",
    CHECKBOX = "checkbox",
    DATE_PICKER = "datePicker",
    SELECT = "select",
    SKELETON = "skeleton",
}

// Extended form schema
const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    phone: z.string().min(10, {
        message: "Phone number must be at least 10 digits.",
    }),
});

const PatientForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            phone: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        // Add API call or further processing here
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section className="mb-12 space-y-4">
                    <h1 className="text-white header">Hi there</h1>
                    <p className="text-dark-700">Schedule your first appointment</p>
                </section>

                {/* Username Field */}
                <CustomFormFields
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="username"
                    label="Full name"
                    placeholder="John Doe"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="user"
                />

                {/* Email Field */}
                <CustomFormFields
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="johndoe@example.com"
                    iconSrc="/assets/icons/email.svg"
                    iconAlt="email"
                />

                {/* Phone Field */}
                <CustomFormFields
                    fieldType={FormFieldType.PHONE_INPUT}
                    control={form.control}
                    name="phone"
                    label="Phone number"
                    placeholder="+1 (123) 456-7890"
                    iconSrc="/assets/icons/phone.svg"
                    iconAlt="phone"
                />

                <Button className="bg-green-500" type="submit">
                    Submit
                </Button>
            </form>
        </Form>
    );
};

export default PatientForm;