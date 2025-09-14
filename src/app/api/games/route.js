import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'

export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const games = await db.collection('games').find({ status: 'waiting' }).toArray()
    return NextResponse.json({ games })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch games' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { hostId, hostName } = await request.json()
    const { db } = await connectToDatabase()
    
    const gameId = Math.random().toString(36).substring(2, 8).toUpperCase()
    
    const game = {
      id: gameId,
      hostId,
      hostName: hostName || 'Anonymous',
      status: 'waiting', // waiting, playing, finished
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
    return NextResponse.json({ error: 'Failed to create game' }, { status: 500 })
  }
}
