// Function to play video
function playVideo() {
    // Thêm logic phát video ở đây
    alert('Phát video bài học');
    // Có thể thay bằng:
    // - Mở modal video
    // - Chuyển đến trang video player
    // - Nhúng video player vào đây
}

// Function to select a lesson
function selectLesson(lessonId, title, duration, completed) {
    // Cập nhật thông tin bài học hiện tại
    document.getElementById('currentLessonId').textContent = lessonId;
    document.getElementById('currentLessonTitle').textContent = title;
    document.getElementById('currentLessonDuration').textContent = duration;
    
    // Cập nhật mô tả (có thể lấy từ AJAX nếu cần)
    updateLessonDescription(lessonId);
    
    // Cập nhật trạng thái active cho các item
    const allLessonItems = document.querySelectorAll('.lesson-item');
    allLessonItems.forEach(item => {
        const itemLessonId = item.getAttribute('data-lesson-id');
        if (itemLessonId == lessonId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Cập nhật circle number
    const allCircles = document.querySelectorAll('.lesson-number-circle');
    allCircles.forEach(circle => {
        const parentItem = circle.closest('.lesson-item');
        const itemLessonId = parentItem.getAttribute('data-lesson-id');
        if (itemLessonId == lessonId) {
            circle.classList.add('active');
        } else {
            circle.classList.remove('active');
        }
    });
    
    // Reinitialize icons after DOM update
    lucide.createIcons();
    
    // Scroll to top of video section on mobile
    if (window.innerWidth < 1024) {
        document.querySelector('.video-section').scrollIntoView({ behavior: 'smooth' });
    }
}

// Function to update lesson description (có thể dùng AJAX)
function updateLessonDescription(lessonId) {
    // Option 1: Lấy mô tả từ server qua AJAX
    /*
    fetch(`/api/lesson/${lessonId}/description`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('currentLessonDescription').textContent = data.description;
        })
        .catch(error => console.error('Error:', error));
    */
    
    // Option 2: Dùng mô tả mặc định
    document.getElementById('currentLessonDescription').textContent = 
        'Trong bài học này, bạn sẽ được tìm hiểu các khái niệm và kỹ thuật cơ bản, tạo nền tảng kiến thức vững chắc. ' +
        'Chúng ta sẽ đi qua các ví dụ thực tế và tình huống thực tiễn để giúp bạn hiểu cách áp dụng các nguyên tắc này một cách hiệu quả.';
}

// Function to mark lesson as completed
function markAsCompleted(lessonId) {
    // Gửi request đến server để cập nhật trạng thái
    fetch(`/api/lesson/${lessonId}/complete`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: true })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Cập nhật UI
            const lessonItem = document.querySelector(`[data-lesson-id="${lessonId}"]`);
            const statusDiv = lessonItem.querySelector('.lesson-status');
            statusDiv.innerHTML = '<i data-lucide="check-circle-2" class="completed-icon"></i>';
            lucide.createIcons();
            
            // Cập nhật số lượng bài học đã hoàn thành
            updateCompletedCount();
        }
    })
    .catch(error => console.error('Error:', error));
}

// Function to update completed count
function updateCompletedCount() {
    // Lấy thông tin mới từ server
    fetch('/api/course/progress')
        .then(response => response.json())
        .then(data => {
            const infoText = document.querySelector('.course-info span:last-child');
            infoText.textContent = `Đã hoàn thành ${data.completedCount}/${data.totalLessons} bài học`;
        })
        .catch(error => console.error('Error:', error));
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Thêm các event listener khác nếu cần
});