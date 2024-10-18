import z from 'zod';
import { plans } from '../common/CommonValues';


 /**
 * @typedef SignupStateType
 * @property {string} username
 * @property {string} email
 * @property {string} fullname
 * @property {string} password
 * @property {string} subscription_plan
 */

 /** @type {SignupStateType} */
 export const signUpSchemaDefaultValue = {
    username: "",
    email: "",
    fullname: "",
    password: "",
    subscription_plan: plans.FREE,
 }

  /** @type {SignupStateType} */
  export const signUpSchema = z.object({
    username: z.string().min(5, {
      message: "username must be at least 5 characters long.",
    }),
    email: z.string().email({message: "email must be valid"}).min(5, {
        message: "email must be at least 5 characters long.",
      }),
    fullname: z.string().min(4, {
      message: "fullname must be at least 4 characters long.",
    }),
    password: z.string().min(8, {
      message: "password must be at least 8 characters long.",
    }),
    subscription_plan: z.string().min(2, {
      message: "subscription plan is required.",
    }),
  })


   /**
 * @typedef LoginStateType
 * @property {string} username
 * @property {string} password
 */

 /** @type {LoginStateType} */
 export const logInSchemaDefaultValue = {
  username: "",
  password: "",
}

/** @type {LoginStateType} */
export const logInSchema = z.object({
  username: z.string().min(5, {
    message: "username must be at least 5 characters long.",
  }),
  password: z.string().min(8, {
    message: "password must be at least 8 characters long.",
  }),
})


   /**
 * @typedef changePasswordSchemaStateType
 * @property {string} userName
 * @property {string} oldPassword
 * @property {string} newPassword
 */


 /** @type {changePasswordSchemaStateType} */
 export const changePasswordSchemaDefaultValue = {
  userName: "",
  oldPassword: "",
  newPassword: "",
}

/** @type {changePasswordSchemaStateType} */
export const changePasswordSchema = z.object({
  userName: z.string().min(5, {
    message: "username must be at least 5 characters long.",
  }),
  oldPassword: z.string().min(8, {
    message: "password must be at least 8 characters.",
  }),
  newPassword: z.string().min(8, {
    message: "password must be at least 8 characters.",
  }),
})