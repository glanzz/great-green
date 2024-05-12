export interface Location {
  type: string,
  coordiates: Array<number>
}
export interface Provider {
  _id: string,
  name: string,
  location: Location,
  address: string,
  type: string,
  active: string,
  createdAt: string,
  updatedAt: string,
}

export interface Contribution {
  _id: string,
  status: string,
  value: number,
  createdOn: string,
}


export interface Journey {
  _id: string,
  user_id: string,
  provider: Provider,
  kit: Kit,
  quantity: number,
  status: string,
  level: string,
  milestones: Array<Milestone>,
  createdDate: string,
  updatedAt: string,
  contribution?: Contribution,
  affiliation?: Affiliation,
  active: boolean
}

export interface Addon {
  name: string,
  type: string
}


export interface Instruction {
  title: string,
  description?: string,
  resources?: Array<string>
}


export interface Kit {
  _id: string,
  name: string,
  preperation_instructions: Array<Instruction>,
  journey_instructions: Array<Instruction>,
  addons: Array<Addon>,
  level: string,
  createdDate: string,
  updatedAt: string,
  plant: Plant,
}
export interface Affiliation {
  center_id?: string
}

export interface Milestone {
  _id: string,
  url: string,
  comment?: string,
  createdAt: string,
}
export interface Plant {
  _id: string,
  name: string,
  yieldable: boolean,
  unit: string | null,
  type: string,
  createdDate: string,
  updatedAt: string,
}

export interface Badge {
  name: string,
  logo: string
}

export interface User {
  username: string,
  name: string,
  email: string,
  gender: string,
  locationX: number,
  locationY: number,
  badges: Array<Badge>
}