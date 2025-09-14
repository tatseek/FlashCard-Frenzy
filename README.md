#  Flashcard Frenzy

A real-time multiplayer trivia game built with Next.js, MongoDB, and Supabase. Challenge your friends in fast-paced question battles where speed and accuracy determine the winner!



##  Features

### Core Gameplay
- **Real-time Multiplayer**: Up to 6 players per game
- **Speed-based Scoring**: Faster correct answers earn more points
- **Live Leaderboard**: Real-time score updates across all players
- **Timer-based Questions**: 15-second countdown per question
- **Instant Feedback**: Immediate results after each answer

### Game Management
- **Easy Game Creation**: Generate unique room codes instantly
- **Multiple Join Methods**: Join by Game ID or browse available games
- **Host Controls**: Game hosts can start games and manage flow
- **Cross-platform**: Works on desktop, tablet, and mobile devices
- **Network Play**: Play with friends on the same local network

### User Experience
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Player Identification**: Persistent player names and avatars
- **Match History**: Track your past game performance
- **Error Handling**: Graceful error recovery and user feedback
- **Loading States**: Smooth loading animations and state management

##  Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icon library

### Backend
- **Next.js API Routes** - Server-side API endpoints
- **MongoDB** - Document database for game data
- **Supabase** - Real-time subscriptions and authentication (optional)

### Development
- **Node.js 18+** - JavaScript runtime
- **npm** - Package manager
- **ESLint** - Code linting

##  Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18.0.0 or higher**
- **MongoDB 4.4 or higher**
- **Git**
- **Ubuntu/Linux** (tested on Ubuntu 20.04+)

##  Installation

### 1. Clone the Repository
```bash
git clone https://github.com/tatseek/FlashCard-Frenzy.git
cd FlashCard-Frenzy
```

### 2. Install System Dependencies

#### Update System
```bash
sudo apt update && sudo apt upgrade -y
```

#### Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### Install MongoDB
```bash
# Import MongoDB public key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Create list file for MongoDB
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB service
sudo systemctl start mongod
sudo systemctl enable mongod
```

### 3. Install Project Dependencies
```bash
npm install
```

### 4. Environment Configuration

Create a `.env.local` file in the root directory:

```bash
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/flashard-frenzy

# Supabase Configuration (Optional - for enhanced real-time features)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# NextJS Configuration
NEXTAUTH_SECRET=your_random_secret_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Database Setup

The application will automatically:
- Create the required database collections
- Insert sample questions on first run
- Set up proper indexes for performance

To verify MongoDB is running:
```bash
sudo systemctl status mongod
```

##  Running the Application

### Development Mode
```bash
npm run dev
```

The application will be available at: **http://localhost:3000**

### Production Mode
```bash
npm run build
npm start
```

##  How to Play

### Starting a Game

1. **Visit** the homepage at `http://localhost:3000`
2. **Enter your name** in the player name field
3. **Click "Create New Game"** to start hosting
4. **Share the Game ID** with friends (e.g., "ABC123")

### Joining a Game

1. **Click "Join Game"** from the homepage
2. **Enter your name** and the Game ID
3. **Wait** for the host to start the game
4. **Get ready** to answer questions!

### During Gameplay

1. **Read each question** carefully
2. **Click your answer** as quickly as possible
3. **Faster correct answers** earn more points
4. **Watch the live leaderboard** update in real-time
5. **Compete** across multiple questions to win!

### Scoring System

- **Correct Answer**: Base 500 points
- **Speed Bonus**: Up to 500 additional points
- **Maximum**: 1000 points per question
- **Formula**: `Points = 500 + (500 × time_bonus)`

##  Project Structure

```
flashcard-frenzy/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   │   └── games/         # Game management APIs
|   |   |       ├── [gameId]/
|   |   |       |   ├── answer/
|   |   |       |   |   ├──route.js
|   |   |       |   ├── join/
|   |   |       |   |   ├──route.js
|   |   |       |   ├── next/
|   |   |       |   |   ├──route.js
|   |   |       |   ├── start/
|   |   |       |   |   ├──route.js
|   |   |       └──route.js
│   │   ├── game/[gameId]/     # Game room pages
|   |   |   └──page.js
│   │   ├── lobby/             # Game joining lobby
|   |   |   └──page.js
│   │   ├── history/           # Match history
|   |   |   └──page.js
│   │   ├── globals.css        # Global styles
│   │   ├── layout.js          # Root layout
│   │   └── page.js            # Homepage
│   ├── components/            # React Components
│   │   ├── GameRoom.js        # Main game interface
│   │   ├── QuestionCard.js    # Question display
│   │   ├── Scoreboard.js      # Live scores
│   │   ├── PlayersList.js     # Player management
│   │   └── GameLobby.js       # Game joining interface
│   ├── lib/                   # Utility libraries
│   │   ├── mongodb.js         # Database connection
│   │   ├── gameLogic.js       # Explains working 
│   │   └── supabase.js        # Real-time client
│   └── hooks/                 # Custom React hooks
|        └── useRealtime.js    # Configures real time working
├── .env.local                 # Environment variables
├── package.json               # Dependencies
├── tailwind.config.js         # Tailwind configuration
├── next.config.js             # Next.js configuration
├── postcss.config.js
└── README.md                  # This file
```

##  Network Configuration

### Local Network Play

To play with friends on the same network:

1. **Find your local IP address**:
   ```bash
   ip addr show | grep "inet " | grep -v 127.0.0.1
   ```

2. **Start the development server**:
   ```bash
   npm run dev -- --hostname 0.0.0.0
   ```

3. **Share your IP and port** with friends:
   ```
   http://YOUR_LOCAL_IP:3000
   ```
   Example: `http://192.168.1.113:3000`

### Firewall Configuration

If friends can't connect, open the port:
```bash
sudo ufw allow 3000
```

##  Troubleshooting

### MongoDB Issues

**MongoDB won't start:**
```bash
sudo systemctl restart mongod
sudo journalctl -u mongod -f
```

**Connection refused:**
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Check if port is open
sudo netstat -tlnp | grep 27017
```

**Permission errors:**
```bash
sudo chown -R mongodb:mongodb /var/lib/mongodb
sudo chown mongodb:mongodb /tmp/mongodb-27017.sock
```

### Application Issues

**Module not found errors:**
```bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
```

**Port already in use:**
```bash
# Find process using port 3000
sudo lsof -i :3000
# Kill the process
sudo kill -9 PID
```

### Real-time Issues

**Timer synchronization problems:**
- Ensure all players refresh their browsers
- Check system clocks are synchronized
- Verify MongoDB timestamps are consistent

**Answer selection issues:**
- Clear browser localStorage
- Check browser console for errors
- Ensure stable network connection

##  Testing

### Unit Tests
```bash
npm test
```

### API Testing
```bash
# Test game creation
curl -X POST http://localhost:3000/api/games \
  -H "Content-Type: application/json" \
  -d '{"hostId":"test123","hostName":"TestHost"}'

# Test question fetching
curl http://localhost:3000/api/questions
```

### Load Testing

For testing with multiple players, use multiple browser tabs or different devices on the same network.

##  Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables for Production

Update `.env.local` for production:
```bash
MONGODB_URI=mongodb://your-production-mongodb-uri
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Docker Deployment (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

##  Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

##  API Documentation

### Game Management

#### Create Game
```bash
POST /api/games
Content-Type: application/json

{
  "hostId": "string",
  "hostName": "string"
}
```

#### Get Game
```bash
GET /api/games/[gameId]
```

#### Join Game
```bash
POST /api/games/[gameId]/join
Content-Type: application/json

{
  "playerId": "string",
  "playerName": "string"
}
```

#### Start Game
```bash
POST /api/games/[gameId]/start
```

#### Submit Answer
```bash
POST /api/games/[gameId]/answer
Content-Type: application/json

{
  "playerId": "string",
  "answerIndex": number,
  "timeElapsed": number
}
```

##  Security Considerations

- Input validation on all API endpoints
- Rate limiting for API calls
- Sanitization of user-generated content
- Secure MongoDB configuration
- Environment variable protection

##  Performance Optimization

- MongoDB indexing for faster queries
- Efficient React state management
- Debounced API calls
- Image optimization for assets
- Code splitting and lazy loading

## 🗺️ Roadmap

### Upcoming Features

- [ ] **User Authentication** - Persistent accounts and profiles
- [ ] **Custom Questions** - User-generated question sets
- [ ] **Tournament Mode** - Bracket-style competitions
- [ ] **Voice Chat** - In-game communication
- [ ] **Themes & Customization** - Personalized game appearance
- [ ] **Statistics Dashboard** - Detailed performance analytics
- [ ] **Mobile App** - Native iOS and Android versions
- [ ] **Spectator Mode** - Watch games in progress
- [ ] **Team Mode** - Collaborative gameplay
- [ ] **Question Categories** - Specialized trivia topics

### Known Issues

- Timer drift over long periods
- Occasional WebSocket connection drops
- Browser compatibility with older versions


##  Acknowledgments

- **Next.js Team** for the amazing React framework
- **MongoDB** for the flexible database solution
- **Tailwind CSS** for the beautiful styling system
- **Supabase** for real-time capabilities
- **Open Source Community** for inspiration and support

##  Support

### Getting Help

- **GitHub Issues**: Report bugs and request features
- **Discussions**: Community support and questions
- **Documentation**: Check this README and code comments

### Contact

- **Developer**: Arunima Das
- **Email**: das31arunima@gmail.com
- **GitHub**: [@tatseek](https://github.com/tatseek)

---

**Made  by [Arunima Das]**

*Happy gaming! 🎮*
