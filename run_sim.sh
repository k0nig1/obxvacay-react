#!/bin/bash

# Function to build the Ionic project
function build() {
    echo "Building the Ionic project..."
    ionic build && ionic cap sync
}

# Function to handle Web tasks
function web_option() {
    echo "Running Web tasks..."
<<<<<<< Updated upstream
    ionic serve -w chrome &
    web_pid=$!
    open -na "Google Chrome" --args --new-window http://localhost:8100/
=======
    open -na "Google Chrome" --args http://localhost:8100/
    ionic serve -w chrome
>>>>>>> Stashed changes
}

# General function to handle both iOS and Android options
# Accepts 'ios' or 'android' as an argument
function platform_option() {
    local platform=$1
    local mode=$2 # Mode determines if it's "Open IDE" or "Run Live Sim"
    
    echo "Running $platform tasks..."
    if [ "$mode" == "LiveSim" ]; then
<<<<<<< Updated upstream
        ionic capacitor run $platform -l --external &
        platform_pid=$!
=======
        build
        ionic capacitor run $platform -l --external
>>>>>>> Stashed changes
    else
        build
        ionic cap open $platform
    fi
}

# Function to run all platforms together in separate threads, automatically selecting "Run Live Sim"
function run_all() {
    echo "Running Web, iOS, and Android tasks in parallel with 'Run Live Sim'..."

    # Run Web tasks in a separate thread
    web_option &
    web_pid=$!

    # Run iOS Live Sim in a separate thread
    platform_option ios LiveSim &
    ios_pid=$!

    # Run Android Live Sim in a separate thread
    platform_option android LiveSim &
    android_pid=$!

    # Wait for all background tasks to complete
    wait $web_pid
    wait $ios_pid
    wait $android_pid

    echo "All tasks completed."
}

# Function to quit all running processes
function quit_all() {
    echo "Quitting all running tasks..."
    if [ ! -z "$web_pid" ]; then
        kill $web_pid 2>/dev/null
        echo "Web process terminated."
    fi
    if [ ! -z "$ios_pid" ]; then
        kill $ios_pid 2>/dev/null
        echo "iOS process terminated."
    fi
    if [ ! -z "$android_pid" ]; then
        kill $android_pid 2>/dev/null
        echo "Android process terminated."
    fi
    echo "All tasks quit."
}

# Prompt user for choice
echo "Do you want to proceed with Web, iOS, Android, All (Live Sim), or Quit?"
select choice in "Web" "iOS" "Android" "All" "Quit"; do
    case $choice in
        "Web")
            web_option
            break
            ;;
        "iOS")
            select ios_choice in "Open IDE" "Run Live Sim"; do
                case $ios_choice in
                    "Open IDE")
                        platform_option ios IDE
                        break
                        ;;
                    "Run Live Sim")
                        platform_option ios LiveSim
                        break
                        ;;
                esac
            done
            break
            ;;
        "Android")
            select android_choice in "Open IDE" "Run Live Sim"; do
                case $android_choice in
                    "Open IDE")
                        platform_option android IDE
                        break
                        ;;
                    "Run Live Sim")
                        platform_option android LiveSim
                        break
                        ;;
                esac
            done
            break
            ;;
        "All")
            run_all
            break
            ;;
        "Quit")
            quit_all
            break
            ;;
        *)
            echo "Invalid option. Please choose Web, iOS, Android, All, or Quit."
            ;;
    esac
done