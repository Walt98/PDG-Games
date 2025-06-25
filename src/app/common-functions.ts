/**
 * Riproduce il suono descritto in parametro.
 */
export function play(sound: "success" | "error" | "skip" | "gong") {

    const audio = new Audio(`/${sound}.mp3`);
    audio.play();
}
