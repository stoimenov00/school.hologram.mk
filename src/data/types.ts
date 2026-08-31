export type DataSource = "public" | "demo";
export type WeekDay = "monday" | "tuesday" | "wednesday" | "thursday" | "friday";

export interface Sourced { source: DataSource; sourceUrl?: string }
export interface School extends Sourced { id: string; name: string; shortName: string; city: string; address: string; email: string; mission: string }
export interface Teacher extends Sourced { id: string; name: string; subjects: string[] }
export interface Lesson extends Sourced { id: string; day: WeekDay; period: number; startTime: string; endTime: string; className: string; subject: string; teacherId?: string; roomId?: string }
export interface Room extends Sourced { id: string; name: string; number?: string; floor?: number; directions?: string }
export interface Meeting extends Sourced { id: string; title: string; className: string; teacherId: string; date: string; time: string; roomId: string }
export interface Announcement extends Sourced { id: string; title: string; category: string; content: string; date: string; priority: "normal" | "important"; displayInSignage?: boolean; displayOnHome?: boolean }
export interface Activity extends Sourced { id: string; title: string; category: string; description: string }
export interface SchoolEvent extends Sourced { id: string; title: string; time: string; location: string; category: string; description: string; priority: number }
export interface Period { number: number; start: string; end: string; shift: 1 | 2; breakAfter?: "short" | "long" }
export interface RoomChange { id: string; className: string; subject: string; oldRoomId: string; newRoomId: string; createdAt: string }
