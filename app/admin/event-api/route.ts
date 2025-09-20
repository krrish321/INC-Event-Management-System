import { NextResponse } from 'next/server'

export async function POST(req: Request){
  try {
    const data = await req.json() // form data JSON me aayega
    console.log("Event Data Received:", data)

   

    return NextResponse.json({ message: "Event created successfully!" }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
