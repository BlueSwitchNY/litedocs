export interface User {
  id: number
  name: string
  email: string
  imageUrl: string
  Entries: Array<Entry>
  Memberships: Array<Member>
}

export interface Entry {
  id: number
  createdAt: Date
  userId: number
  teamId: number
  title: string
  Category: Category
  tagsText: string
  body: string
  code: string
  dateUpdated: Date
  Tags: Array<Tag>
  Author: User
  Team: Team
  History: Array<EntryHistory>
  Logs: Array<Log>
}

export interface Category {
  id: number
  createdAt: Date
  name: string
  Entries: Array<Entry>
}

export interface Tag {
  id: number
  entryId: number
  name: string
}

export interface EntryHistory {
  id: number
  createdAt: Date
  title: string
  tagsText: string
  body: string
  code: string
  Log: Array<Log>
}

export interface Log {
  id: number
  createdAt: Date
  userId: number
  historyId: number
  entryId: number
  note: string
  User: User
  EntryHistory: EntryHistory
  Entry: Entry
}

export interface Team {
  id: number
  name: string
  handle: string
  imageUrl: string
  Members: Array<Member>
  Entries: Array<Entry>
}

export interface Member {
  id: number
  createdAt: Date
  teamId: number
  userId: number
  memberType: MemberType
  Team: Team
  User: User
}

export enum MemberType {
  Owner = 1,
  Member,
}
