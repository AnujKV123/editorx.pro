
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form"
import { signUpSchema, 
    signUpSchemaDefaultValue,
    logInSchema,
    logInSchemaDefaultValue,
    changePasswordSchema,
    changePasswordSchemaDefaultValue
 } from '../schema/FormShema';



export const FormResolvers = ()=>{

    /**
   * @type {import("../schema/FormShema").SignupStateType}
   */
    const signUpResolver = useForm({
        resolver: zodResolver(signUpSchema),
        // mode: 'onChange',
        defaultValues: signUpSchemaDefaultValue
    })

     /**
   * @type {import("../schema/FormShema").LoginStateType}
   */
     const logInResolver = useForm({
        resolver: zodResolver(logInSchema),
        defaultValues: logInSchemaDefaultValue
    })
    
     /**
   * @type {import("../schema/FormShema").changePasswordSchemaStateType}
   */
     const changePasswordResolver = useForm({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: changePasswordSchemaDefaultValue
    })

    return{
        signUpResolver,
        logInResolver,
        changePasswordResolver
    }
}