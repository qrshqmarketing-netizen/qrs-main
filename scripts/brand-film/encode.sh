#!/bin/sh
# Makes the web files of the brand film from the master that render.mjs writes and the soundtrack that music.mjs writes:
#   public/videos/qrs-film.webm (VP9 + Opus), public/videos/qrs-film-h264.mp4 (H.264 + AAC, for Safari) and public/images/qrs-film-poster.webp.
# usage: FFMPEG=/path/to/ffmpeg sh scripts/brand-film/encode.sh master.mp4 music.wav
# The soundtrack is normalized to -14 LUFS (true peak -1.5 dB). The poster is the opening frame with the headline settled (2.6 s).
set -e
FF="${FFMPEG:-ffmpeg}"
IN="$1"
MUSIC="$2"
cd "$(dirname "$0")/../.."
A="-af loudnorm=I=-14:TP=-1.5:LRA=11 -ar 48000"
"$FF" -y -loglevel error -i "$IN" -i "$MUSIC" -map 0:v -map 1:a -vf "scale=1600:-2:flags=lanczos" -c:v libvpx-vp9 -b:v 0 -crf 44 -row-mt 1 -deadline good -cpu-used 2 $A -c:a libopus -b:a 128k -shortest public/videos/qrs-film.webm
"$FF" -y -loglevel error -i "$IN" -i "$MUSIC" -map 0:v -map 1:a -vf "scale=1600:-2:flags=lanczos" -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p $A -c:a aac -b:a 160k -shortest -movflags +faststart public/videos/qrs-film-h264.mp4
"$FF" -y -loglevel error -ss 2.6 -i "$IN" -frames:v 1 -vf "scale=1600:-2:flags=lanczos" -c:v libwebp -quality 80 public/images/qrs-film-poster.webp
ls -la public/videos/qrs-film.webm public/videos/qrs-film-h264.mp4 public/images/qrs-film-poster.webp
