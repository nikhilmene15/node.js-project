
const express = require('express');
const fs = require('fs');
const songs = require('./songs.json');
const app = express();

//middleware
app.use(express.json());

const port = 9000;

app.get('/', (req, res) => {
    const songs_ = songs.map((song) => {
        delete song.email;
        delete song.code;
        return song
    });
    res.status(200).json({
        message: 'here are the songs',
        data: songs_,
    });
});

app.get('/my_songs', (req, res) => {
    const { email, code } = req.body;
    const song = songs.find((song)=> {
        return (
            songExist.email !== email &&
            songExist.code !== code
        );
    });

if(!star){
    return res.status(401).json({
        status: "failed",
        message: "star not found"
    });
}
return res.status(200).json({
    status: "success",
    data:song,
    message: "here is your song $(song.length)",
});
});


//add new song to database


app.post('/', (req, res) => {
    const { lyrics, author, email, code } = req.body;
    if (!lyrics // !email//  !author// !code);
    ) {
        return res.status(400).json({
            status: "failed",
            message: "please fill all the fields"
        });
    }
    const songExist = songs.find(
        (song) => song.lyrics === lyrics
    );
    if (songExist) {
        return res.status(400).json({
            status: "failed",
            message: "song already exists,please choose different lyrics"
        });
    }
    const newSong = {
        lyrics,
        author,
        email,
        code
    }
    songs.push(newSong);
    fs.writeFile('./songs.json', JSON.stringify(songs), (err) => {
        if (err) {
            res.status(500).json({
                message: "intreval server error"
            });
        }
    });
    res.status(201).json({
        message:"song added successfully",
        data:newSong,
    });
});

//update song
app.put('/:lyrics', (req, res) => {
    const { lyrics } = req.params;
    const songExist = songs.find(
        (song) => song.lyrics === lyrics
    );
    if (!songExist) {
        return res.status(404).json({
            status: "failed",
            message: "song does not exist"
        });
    }
    const { email, code,newSong } = req.body;
    if (
        songExist.email !== email ||
        songExist.code !== code){
        return res.status(401).json({
            status: "failed",
            message: "you are not authorised to upade this star"
        });
    }
    songExist.lyrics = newSong;
    fs.writeFile('./songs.json', JSON.stringify(songs), (err) => {
        if (err) {
            res.status(500).json({
                message: "intreval server error"
            });
        }
    });

    res.status(200).json({
        data: songExist,
        message: "song updated successfully"
    });
});
//
app.delete('/:lyrics', (req, res) => {
    const { lyrics } = req.params;
    const songExist = songs.find(
        (song) => song.lyrics === lyrics
    );
    if (!songExist) {
        return res.status(404).json({
            status: "failed",
            message: "song does not exist"
        });
    }
    const { email, code } = req.body;
    if (
        songExist.email !== email &&
        songExist.code !== code
    ) {
        return res.status(404).json({
            status: "failed",
            message: "you are not authorised to delete this star"
        });
    }
    const index =
    songs.indexOf(songExist);
    songs.splice(index,1);
    fs.writeFile('./songs.json', JSON.stringify(songs), (err) => {
        if (err) {
            res.status(500).json({
                message: "intreval server error"
            });
        }
    });
    return res.status(404).json({
        message: "song deleted successfully",
    });

});








app.listen(port, () => {
    console.log('star are twinkling in the night sky @.\n' + port);
});