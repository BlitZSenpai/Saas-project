"use client";

import { Agency } from "@prisma/client";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AlertDialog } from "../ui/alert-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { FileUpload } from "../global/file-upload";

type AgencyDetailsProps = {
  data: Partial<Agency>;
};

const FormSchema = z.object({
  name: z.string().min(2, { message: "Agency name must be atleast 2 characters." }),
  companyEmail: z.string().min(1),
  companyPhone: z.string().min(1),
  whiteLabel: z.boolean(),
  address: z.string().min(1),
  city: z.string().min(1),
  zipCode: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1),
  agencyLogo: z.string().min(1),
});

export const AgencyDetails = ({ data }: AgencyDetailsProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [deleteAgency, setDeleteAgency] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: data.name,
      companyEmail: data.companyEmail,
      companyPhone: data.companyPhone,
      whiteLabel: data.whiteLabel || false,
      address: data.address,
      city: data.city,
      zipCode: data.zipCode,
      state: data.state,
      country: data.country,
      agencyLogo: data.agencyLogo,
    },
  });
  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data]);

  const handleSubmit = async () => {};

  return (
    <AlertDialog>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Agenncy Information</CardTitle>
          <CardDescription>
            Lets create an agency for your business. You can edit agency settings later from the agency
            settings tab.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                disabled={isLoading}
                control={form.control}
                name="agencyLogo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agency Logo</FormLabel>
                    <FormControl>
                      <FileUpload></FileUpload>
                    </FormControl>
                  </FormItem>
                )}></FormField>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AlertDialog>
  );
};
