"use client";

import {ReactNode} from "react";
import {TransactionType} from "@/lib/types";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {cn} from "@/lib/utils";
import {useForm} from "react-hook-form";
import {CreateTransactionSchema, CreateTransactionSchemaType} from "@/schema/transaction";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormField} from "@/components/ui/form";

interface Props {
    trigger: ReactNode;
    type: TransactionType;
}

function CreateTransactionDialog({trigger, type}: Props) {
    const form = useForm<CreateTransactionSchemaType>({
        resolver: zodResolver(CreateTransactionSchema),
        defaultValues: {
            type,
            date: new Date(),
        }
    })
    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create a new <span className={cn("m-1 capitalize", type === "income" ? "text-emerald-500": "text-red-500")}>{type}</span>
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form className="space-y-4">
                        <FormField
                        control={form.control}
                        name="description"
                        />


                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateTransactionDialog;