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
      message: "Username must be at least 5 characters.",
    }),
    email: z.string().email({message: "email must be valid"}).min(5, {
        message: "Email must be at least 5 characters.",
      }),
    fullname: z.string().min(4, {
      message: "fullname must be at least 4 characters.",
    }),
    password: z.string().min(8, {
      message: "Username must be at least 8 characters.",
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
    message: "Username must be at least 5 characters.",
  }),
  password: z.string().min(8, {
    message: "Username must be at least 8 characters.",
  }),
})


   /**
 * @typedef updateDocumentNameStateType
 * @property {string} documentName
 * @property {string} new
 */


 /** @type {updateDocumentNameStateType} */
 export const updateDocumentNameDefaultValue = {
  documentName: "",
  new: "no",
}

/** @type {updateDocumentNameStateType} */
export const updateDocumentNameSchema = z.object({
  documentName: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
  new: z.string(),
})