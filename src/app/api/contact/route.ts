import { NextRequest, NextResponse } from 'next/server'
import { ApiResponse, ContactMessage } from '@/types'

let contactMessages: ContactMessage[] = []

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { 
          status: 'error', 
          error: 'Please provide all required fields' 
        },
        { status: 400 }
      )
    }
    
    // Create a new contact message
    const newMessage: ContactMessage = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      phone: data.phone || undefined,
      subject: data.subject,
      message: data.message,
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    // In a real application, you would save this to a database
    contactMessages.push(newMessage)
    
    // For debugging
    console.log('Contact message received:', newMessage)
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return NextResponse.json({
      status: 'success',
      message: 'Message received successfully',
      data: { id: newMessage.id }
    })
  } catch (error) {
    console.error('Error processing contact form submission:', error)
    return NextResponse.json(
      { status: 'error', error: 'Failed to process your message' },
      { status: 500 }
    )
  }
}

// In a real app, you would implement GET for admin to view messages
export async function GET(request: NextRequest) {
  // This would be protected with authentication in a real app
  const response: ApiResponse<ContactMessage[]> = {
    status: 'success',
    data: contactMessages
  }
  
  return NextResponse.json(response)
} 