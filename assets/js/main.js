var count = 0;

window.onload = async () => {
    try {
        // Yêu cầu quyền truy cập micro
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        source.connect(analyser);
        analyser.fftSize = 2048; // Đặt kích thước FFT

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        function getDecibels() {
            analyser.getByteTimeDomainData(dataArray);

            // Tính toán mức độ âm thanh
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
                const value = dataArray[i] - 128; // Đổi dữ liệu về âm thanh biên độ
                sum += value * value;
            }
            const rms = Math.sqrt(sum / dataArray.length);

            if (rms > 9 && count < 4) {
                count++
                console.log(count)
                console.log(rms)
                if (count === 4) {
                    const firstImg = document.querySelector("#fire");
                    const lastImg = document.querySelector("#cover");
                    console.log(firstImg)
                    firstImg.style.display = "none";
                    lastImg.style.display = "block";
                }
            }

            requestAnimationFrame(getDecibels);
        }

        getDecibels();
    } catch (err) {
        console.error('Error accessing microphone:', err);
    }
};