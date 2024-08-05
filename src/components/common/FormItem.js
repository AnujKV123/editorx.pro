import React from 'react'
import { FormControl,
    FormDescription,
    FormLabel,
    FormMessage,
    FormItem,
    FormField
 } from '../ui/form'

 import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '../ui/select'
 import { Input } from '../ui/input'
 import { inputTypes } from './CommonValues'

const FormItemCmp = ({lable="", 
                    placeholder="", 
                    name="", 
                    type="text", 
                    description="", 
                    control, 
                    fieldType=inputTypes.INPUTFIELD, 
                    content=[], 
                    className="",
                    forContent="",
                }) => {
  return (
    <>
    {(fieldType === inputTypes.INPUTFIELD) && <FormField
        control={control}
        name={name}
        render={({ field }) => (
        <FormItem>
            {lable.length>0 && <FormLabel htmlFor={forContent} className={className}>{lable}</FormLabel>}
            <FormControl>
                <Input placeholder={placeholder} type={type} {...field} />
            </FormControl>
            {description.length>0 && <FormDescription> {description} </FormDescription>}
            <FormMessage />
        </FormItem>
        )}
    />}
    {(fieldType === inputTypes.SELECTFIELD) && <FormField
        control={control}
        name={name}
        render={({ field }) => (
        <FormItem>
            {lable.length>0 && <FormLabel>{lable}</FormLabel>}
            <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={description} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {content.map((item, id) => (
                    <SelectItem key={id} value={item.value}>{item.lable}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            {description.length>0 && <FormDescription> {description} </FormDescription>}
            <FormMessage />
        </FormItem>
        )}
    />}
    </>
  )
}

export default FormItemCmp