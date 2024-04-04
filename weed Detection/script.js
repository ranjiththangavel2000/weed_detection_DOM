document.addEventListener('DOMContentLoaded', function() {
    const uploadBtn = document.getElementById('uploadBtn');
    const imageUpload = document.getElementById('imageUpload');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const resultText = document.getElementById('resultText');
    const imagePreviewContainer = document.getElementById('imagePreviewContainer');
    const imagePreview = document.getElementById('imagePreview');

    // uploadBtn.addEventListener('click', function() {
    //     imageUpload.click();
    // });

    imageUpload.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function() {
                const imageUrl = reader.result;
                imagePreview.src = imageUrl;
                imagePreviewContainer.style.display = 'block';
                analyzeBtn.style.display = 'block';
            };
        }
    });

    analyzeBtn.addEventListener('click', function() {
        const file = imageUpload.files[0];
        const formData = new FormData();
        formData.append('file', file);


    /*add ur api here *------------------------------------------*/

        fetch('http://localhost:8000/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                resultText.textContent = 'Error analyzing image.';
            } else {
                const resultMessage = data.is_weed_detected ? 'Weed Detected!' : 'No Weed Detected';
                resultText.textContent = `Analysis Result: ${resultMessage}`;
            }
            document.getElementById('resultContainer').style.display = 'block';
        })
        .catch(error => {
            resultText.textContent = 'Error analyzing image.';
            document.getElementById('resultContainer').style.display = 'block';
        });
    });
});
