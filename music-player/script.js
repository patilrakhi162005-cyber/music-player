const audio = document.getElementById("audio");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const title = document.getElementById("song-title");
const artist = document.getElementById("artist");

const progress = document.getElementById("progress");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

const volume = document.getElementById("volume");

const playlistElement = document.getElementById("playlist");
const album = document.querySelector(".album");


// Songs
const songs = [
    {
        title: "Dreams",
        artist: "Artist One",
        src: "music/song1.mp3"
    },

    {
        title: "Morning Vibes",
        artist: "Artist Two",
        src: "music/song2.mp3"
    },

    {
        title: "Beautiful World",
        artist: "Artist Three",
        src: "music/song3.mp3"
    }
];

let currentSong = 0;


// Load Song
function loadSong(index) {

    const song = songs[index];

    title.textContent = song.title;
    artist.textContent = song.artist;

    audio.src = song.src;

    updatePlaylist();
}


// Play Song
function playSong() {

    audio.play();

    playBtn.textContent = "⏸";

    album.classList.add("playing");
}


// Pause Song
function pauseSong() {

    audio.pause();

    playBtn.textContent = "▶";

    album.classList.remove("playing");
}


// Play / Pause
playBtn.addEventListener("click", () => {

    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }

});


// Previous Song
prevBtn.addEventListener("click", () => {

    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);
    playSong();

});


// Next Song
nextBtn.addEventListener("click", () => {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);
    playSong();

});


// Update Progress Bar
audio.addEventListener("timeupdate", () => {

    if (audio.duration) {

        progress.value =
            (audio.currentTime / audio.duration) * 100;

        currentTime.textContent =
            formatTime(audio.currentTime);
    }

});


// Song Duration
audio.addEventListener("loadedmetadata", () => {

    duration.textContent =
        formatTime(audio.duration);

});


// Change song position
progress.addEventListener("input", () => {

    audio.currentTime =
        (progress.value / 100) * audio.duration;

});


// Volume Control
volume.addEventListener("input", () => {

    audio.volume = volume.value;

});


// Automatically play next song
audio.addEventListener("ended", () => {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);
    playSong();

});


// Format time
function formatTime(time) {

    if (isNaN(time)) {
        return "0:00";
    }

    const minutes = Math.floor(time / 60);

    const seconds =
        Math.floor(time % 60)
        .toString()
        .padStart(2, "0");

    return `${minutes}:${seconds}`;
}


// Create Playlist
function createPlaylist() {

    playlistElement.innerHTML = "";

    songs.forEach((song, index) => {

        const li = document.createElement("li");

        li.textContent =
            `${index + 1}. ${song.title} - ${song.artist}`;

        li.addEventListener("click", () => {

            currentSong = index;

            loadSong(currentSong);
            playSong();

        });

        playlistElement.appendChild(li);

    });

}


// Highlight current song
function updatePlaylist() {

    const items =
        playlistElement.querySelectorAll("li");

    items.forEach((item, index) => {

        item.classList.toggle(
            "active",
            index === currentSong
        );

    });

}


// Initialize
createPlaylist();
loadSong(currentSong);