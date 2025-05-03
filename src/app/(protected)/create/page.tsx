 'use client '
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
 import React from 'react'
import { useForm } from 'react-hook-form'
 

 type FormInput = {
    repoUrl: string,
    projectName: string,
    githubToken?: string
 }
 const CreatePage = () => {
    const {register, handleSubmit, reset} = useForm<FormInput>();
    function onSubmit(data: FormInput){
        window.alert(data)
        return true;
    }

   return (
     <div className='flex items-center gap-12 h-full justify-center'>
        <img src='' className='h-56 w-auto'/>
        <div>
            <div>
                <h1 className='font-semibold text-2xl '>Link Your Github Repository</h1>
                <p className='text-sm text-muted-foreground'>Enter the URL to your Github repository to get started</p>
            </div>
            <div className="h-4"></div>
            <div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("projectName", { required: true })}
              placeholder="Project Name"
            />
            <div className="h-2"></div>
            <Input
              {...register("repoUrl", { required: true })}
              placeholder="GitHub URL"
            />
            <div className="h-2"></div>
            <Input
              {...register("githubToken")}
              placeholder="GitHub Token (Optional)"
            />
            <div className="h-4"></div>
            <Button disabled={createProject.isPending} type="submit">
              Check Credits
            </Button>
          </form>
            </div>
        </div>

     </div>
   )
 }
 
 export default CreatePage