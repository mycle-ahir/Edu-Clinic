"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createProject } from "@/lib/database/actions/project.action"
import { useState } from "react"
import { UploadOnCloudinary } from "@/lib/utils"


const formSchema = z.object({
  name: z.string().min(2).max(50),
  detail: z.string().min(1).max(150),
  amount: z.string().min(2),
  college: z.string().min(2),
  phone: z.string().min(10).max(10),
  mail: z.string().min(2),
  isGranted:z.enum(['Granted' , 'Filed' , 'Will Filed' , 'No Patent']),
})


const ProjectForm = () => {


  const [ppt, setppt] = useState<any>(null);
  const [poster, setposter] = useState<any>(null)

  
  let usertoken = '';

  if (typeof window !== 'undefined') {
     const token = localStorage.getItem('x-auth-token');
      if(token){
          usertoken = token;
      }
    }
  
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          amount:'',
          college:'',
          detail:'',
          isGranted:"No Patent",
          mail:'',
          phone:''
        },
      })


     async function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(poster , ppt);
      const imageUrl  = await UploadOnCloudinary(poster);
      const pptUrl = await UploadOnCloudinary(ppt);
      console.log(imageUrl ,pptUrl);
        const res = await createProject({amount:values.amount , college:values.college , detail:values.detail , isGranted:values.isGranted , mail:values.mail , name:values.name , phone:values.phone , poster:imageUrl , ppt:pptUrl , student:usertoken});
        console.log("this is response ",res);
            
        console.log(values)
      }
      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mb-3">
            <div className="justify-between mt-4 md:grid md:grid-cols-2 gap-10 space-y-6 md:space-y-0">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="outline-none border-none bg-slate-100 rounded-full" placeholder="Your project name.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="college"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="outline-none border-none bg-slate-100 rounded-full" placeholder="Institute/organization name" {...field} />
                  </FormControl>
                 
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>

            <div className="justify-between mt-4 md:grid md:grid-cols-2 gap-10 space-y-6 md:space-y-0">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className=" outline-none border-none bg-slate-100 rounded-full" placeholder="Funding amount  " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isGranted"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                  <Select onValueChange={field.onChange} >
                  <SelectTrigger className=" bg-slate-100 border-none">
                    <SelectValue placeholder="Select Patent Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Granted" >Patent Granted</SelectItem>
                    <SelectItem value="Filed">Patent Filed</SelectItem>
                    <SelectItem value="Will Filed">Patent Yet To filed</SelectItem>
                    <SelectItem value="No Patent">No Patent</SelectItem>
                  </SelectContent>
                </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>

            <div className="justify-between mt-4 md:grid md:grid-cols-2 gap-10 space-y-6 md:space-y-0">
            <FormField
              control={form.control}
              name="detail"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea className=" bg-slate-100 border-none rounded-xl h-40" placeholder="Elaborate your project details" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <p className="text-sm font-normal text-zinc-600" >Select project ppt*</p>
              <Input onChange={(e)=>{
                setppt(e.target.files)
              }} className="mt-2" type="file"/>
              <p className="text-sm font-normal text-zinc-600 mt-4" >Select project image or logo*</p>
              <Input onChange={(e)=>{
                setposter(e.target.files);
              }} className="mt-2" type="file"/>
            </div>
            </div>

            <div className="justify-between mt-4 md:grid md:grid-cols-2 gap-10 space-y-6 md:space-y-0">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                  <Input className="outline-none border-none bg-slate-100 rounded-full" placeholder="Your Phone  " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mail"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                  <Input className="outline-none border-none bg-slate-100 rounded-full" placeholder="Your email address  " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            <Button 
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="w-full bg-zinc-900"
        >
          {form.formState.isSubmitting ? (
            'Submitting...'
          ): `Submit `}</Button>
          </form>
        </Form>
      )
}

export default ProjectForm
