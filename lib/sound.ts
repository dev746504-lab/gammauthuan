let sharedContext: AudioContext | null = null;

export function getAudioContext(): AudioContext {
  if (!sharedContext) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    sharedContext = new AudioContextClass();
  }
  return sharedContext;
}

type ToneOptions = {
  type?: OscillatorType;
  gain?: number;
};

function playTone(
  ctx: AudioContext,
  frequency: number,
  startOffset: number,
  duration: number,
  { type = "sine", gain = 0.2 }: ToneOptions = {}
) {
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  oscillator.type = type;
  oscillator.frequency.value = frequency;

  const startTime = ctx.currentTime + startOffset;
  const endTime = startTime + duration;

  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(gain, startTime + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.001, endTime);

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  oscillator.start(startTime);
  oscillator.stop(endTime + 0.02);
}

/** Tiếng "tách" nhẹ khi lật thẻ */
export function playFlipSound(ctx: AudioContext) {
  playTone(ctx, 520, 0, 0.08, { type: "triangle", gain: 0.12 });
}

/** Tiếng "ting" vui tai khi ghép đúng / chọn đúng đáp án */
export function playCorrectSound(ctx: AudioContext) {
  playTone(ctx, 660, 0, 0.14, { type: "sine", gain: 0.18 });
  playTone(ctx, 880, 0.1, 0.22, { type: "sine", gain: 0.2 });
}

/** Tiếng nhẹ nhàng, trung tính khi chọn/ghép sai (không gây tiêu cực) */
export function playIncorrectSound(ctx: AudioContext) {
  playTone(ctx, 320, 0, 0.16, { type: "sine", gain: 0.12 });
  playTone(ctx, 260, 0.12, 0.2, { type: "sine", gain: 0.1 });
}

/** Tiếng click nút bấm */
export function playClickSound(ctx: AudioContext) {
  playTone(ctx, 440, 0, 0.06, { type: "square", gain: 0.08 });
}

/** Chuỗi âm thanh chúc mừng khi hoàn thành chặng / kết thúc game */
export function playFanfareSound(ctx: AudioContext) {
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((freq, i) => {
    playTone(ctx, freq, i * 0.12, 0.28, { type: "sine", gain: 0.2 });
  });
}
