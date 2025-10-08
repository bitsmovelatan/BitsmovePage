#!/bin/bash

# Start all services in development mode
echo "🚀 Starting FertilityToken Development Environment"
echo "=================================================="
echo ""

# Check if tmux is installed
if ! command -v tmux &> /dev/null; then
    echo "⚠️  tmux not found. Install it for better experience:"
    echo "   macOS: brew install tmux"
    echo "   Ubuntu: sudo apt-get install tmux"
    echo ""
    echo "Starting services sequentially instead..."
    
    # Start backend
    echo "Starting backend..."
    cd backend && npm run dev &
    BACKEND_PID=$!
    
    # Wait a bit for backend to start
    sleep 3
    
    # Start frontend
    echo "Starting frontend..."
    cd frontend-web && npm start &
    FRONTEND_PID=$!
    
    # Start mobile
    echo "Starting mobile app..."
    cd mobile-app && npm start &
    MOBILE_PID=$!
    
    echo ""
    echo "✅ Services started!"
    echo "Backend PID: $BACKEND_PID"
    echo "Frontend PID: $FRONTEND_PID"
    echo "Mobile PID: $MOBILE_PID"
    echo ""
    echo "To stop services, run:"
    echo "kill $BACKEND_PID $FRONTEND_PID $MOBILE_PID"
    
    wait
else
    # Create tmux session with multiple panes
    SESSION="fertilitytoken"
    
    # Kill existing session if it exists
    tmux kill-session -t $SESSION 2>/dev/null
    
    # Create new session
    tmux new-session -d -s $SESSION -n "FertilityToken"
    
    # Split window into panes
    tmux split-window -h -t $SESSION
    tmux split-window -v -t $SESSION
    
    # Run commands in each pane
    tmux send-keys -t $SESSION:0.0 "cd backend && npm run dev" C-m
    tmux send-keys -t $SESSION:0.1 "cd frontend-web && npm start" C-m
    tmux send-keys -t $SESSION:0.2 "cd mobile-app && npm start" C-m
    
    echo "✅ Development environment started in tmux!"
    echo ""
    echo "Commands:"
    echo "  tmux attach -t $SESSION    - Attach to session"
    echo "  tmux kill-session -t $SESSION - Stop all services"
    echo ""
    
    # Attach to session
    tmux attach -t $SESSION
fi

