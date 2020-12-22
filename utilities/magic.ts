import { Magic } from "@magic-sdk/admin"

console.log("MAGIC KEY:", process.env.MAGIC_SECRET_KEY)
/* initiate Magic instance */
export const magic = new Magic(process.env.MAGIC_SECRET_KEY)
//TODO: CHANGE TO LIVE WHEN READY
