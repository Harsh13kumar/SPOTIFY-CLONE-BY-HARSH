

let currentSong = new Audio();
let songUl;
let songs;
let CurrFolder;
function convertSecondsToMinutesAndSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const minutesString = String(minutes).padStart(2, '0');
    const secondsString = String(remainingSeconds).padStart(2, '0');

    return `${minutesString}:${secondsString}`;
}

async function getSongs(folder) {
    CurrFolder = folder

    let a = await fetch(`http://127.0.0.1:5500/Songs/${folder}/`)
    let response = await a.text();
    let div = document.createElement('div')
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
    console.log(as);
    songs = []

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            let Songlink = element.href.split(`/Songs/${folder}/`)[1]
            console.log(Songlink);
            songs.push(Songlink.slice(0, Songlink.length - 4))
        }
    }
    songUl = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    songUl.innerHTML = ""
    for (const song of songs) {
        songUl.innerHTML = songUl.innerHTML + `<li> 
        <img src="img/music.svg" alt="" class="invert">
        <div class="info">
            <div>${decodeURI(song)} </div>
        </div>
       <div class="playNow">
       <!--  <span>Play Now</span> -->
        <div class="playNowbtn"> <img src="img/play.svg" alt="" class=""></div>
       </div>
        
        </li>`
    }


    Array.from(document.querySelector(".songlist").getElementsByTagName('li')).forEach(e => {
        e.addEventListener("click", element => {
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());    
        })
    })
}

const playMusic = function (track) {

    try {
        currentSong.src = `/Songs/${CurrFolder}/` + track + ".mp3"
    } catch (error) {
        currentSong.src = `/Songs/${CurrFolder}/` + track
    }

    // document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".phoneSongname").innerHTML = decodeURI(track)
    document.querySelector(".n2").innerHTML = decodeURI(track)
    document.querySelector(".name").innerHTML = decodeURI(track)
    document.querySelector(".phone").style.left = "0"
    document.querySelector(".phone2").style.left = "0"
    // document.querySelector(".songinfo").style.left = "0"
    document.querySelector(".songtime").innerHTML = "00:00/00:00"
    document.querySelector(".songtime").style.right = "0px"
    document.querySelector(".playbtn").style.top = "0px"
    document.querySelector("#previous").style.bottom = "0px"
    document.querySelector("#next").style.bottom = "0px"
    document.querySelector(".seekbar").style.bottom = "-6px"
    document.querySelector(".playbar").style.bottom = "0px"

    currentSong.play()
    play.src = "img/pause.svg"

}
async function displayAlbums() {
    let a = await fetch(`http://127.0.0.1:5500/Songs/`)
    let response = await a.text();
    let div = document.createElement('div')
    div.innerHTML =  response
    let anchors = div.getElementsByTagName('a')
    let arr = Array.from(anchors)
    for (let index = 0; index < arr.length; index++) {
        const e = arr[index];


        if (e.href.includes("/Songs/")) {
            let folders = e.href.split("/Songs/").slice(-2)[1]
            let a = await fetch(`http://127.0.0.1:5500/Songs/${folders}/info.json`)
            let response = await a.json();
            document.querySelector(".cardContainer").innerHTML = document.querySelector(".cardContainer").innerHTML + `<div class="card " data-folder="${folders}">
          <div class="play">
              <img src="img/Play2.svg" alt="">
          </div>
          <div class="imgcontainer"><img src="/Songs/${folders}/cover.jpg" alt=""></div>
          <h2>${response.title}</h2>
          <p>${response.description}</p>
      </div>`
        }
        
    }

    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
             console.log(item);
             await getSongs(item.currentTarget.dataset.folder);
           if(document.querySelector(".left").style.left="-180%"){
            document.querySelector(".left").style.left = "0px"
           }
        })
    })
}


async function main() {
    // await getSongs("Angry");

   await displayAlbums()

    play.addEventListener("click", () => {
        if (currentSong.src == '') { }
        else {
            if (currentSong.paused) {
                currentSong.play()
                play.src = "img/pause.svg"
               
                document.querySelector(".songtime").style.right = "0px"
                document.querySelector(".phone").style.left = "0"
            }
            else {
                currentSong.pause()
                play.src = "img/play.svg"
           
                document.querySelector(".songtime").style.right = "-160px"
                document.querySelector(".phone").style.left = "-200%"
            }
        }
    })

    currentSong.addEventListener("timeupdate", () => {

        document.querySelector('.songtime').innerHTML = `${convertSecondsToMinutesAndSeconds(Math.floor(currentSong.currentTime))}/${convertSecondsToMinutesAndSeconds(Math.floor(currentSong.duration))}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%"
    })

    document.querySelector(".seekbar").addEventListener("click", e => {
        let persent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
        document.querySelector(".circle").style.left = persent + "%"
        currentSong.currentTime = ((currentSong.duration) * persent) / 100
    })
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0px"
    })
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-180%"
    })

    previous.addEventListener("click", () => {
        currentSong.pause()
        let a = currentSong.src.split(`/Songs/${CurrFolder}/`)[1].slice(0, currentSong.src.length - 4)
        let index = songs.indexOf(a.slice(0, a.length - 4))

        if ((index - 1) >= 0) {
            playMusic(songs[index - 1])
        }
    })

    // Add an event listener to next
    next.addEventListener("click", () => {
        let a = currentSong.src.split(`/Songs/${CurrFolder}/`)[1].slice(0, currentSong.src.length - 4)
        let index = songs.indexOf(a.slice(0, a.length - 4))

        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1])
        }

    })
    document.querySelector('.range').getElementsByTagName('input')[0].addEventListener('change', (e) => {
        currentSong.volume = parseInt(e.target.value) / 100
    })
    document.querySelector(".volume>img").addEventListener("click", (e)=>{
        if(e.target.src == "http://127.0.0.1:5501/img/volume.svg"){
            e.target.src = "img/mute.svg"
            currentSong.volume=0
            document.querySelector('.range').getElementsByTagName('input')[0].value=0
        }
        else{
            e.target.src="http://127.0.0.1:5501/img/volume.svg"
            currentSong.volume= .10
            document.querySelector('.range').getElementsByTagName('input')[0].value=10
        }
    })
}
// 4:56:52
main();


