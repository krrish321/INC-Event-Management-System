export interface Event {
  id: string
  name: string
  description: string
  startDate: string
  endDate: string
  issueDate: string
  location: string
  level: "Jila" | "Block"
  type: "Dharnā" | "Meeting" | "Bandh" | "Rally" | "Sabha" | "Gayaapan"
  assignedUser: string
  status: "ongoing" | "previous"
  viewed: boolean
  updated: boolean
  attendeesCount?: number
  updatingDate?: string
  photos?: string[]
  video?: string
  mediaCoverage?: string[]
}

export interface User {
  id: string
  name: string
  designation: string
  viewed: boolean
  updated: boolean
}

export const dummyEvents: Event[] = [
  {
    id: "1",
    name: "Youth Rally for Education Reform",
    description: "A massive rally to demand better education policies and infrastructure development in rural areas.",
    startDate: "2024-01-15T10:00",
    endDate: "2024-01-15T16:00",
    issueDate: "2024-01-10",
    location: "Gandhi Maidan, Patna",
    level: "Jila",
    type: "Rally",
    assignedUser: "Rajesh Kumar",
    status: "ongoing",
    viewed: true,
    updated: false,
    attendeesCount: 5000,
  },
  {
    id: "2",
    name: "Farmers Dharna Against Price Rise",
    description: "Peaceful protest demanding fair prices for agricultural products and subsidies for farmers.",
    startDate: "2024-01-20T09:00",
    endDate: "2024-01-22T18:00",
    issueDate: "2024-01-15",
    location: "District Collectorate, Muzaffarpur",
    level: "Block",
    type: "Dharnā",
    assignedUser: "Priya Singh",
    status: "ongoing",
    viewed: false,
    updated: false,
  },
  {
    id: "3",
    name: "Women Empowerment Sabha",
    description: "Community gathering to discuss women rights and empowerment initiatives.",
    startDate: "2023-12-10T14:00",
    endDate: "2023-12-10T17:00",
    issueDate: "2023-12-05",
    location: "Community Hall, Darbhanga",
    level: "Block",
    type: "Sabha",
    assignedUser: "Sunita Devi",
    status: "previous",
    viewed: true,
    updated: true,
    attendeesCount: 300,
    updatingDate: "2023-12-11",
  },
  {
    id: "4",
    name: "Anti-Corruption Meeting",
    description: "Strategic meeting to plan anti-corruption campaigns and awareness programs.",
    startDate: "2023-11-25T11:00",
    endDate: "2023-11-25T15:00",
    issueDate: "2023-11-20",
    location: "Party Office, Gaya",
    level: "Jila",
    type: "Meeting",
    assignedUser: "Amit Sharma",
    status: "previous",
    viewed: true,
    updated: true,
    attendeesCount: 150,
    updatingDate: "2023-11-26",
  },
  {
    id: "5",
    name: "Healthcare Awareness Gayaapan",
    description: "Public awareness program about healthcare facilities and government schemes.",
    startDate: "2024-01-25T10:00",
    endDate: "2024-01-25T13:00",
    issueDate: "2024-01-18",
    location: "Primary Health Center, Begusarai",
    level: "Block",
    type: "Gayaapan",
    assignedUser: "Dr. Kavita Jha",
    status: "ongoing",
    viewed: false,
    updated: false,
  },
]

export const dummyUsers: User[] = [
  { id: "1", name: "Rajesh Kumar", designation: "Jila Adhyaksh - Patna", viewed: true, updated: false },
  { id: "2", name: "Priya Singh", designation: "Jila Adhyaksh - Muzaffarpur", viewed: false, updated: false },
  { id: "3", name: "Sunita Devi", designation: "Jila Adhyaksh - Darbhanga", viewed: true, updated: true },
  { id: "4", name: "Amit Sharma", designation: "Jila Adhyaksh - Gaya", viewed: true, updated: true },
  { id: "5", name: "Dr. Kavita Jha", designation: "Jila Adhyaksh - Begusarai", viewed: false, updated: false },
  { id: "6", name: "Ravi Prasad", designation: "Jila Adhyaksh - Bhagalpur", viewed: true, updated: false },
  { id: "7", name: "Meera Kumari", designation: "Jila Adhyaksh - Purnia", viewed: false, updated: false },
  { id: "8", name: "Suresh Yadav", designation: "Jila Adhyaksh - Saharsa", viewed: true, updated: true },
  { id: "9", name: "Anita Gupta", designation: "Jila Adhyaksh - Madhubani", viewed: false, updated: false },
  { id: "10", name: "Manoj Singh", designation: "Jila Adhyaksh - Sitamarhi", viewed: true, updated: false },
]
