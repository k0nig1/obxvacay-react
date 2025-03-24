// AudioManager.ts
type Callback = () => void;

class AudioManager {
  private currentAudioElement: HTMLAudioElement | null = null;
  private currentMediaInstance: any = null;
  private eventCallbacks: { [event: string]: Callback[] } = {};

  // Adds a callback to be called when an event is emitted
  on(event: string, callback: Callback) {
    if (!this.eventCallbacks[event]) {
      this.eventCallbacks[event] = [];
    }
    this.eventCallbacks[event].push(callback);
  }

  // Removes a callback for an event
  off(event: string, callback: Callback) {
    if (!this.eventCallbacks[event]) return;
    this.eventCallbacks[event] = this.eventCallbacks[event].filter(
      (cb) => cb !== callback
    );
  }

  // Emits an event, calling all registered callbacks
  emit(event: string) {
    if (this.eventCallbacks[event]) {
      this.eventCallbacks[event].forEach((callback) => callback());
    }
  }

  // Stops the currently playing audio and notifies subscribers
  stopCurrentAudio() {
    if (this.currentAudioElement) {
      this.currentAudioElement.pause();
      this.currentAudioElement = null;
    }
    if (this.currentMediaInstance && this.currentMediaInstance.stop) {
      this.currentMediaInstance.stop();
      this.currentMediaInstance = null;
    }
    this.emit("stopAudio");
  }

  // Sets a new audio element and notifies subscribers
  setCurrentAudio(audioElement: HTMLAudioElement | null, mediaInstance?: any) {
    this.stopCurrentAudio();
    this.currentAudioElement = audioElement;
    this.currentMediaInstance = mediaInstance;
    this.emit("newAudio");
  }
}

const audioManager = new AudioManager();
export default audioManager;