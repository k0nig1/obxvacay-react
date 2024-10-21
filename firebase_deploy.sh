#!/bin/bash

# Build Ionic Project
ionic build --prod

# Deploy Hosting to Firebase
firebase deploy --only hosting