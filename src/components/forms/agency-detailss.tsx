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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "../ui/form";
import { FileUpload } from "../global/file-upload";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";

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
                      <FileUpload apiEndpoint="agencyLogo" onChange={field.onChange} value={field.value} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex md:flex-row gap-4">
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Agency Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Agency Name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="companyEmail"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Agency Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex md:flex-row gap-4">
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="companyPhone"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Agency Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                disabled={isLoading}
                control={form.control}
                name="whiteLabel"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between border rounded-lg p-4 gap-4">
                    <div>
                      <FormLabel>WhiteLabel Agency</FormLabel>
                      <FormDescription>
                        Turning on whitelabel mode will show your agency logo to all sub accounts by default.
                        You can overwrite this functionality through sub account settings.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </AlertDialog>
  );
};
