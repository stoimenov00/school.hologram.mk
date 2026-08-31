import { Announcement, Meeting, RoomChange } from "@/data/types";
export const KEYS={changes:"digital-school-room-changes",meetings:"digital-school-meetings",announcements:"digital-school-announcements"};
export const readStored=<T,>(key:string,fallback:T):T=>{if(typeof window==="undefined")return fallback;try{return JSON.parse(localStorage.getItem(key)||"") as T}catch{return fallback}};
export const writeStored=<T,>(key:string,value:T)=>{localStorage.setItem(key,JSON.stringify(value));window.dispatchEvent(new StorageEvent("storage",{key,newValue:JSON.stringify(value)}))};
export type Overrides={changes:RoomChange[];meetings:Meeting[];announcements:Announcement[]};
