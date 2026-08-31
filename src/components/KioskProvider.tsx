"use client";
import { createContext,useCallback,useContext,useEffect,useState } from "react";
import { Announcement,Meeting,RoomChange } from "@/data/types";
import { KEYS,readStored,writeStored } from "@/lib/storage";
type Store={changes:RoomChange[];meetings:Meeting[];announcements:Announcement[];setChanges:(v:RoomChange[])=>void;setMeetings:(v:Meeting[])=>void;setAnnouncements:(v:Announcement[])=>void};
const Context=createContext<Store|null>(null);
export function KioskProvider({children}:{children:React.ReactNode}){const[changes,rawSetChanges]=useState<RoomChange[]>([]);const[meetings,rawSetMeetings]=useState<Meeting[]>([]);const[announcements,rawSetAnnouncements]=useState<Announcement[]>([]);useEffect(()=>{const load=()=>{rawSetChanges(readStored(KEYS.changes,[]));rawSetMeetings(readStored(KEYS.meetings,[]));rawSetAnnouncements(readStored(KEYS.announcements,[]))};load();window.addEventListener("storage",load);return()=>window.removeEventListener("storage",load)},[]);const setChanges=useCallback((v:RoomChange[])=>{rawSetChanges(v);writeStored(KEYS.changes,v)},[]);const setMeetings=useCallback((v:Meeting[])=>{rawSetMeetings(v);writeStored(KEYS.meetings,v)},[]);const setAnnouncements=useCallback((v:Announcement[])=>{rawSetAnnouncements(v);writeStored(KEYS.announcements,v)},[]);return <Context.Provider value={{changes,meetings,announcements,setChanges,setMeetings,setAnnouncements}}>{children}</Context.Provider>}
export const useKiosk=()=>{const v=useContext(Context);if(!v)throw new Error("KioskProvider missing");return v};
