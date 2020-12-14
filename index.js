
"use strict";

function createAudioContext() {
  console.log("creating audio context")
  // Setting up
  const myAudio = document.getElementById("my-audio")
  const context = new AudioContext()
  const audioSource = context.createMediaElementSource(myAudio)
  // Create 2 channel splitter (Left and Right)
  const splitter = context.createChannelSplitter(2)
  // Connecting source to splitter
  audioSource.connect(splitter)
  // Creating merger node
  const merger = context.createChannelMerger(1)
  // Connecting the right channel from splitter to merger
  splitter.connect(merger, 1)
  // Connect merger to destination (speakers)
  merger.connect(context.destination)
  // get buttons
  const leftButton = document.getElementById('swap-left-button')
  const rightButton = document.getElementById('swap-right-button')
  // Add event listeners
  leftButton.addEventListener("click", (event) => {
    splitter.disconnect(merger, 1)
    splitter.connect(merger, 0)
    merger.connect(context.destination)
  })
  rightButton.addEventListener("click", (event) => {
    splitter.disconnect(merger, 0)
    splitter.connect(merger, 1)
    merger.connect(context.destination)
  })
}

document.onload = createAudioContext()
