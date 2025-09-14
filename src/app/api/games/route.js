
import { NextResponse } from 'next/server'
import { connectToDatabase, initializeDatabase } from '@/lib/mongodb'

export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const games = await db.collection('games').find({ status: 'waiting' }).toArray()
    return NextResponse.json({ games })
  } catch (error) {
    console.error('Error fetching games:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch games', 
      details: error.message 
    }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    // Initialize database if needed (first time setup)
    await initializeDatabase()
    
    const { hostId, hostName } = await request.json()
    const { db } = await connectToDatabase()
    
    const gameId = Math.random().toString(36).substring(2, 8).toUpperCase()
    
    const game = {
      id: gameId,
      hostId,
      hostName: hostName || 'Anonymous Host',
      status: 'waiting',
      players: [{ id: hostId, name: hostName || 'Host', score: 0, ready: false }],
      currentQuestion: 0,
      questions: [],
      createdAt: new Date(),
      startedAt: null,
      finishedAt: null
    }
    
    await db.collection('games').insertOne(game)
    
    return NextResponse.json({ gameId, game })
  } catch (error) {
    console.error('Error creating game:', error)
    return NextResponse.json({ 
      error: 'Failed to create game', 
      details: error.message,
      mongoUri: process.env.MONGODB_URI ? 'URI is set' : 'URI is missing'
    }, { status: 500 })
  }
}

